const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu");

router.get("/menus", menuController.getMenu);

router.post("/create-menu", menuController.createMenu);

router.get("/getmenu/:menuId", menuController.getSingleMenu);

router.put("/edit-menu/:menuId", menuController.updateMenu);

router.delete("/menu/:menuId", menuController.deleteMenu);

module.exports = router;
