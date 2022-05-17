import React from 'react';
import {useLocation, Navigate, Outlet} from 'react-router-dom'


const RequireAuth = () => {
    const location = useLocation()
return (
    (JSON.parse(localStorage.getItem("userInfo")))
    ? 
    <Outlet/>
    : <Navigate to="/" state={{from: location }} replace />
);
}
export default RequireAuth;