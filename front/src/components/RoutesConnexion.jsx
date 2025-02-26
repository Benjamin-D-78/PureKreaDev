import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'


const RoutesConnexion = () => {

    const user = localStorage.getItem("auth");
    const auth = user && JSON.parse(user);

    if (!auth) {
        return <Navigate to="/connexion"/>
    }

    return <Outlet />
}

export default RoutesConnexion