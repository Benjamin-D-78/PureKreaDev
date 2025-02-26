import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RoutesPubliques = () => {
   const user = localStorage.getItem("auth")

   if (user) {
    return <Navigate to="/" />;
  }
    return user ? <Navigate to={"/"}/> : <Outlet/> 
}

export default RoutesPubliques