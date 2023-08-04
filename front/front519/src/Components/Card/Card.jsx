const Card = (props) => {
  return (
    <div className="w-96 grid flex-wrap mx-auto justify-center mt-5">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
        <div>
          <div>
            <img
              src={`http://localhost:8080/${props.imageUrl}`}
              className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
              alt={props.imageUrl}
            />
          </div>
          <a
            href={props.titleUrl}
            className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1"
          >
            {props.title}
          </a>

          <p className="mb-4 font-light  text-md md:text-md text-center text-gray-800">
            {props.price}
          </p>

          <div className="flex justify-center gap-x-3">
            <button
              className=" px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold"
              onClick={props.onEdit}
            >
              EDIT
            </button>
            <button
              onClick={props.onDelete}
              className="px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all outline-none bg-white border-black text-black hover:text-white hover:bg-black font-bold"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
