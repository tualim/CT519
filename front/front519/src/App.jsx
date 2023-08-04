import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Navbar from "./Components/Navbar/Navbar";
import DismissableModal from "./Components/Modal/DisModal";
import EditForm from "./Components/EditForm/EditForm";
import Form from "./Components/Form/Form";
import About from "./Components/About/About";
import Research from "./Components/Research/Research";

function App(props) {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(undefined);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openResearchModal, setOpenResearchModal] = useState(false);

  // const [editname, seteditName] = useState();
  // const [editdescription, seteditDescription] = useState();
  // const [editprice, seteditPrice] = useState();
  // const [editimageUrl, seteditUseImageUrl] = useState(null);
  // const [editproducts, seteditProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImgUrl, setProductImgUrl] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8080/products/menus", {
        headers: {
          // Authorization: "Bearer " + this.props.token,
        },
      });
      if (!res.ok) {
        throw new Error("couldnt fetch product data");
      }
      const json = await res.json();
      setProducts(json.menus.map((p) => p));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteMenuHandler = (menuId) => {
    fetch("http://localhost:8080/products/menu/" + menuId, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a Menu failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMenuHandler = (menuId) => {
    setOpenEditModal(true);
    setOpenModal("dismissible");
    fetch("http://localhost:8080/products/getmenu/" + menuId)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a Menu failed!");
        }
        return res.json();
      })
      .then((resData) => {
        // seteditProducts(resData.menu.map((p) => p));
        setProductId(resData.menu._id);
        setProductName(resData.menu.name);
        setProductPrice(resData.menu.price);
        setProductDescription(resData.menu.description);
        setProductImgUrl(resData.menu.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addClickHandler = () => {
    setOpenAddModal(true);
    setOpenEditModal(false);
    setOpenResearchModal(false);
    setOpenAboutModal(false);
    setOpenModal("dismissible");
  };

  const aboutClickHandler = () => {
    setOpenAboutModal(true);
    setOpenEditModal(false);
    setOpenResearchModal(false);
    setOpenAddModal(false);
    setOpenModal("dismissible");
  };

  const researchClickHandler = () => {
    setOpenResearchModal(true);
    setOpenAboutModal(false);
    setOpenEditModal(false);
    setOpenAddModal(false);
    setOpenModal("dismissible");
  };

  return (
    <div>
      <Navbar
        modalClick={addClickHandler}
        aboutClick={aboutClickHandler}
        researchClick={researchClickHandler}
      />

      {openAboutModal ? (
        <DismissableModal
          openShowModal={openModal === "dismissible"}
          setCloseModal={() => {
            setOpenModal(undefined);
            setOpenAboutModal(false);
          }}
          title={"ABOUT ME"}
        >
          <About />
        </DismissableModal>
      ) : openResearchModal ? (
        <DismissableModal
          openShowModal={openModal === "dismissible"}
          setCloseModal={() => {
            setOpenModal(undefined);
            setOpenResearchModal(false);
          }}
          title={"Research"}
        >
          <Research />
        </DismissableModal>
      ) : (
        <DismissableModal
          openShowModal={openModal === "dismissible"}
          setCloseModal={() => {
            setOpenModal(undefined);
            setOpenEditModal(false);
            fetchData();
          }}
          title={openEditModal ? "EDIT HOBBIES" : "ADD HOBBIES"}
        >
          {openEditModal ? (
            <EditForm
              menuId={productId}
              name={productName}
              price={productPrice}
              description={productDescription}
              imageUrl={productImgUrl}
            />
          ) : (
            <Form />
          )}
        </DismissableModal>
      )}
      <div>
        <p className="text-l text-gray-400 font-semibold text-center mt-4">
          Name / Lastname:
        </p>
        <p className="text-2xl text-gray-800 font-semibold text-center">
          Natsongpol Tongthongthip
        </p>
        <p className="text-l text-gray-400 font-semibold text-center mt-4">
          ID number:
        </p>
        <p className="text-xl text-gray-800 font-semibold text-center">
          65130495
        </p>
      </div>

      <div className="border-2 m-3">
        <p className="text-2xl text-gray-800 font-semibold text-center m-5">
          MY HOBBIES
        </p>
      </div>
      <div className="grid grid-cols-1 divide-y divide-black">
        {products.map((i) => (
          <Card
            key={i._id}
            imageUrl={i.imageUrl}
            titleUrl={`/products/${i._id}`}
            title={i.name}
            price={`${i.price} Baht`}
            description={i.description}
            onDelete={deleteMenuHandler.bind(this, i._id)}
            onEdit={editMenuHandler.bind(this, i._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
