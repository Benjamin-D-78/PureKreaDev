import React from 'react'
import { Link } from 'react-router-dom'
import calltoaction from "./prenezRendezVous.module.css"

const PrenezRendezVous = () => {
    return (
        <div className={calltoaction.contientCallToAction}>
            <p className={calltoaction.pCallToAction}>Laissez-vous tenter par le sur-mesure...</p>
            <div className={calltoaction.divBtnCallToAction}>
                <Link to="/rendez-vous"><button className={calltoaction.btnCallToAction}>Prenez rendez-vous</button></Link>
            </div>
        </div>
    )
}

export default PrenezRendezVous