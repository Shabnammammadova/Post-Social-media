import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Home from "../components/pages/Home";
import { AuthGuard } from "../layout/auth-guard/index";
export const router = createBrowserRouter([
    {
        path: "",
        element: <AuthGuard />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ]
    },

])