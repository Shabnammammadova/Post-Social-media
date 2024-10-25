import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserData } from "../../store/features/userSlice";

const PrivateRoute = () => {
    const { user } = useSelector(selectUserData);
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
