import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Home from "../components/pages/Home";
import AuthGuard from "../layout/auth-guard";
import ProfilePage from "../components/pages/Profile";
import Dashboard from "../components/pages/Dashboard";
export const router = createBrowserRouter([

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

    {
        path: "",
        element: <AuthGuard />,
        children: [
            {
                path: "/profile",
                element: <ProfilePage />
            }
        ]
    },
    {
        path: "",
        element: <AuthGuard isAdmin />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    }


])