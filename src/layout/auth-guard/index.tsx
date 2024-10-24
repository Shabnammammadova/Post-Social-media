import { useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUserAsync } from "../../services/auth";
import { useEffect } from "react";

import { useAppSelector } from "../../hooks/redux";
import { UserRole } from "../../../types";


type Props = {
    isAdmin?: boolean;
    requireAuth?: boolean;
}

export const AuthGuard = ({ isAdmin, requireAuth = true }: Props) => {
    // const { user, error, loading } = useSelector((state:RootState)=>state.user);
    const dispatch = useDispatch()
    const { user, loading, error } = useAppSelector(state => state.user)
    useEffect(() => { dispatch(getCurrentUserAsync() as any) }, [])
    if (loading) return <div>Loading...</div>
    if ((error || !user) && requireAuth) {
        return <Navigate to="/login" replace />
    }
    if (requireAuth && isAdmin && user?.role !== UserRole.Admin) {
        return <Navigate to="/" replace />
    }
    return <Outlet />
}

export default AuthGuard;