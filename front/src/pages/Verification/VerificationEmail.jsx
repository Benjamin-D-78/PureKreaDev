import { React, useState, useEffect } from 'react'
import axios from "axios"
import { useParams, Link } from "react-router-dom";
import notfound from "../NotFound/notfound.module.css"
import { URL } from '../../utils/Constantes';

const VerificationEmail = () => {

    const [message, setMessage] = useState([]);
    const { token } = useParams();

    // useEffect, c'est comme dire "fais ça dès que la page est chargée"
    useEffect(() => {
        // On créé une fonction qui va mettre à jour le statut de vérification.
        const updateVerification = async () => {
            try {
                // On envoie la requête au serveur pour vérifier l'email
                const { data } = await axios.put(`${URL.EMAIL_VERIFICATION}/${token}`)
                setMessage(data.message);
            } catch ({ response }) {
                const { message } = response.data;
                setMessage(message);
            }
        }
        updateVerification();
    }, [])
    return (
        <div className={notfound.contientNotFound}>
            <div className={notfound.divNotFound}>
                <h1>Bienvenue !</h1>
                {/* On affiche notre message s'il existe */}
                <p>{message && message}</p>
                <div className={notfound.contientBtnRevenir}>
                    <Link to="/connexion"><button className={notfound.btnRevenir}>Me connecter</button></Link>
                </div>
            </div>
        </div>
    )
}

export default VerificationEmail