import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Home from "../components/pages/Home";
import ForgotPassword from "../components/pages/ForgotPassword"
import AuthGuard from "../layout/auth-guard";
import ProfilePage from "../components/pages/Profile";
import Dashboard from "../components/pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute/privateroute";
import ResetPassword from "../components/pages/ResetPassword";
export const router = createBrowserRouter([

    {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>
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
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />
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