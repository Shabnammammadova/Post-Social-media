import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./components/pages/Home";

import './index.css';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const App = () => {
  const [open, setOpen] = useState(true);

  const Navigate = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" }
  ];

  return (
    <Router>
      <div className="flex">
        <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}>
          <img
            src="./src/assets/control.png"
            alt=""
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 text-dark-purple border-dark-purple rounded-full ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-2 items-center">
            <img src="./src/assets/Oppologo.png" alt="" className={`cursor-pointer duration-500`} />
            <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}></h1>
          </div>
          <ul>
            {Navigate.map((menu, index) => (
              <li className="text-gray-300 text-sm cursor-pointer" key={index}>
                <Link to={menu.path} className="block py-2 hover:text-white">{menu.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
