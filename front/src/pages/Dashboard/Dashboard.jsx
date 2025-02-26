import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import dashboard from "./css/dashboard.module.css"

export default function Dashboard() {
  return (
    <div className={dashboard.div}>
        <NavBar/>
        <h1 className={dashboard.h1}>Dashboard</h1>
        <nav className={dashboard.nav}>
          <li className={dashboard.LIdashboard}>
            <NavLink className={dashboard.a} to="/dashboard/items">Produits</NavLink>
          </li>
          <li className={dashboard.LIdashboard}>
            <NavLink className={dashboard.a} to="/dashboard/utilisateurs">Utilisateurs</NavLink>
          </li>
          <li className={dashboard.LIdashboard}>
            <NavLink className={dashboard.a} to="/dashboard/commande">Commandes</NavLink>
          </li>
          <li className={dashboard.LIdashboard}>
            <NavLink className={dashboard.a} to="/dashboard/messages">Messages</NavLink>
          </li>
          <li className={dashboard.LIdashboard}>
            <NavLink className={dashboard.a} to="/dashboard/abonnement">Abonnés</NavLink>
          </li>
        </nav>
        <hr />
        <Outlet/> {/* Mes composants ressortent ici. */}
    </div>
    
  )
}
