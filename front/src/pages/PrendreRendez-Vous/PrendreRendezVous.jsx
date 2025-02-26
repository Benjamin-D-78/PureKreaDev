import { React, useEffect } from 'react'
import rdv from "./prendrerdv.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

// ICONES
import ciseaux from "../../images/Sur-mesure.png"


const PrendreRendezVous = () => {

    return (
        <div>
            <NavBar />
            <h1 className={rdv.h1}>Prendre rendez-vous</h1>
            <div className={rdv.conteneur}>
                <div>
                    <div className={rdv.divImg}>
                        <img src={ciseaux} alt="prise de rendez-vous" />
                        <a
                            href="https://calendly.com/desmonet-idf/creons-votre-cravate"
                            target="_blank"
                            rel="noopener noreferrer">
                            <button className={rdv.button}>Prendre rendez-vous</button>
                        </a>
                    </div>
                    <div className={rdv.divBtn}>
                        <a
                            href="https://calendly.com/desmonet-idf/creons-votre-cravate"
                            target="_blank"
                            rel="noopener noreferrer">
                            <button className={rdv.button}>Prendre rendez-vous</button>
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};



export default PrendreRendezVous