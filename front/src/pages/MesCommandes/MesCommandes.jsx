import { React, useContext } from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { URL } from '../../utils/Constantes.jsx';

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import PanierTotal from "../../components/PanierSynthèse/visuelPanier.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "../Commande/commande.module.css"
import mesCommandes from "./mesCommandes.module.css"

const MesCommandes = () => {

    // const { auth } = useContext(AuthContext)

    const [commandes, setCommandes] = useState([]);
    const { id } = useParams();

    // const token = localStorage.getItem("auth_token");

    useEffect(() => {
        const userAuth = localStorage.getItem("auth");
        const auth = userAuth && JSON.parse(userAuth);

        if (auth) {
            const commandesByUser = async () => {
                if (URL.COMMANDE_BY_USER) {
                    try {
                        const response = await axios.get(`${URL.COMMANDE_BY_USER}/${id}`, { withCredentials: true })
                        setCommandes(response.data)
                    } catch (error) {
                        console.error("Erreur lors de la recherche des commandes", error.message)
                    }
                }
            };
            commandesByUser();
        }
    }, [id])

    return (
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Mes commandes</h1>

            <div className={commande.conteneurGlobal}>
                <div className={commande.conteneurG}>
                    <PanierTotal />
                    <PrenezRendezVous />
                    <Accordeon />
                </div>
                <div>
                    <div className={commande.blocEntete1}>
                        <div className={commande.entete1}>
                            <p className={commande.pName}>Récapitulatif</p>
                        </div>
                    </div>
                    <div className={mesCommandes.conteneurD}>
                        <div className={mesCommandes.conteneurGeneralRecap}>
                            <p className={commande.livraisonA}>Mes commandes</p>
                            <div className={mesCommandes.entete2}>
                                <p className={mesCommandes.ent1}>Date</p>
                                <p className={mesCommandes.ent2}>Total</p>
                                <p className={mesCommandes.ent3}>Commande</p>
                                <p className={mesCommandes.ent4}>Facture</p>
                            </div>

                            {commandes.map((commande, index) => (
                                <div className={mesCommandes.contientDetails} key={index}>
                                    <p className={mesCommandes.date}>{new Date(commande.date).toLocaleDateString()}</p>
                                    <p className={mesCommandes.total}>{commande.prixTotal} €</p>
                                    <p className={mesCommandes.commande}>{commande._id}</p>
                                    <p className={mesCommandes.facture}>Télécharger</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MesCommandes