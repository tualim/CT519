import { useState } from "react";

function NavLink({ to, children }) {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
}

function MobileNav({ open, setOpen, props }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
        {/*logo container*/}
        <p className="text-xl text-gray-800 font-semibold">65130496</p>
      </div>
      <div className="flex flex-col ml-4">
        <a
          className="text-xl font-medium my-4"
          href="/about"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          <button>ADD-HOBBIES</button>
        </a>
        <a
          className="text-xl font-medium my-4"
          href="/about"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          <button>ABOUT</button>
        </a>
        <a
          className="text-xl font-medium my-4"
          href="/about"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          <button>RESEARCH</button>
        </a>
      </div>
    </div>
  );
}

export default function Navbar(props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center sticky top-0 z-10">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        <p className="text-xl text-gray-800 font-semibold">
          Natsongpol Tongthongthip
        </p>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex m-2">
          <button onClick={props.modalClick}>ADD-HOBBIES</button>
        </div>
        <div className="hidden md:flex m-2">
          <button onClick={props.aboutClick}>ABOUT</button>
        </div>
        <div className="hidden md:flex m-2">
          <button onClick={props.researchClick}>RESEARCH</button>
        </div>
      </div>
    </nav>
  );
}
