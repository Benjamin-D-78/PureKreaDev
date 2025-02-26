import React from "react"
import { Link } from "react-router-dom"
import connexion from "./connectezVous.module.css"

const ConnectezVous = () => {

  return (
    <div className={connexion.contientPEtBtn}>
      <p>Connectez-vous pour une meilleure expérience utilisateur...</p>
      <div className={connexion.divBtnConnexion}>
        <Link className={connexion.linkConnexion} to={{ pathname: "/connexion"}}><button className={connexion.btnConnexion}>Me connecter</button></Link>
      </div>
    </div>
  )
}

export default ConnectezVous