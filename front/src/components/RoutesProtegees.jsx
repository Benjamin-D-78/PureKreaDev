import { Navigate, Outlet } from 'react-router-dom';

const RoutesProtegees = () => {
    const user = localStorage.getItem("auth");
    const auth = user && JSON.parse(user);

    if (!auth) {
        return <Navigate to="/connexion" />;
    }

    return auth.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default RoutesProtegees;
