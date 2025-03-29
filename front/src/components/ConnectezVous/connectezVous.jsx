import { Link } from "react-router-dom"
import connexion from "./connectezVous.module.css"

const ConnectezVous = () => {

  return (
    <div className={connexion.contientPEtBtn}>
      <p>Connectez-vous pour une meilleure expérience utilisateur...</p>
      <div className={connexion.divBtnConnexion}>
        <button className={connexion.btnConnexion}><Link className={connexion.linkConnexion} to={{ pathname: "/connexion"}}>Me connecter</Link></button>
      </div>
    </div>
  )
}

export default ConnectezVous