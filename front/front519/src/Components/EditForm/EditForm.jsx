import { useEffect, useState } from "react";
import FilePicker from "../FilePicker/FilePicker";

const EditForm = (props) => {
  const [editname, seteditName] = useState();
  const [editdescription, seteditDescription] = useState();
  const [editprice, seteditPrice] = useState();
  const [editimageUrl, seteditUseImageUrl] = useState(null);

  const submitEdit = () => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("name", editname);
    formData.append("price", editprice);
    formData.append("description", editdescription);
    formData.append("imageUrl", editimageUrl);

    const menuId = props.menuId;

    fetch("http://localhost:8080/products/edit-menu/" + menuId, {
      method: "PUT",
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a Product failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const menu = {
          _id: resData.menu._id,
          name: resData.menu.name,
          price: resData.menu.price,
          description: resData.menu.description,
          imageUrl: resData.menu.imageUrl,
        };
        seteditName("");
        seteditPrice("");
        seteditDescription("");
        seteditUseImageUrl(null);
        // window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-96 grid flex-wrap mx-auto justify-center">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
        <form onSubmit={submitEdit}>
          <label className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-l mb-1">
            Name
          </label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={editname}
              className="grid flex-wrap mx-auto justify-center border border-primary text-primary px-5 py-1"
              onChange={(e) => seteditName(e.target.value)}
              defaultValue={props.name}
            />
          </div>
          <label className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-l mb-1">
            description
          </label>
          <div>
            <input
              type="text"
              id="description"
              name="description"
              value={editdescription}
              className="grid flex-wrap mx-auto justify-center border border-primary text-primary px-5 py-1"
              onChange={(e) => seteditDescription(e.target.value)}
              defaultValue={props.description}
            />
          </div>
          <label className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-l mb-1">
            cost
          </label>
          <div>
            <input
              type="number"
              id="price"
              name="price"
              value={editprice}
              className="grid flex-wrap mx-auto justify-center border border-primary text-primary px-5 py-1"
              onChange={(e) => seteditPrice(e.target.value)}
              defaultValue={props.price}
            />
          </div>
          <label className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-l mb-1">
            Images
          </label>
          <div>
            <FilePicker
              fileSelect={(image) => seteditUseImageUrl(image)}
              name="image"
            />
          </div>
          <button
            className="m-3 px-5 py-2 grid flex-wrap mx-auto justify-center border border-primary text-primary hover:bg-primary hover:text-white transition-all outline-none bg-white border-black text-black hover:text-white hover:bg-black font-bold"
            onClick={props.submitEditButton}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
