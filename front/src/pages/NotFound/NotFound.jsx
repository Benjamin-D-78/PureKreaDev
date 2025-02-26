import React from 'react'
import { Link } from 'react-router-dom'
import notfound from "./notfound.module.css"


export default function NotFound() {
  return (
    <div className={notfound.contientNotFound}>
      <div className={notfound.divNotFound}>
        <h1>Page non trouvée</h1>
        <p>Vous ne trouverez rien ici...</p>
        <div className={notfound.contientBtnRevenir}>
          <Link to="/"><button className={notfound.btnRevenir}>Revenir à l'accueil</button></Link>
        </div>
      </div>
    </div>
  )
}
