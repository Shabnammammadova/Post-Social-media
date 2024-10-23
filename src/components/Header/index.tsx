import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";


import '../../index.css';

import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectUserData } from "../../store/features/userSlice";


const Header = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(selectUserData)
    const [open, setOpen] = useState(true);

    const Navigate = [
        { title: "Home", path: "/", src: "house" },
        { title: "Login", path: "/login", src: "user-check" },
        { title: "Register", path: "/register", src: "user-plus" }
    ];

    return (
        <Router>
            <div className="flex">
                <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-[#49789c] relative`}>
                    <img
                        src="./src/assets/arrow-right.png"
                        alt=""
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 text-white border-dark-purple rounded-full ${!open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}
                    />
                    <div className="flex gap-2 items-center">
                        <img src="https://www.logoai.com/oss/icons/2021/10/27/l1eXTxm2w7TM6t9.png" alt="" className={`w-[40px] cursor-pointer duration-500`} />
                        <h1 className={`text-blue-900 font-extrabold origin-left font-serif  text-4xl duration-300 ${!open && "scale-0"}`}>Forbes</h1>
                    </div>
                    <ul className="pt-5">
                        {Navigate.map((menu, index) => (
                            <li className={`flex items-center gap-x-4 *:text-blue-900 text-md font-bold cursor-pointer p-2 hover:bg-light-white rounded-md`} key={index}>
                                <img src={`./src/assets/${menu.src}.png`} alt="" />
                                <Link to={menu.path} className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</Link>

                            </li>


                        ))}
                        {user && <button className="text-gray-800"
                            disabled={loading}
                            onClick={() => dispatch(logoutAsync())}>Logout</button>}

                    </ul>
                </div>
            </div>
        </Router>
    );
}

export default Header;