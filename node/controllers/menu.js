const fs = require("fs");
const path = require("path");
const Menu = require("../models/Menu");

exports.getMenu = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;
  Menu.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Menu.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((menus) => {
      res.status(200).json({
        message: "Fetched posts successfully.",
        menus: menus,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSingleMenu = (req, res, next) => {
  const menuId = req.params.menuId;
  Menu.findById(menuId)
    .then((menu) => {
      if (!menu) {
        const error = new Error("Could not find Menu.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Menu fetched.", menu: menu });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createMenu = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const image = req.file;
  if (!image) {
    return res.status(422).json({ message: "Attach file is not image" });
  }

  const imageUrl = image.path;

  const menu = new Menu({
    name: name,
    description: description,
    price: price,
    imageUrl: imageUrl,
  });
  try {
    const result = await menu.save();
    res.status(201).json({
      message: "Product created successfully!",
      menu: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateMenu = (req, res, next) => {
  const menuId = req.params.menuId;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  Menu.findById(menuId)
    .then((menu) => {
      if (imageUrl !== menu.imageUrl) {
        clearImage(menu.imageUrl);
      }
      menu.name = name;
      menu.imageUrl = imageUrl;
      menu.description = description;
      menu.price = price;
      return menu.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Menu updated!", menu: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteMenu = (req, res, next) => {
  const menuId = req.params.menuId;
  Menu.findById(menuId)
    .then((menu) => {
      if (!menu) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      clearImage(menu.imageUrl);
      return Menu.findByIdAndRemove(menuId);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted Menu." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
