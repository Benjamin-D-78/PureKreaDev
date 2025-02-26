import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoutesProtegees = () => {
    const user = localStorage.getItem("auth");
    const auth = user && JSON.parse(user);

    if (!auth) {
        return <Navigate to="/connexion" />;  // Je redirige vers la page connexion si l'utilisateur n'est pas authentifié
    }

    // Si l'utilisateur a le rôle "admin", j'affiche le dashboard et ses sous-routes, sinon je redirige vers la page d'accueil
    return auth.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default RoutesProtegees;
