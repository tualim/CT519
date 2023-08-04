import { useState } from "react";
import FilePicker from "../FilePicker/FilePicker";

const Form = (props) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [imageUrl, setUseImageUrl] = useState(null);

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);

    fetch("http://localhost:8080/products/create-menu", {
      method: "POST",
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
        setName("");
        setPrice("");
        setDescription("");
        setUseImageUrl(null);
        // window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-96 grid flex-wrap mx-auto justify-center">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
        <form onSubmit={submitForm}>
          <label className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-l mb-1">
            Name
          </label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="grid flex-wrap mx-auto justify-center border border-primary text-primary px-5 py-1"
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              className="grid flex-wrap mx-auto justify-center border border-primary text-primary px-5 py-1"
              onChange={(e) => setDescription(e.target.value)}
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
              value={price}
              className="grid flex-wrap mx-auto justify-center border border-primary text-primary px-5 py-1"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <label className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-l mb-1">
            Images
          </label>
          <div>
            <FilePicker
              fileSelect={(image) => setUseImageUrl(image)}
              name="image"
            />
          </div>
          <button className="m-3 px-5 py-2 grid flex-wrap mx-auto justify-center border border-primary text-primary hover:bg-primary hover:text-white transition-all outline-none bg-white border-black text-black hover:text-white hover:bg-black font-bold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
