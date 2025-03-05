import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import coin from "./coin.module.css"

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

// CENTRALISATION
import axiosInstance from "../../utils/axiosInstance";
import { RGXR } from "../../utils/Regixr";
import { PATTERN } from "../../utils/Regixr";
import { URL } from "../../utils/Constantes";

const Reset = () => {

    const [email, setEmail] = useState("");
    // const [responseMessage, setReponseMessage] = useState("");

    const [user, setUser] = useState({
        email: ""
    })

    const [error, setError] = useState({
        email: ""
    })

    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        if (user.email) {
            const emailRegexr = RGXR.EMAIL;
            if (!emailRegexr.test(user.email) || user.email.length < 8 || user.email.length > 60) {
                messageError.email = "Format email, entre 8 et 60 caractères attendus."
                isValid = false;
            }
        }

        setError(messageError);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            toast.error("Veuillez renseigner votre adresse mail.");
            return;
        }
        if (!formulaire()) return;

        if (URL.USER_RESET) {
            try {
                const response = await axiosInstance.post(URL.USER_RESET, { email })
                // setReponseMessage(response.data.message)
                toast.success("Email envoyé avec succès.")
                setEmail("");

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("Veuillez valider votre adresse mail avant toute chose.");
                }

                if (error.response && error.response.status === 404) {
                    toast.error("L'adresse mail n'est associée à aucun compte.")
                }

                if (error.response && error.response.status > 404) {
                    toast.error("Erreur interne. Veuillez nous contacter.")
                }
            }
        } else {
            toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })
        }

    }

    return (
        <div>
            <NavBar />
            <div className={coin.divContainerIn}>
                <div className={coin.boxIn1}>
                    <div className={coin.formIn}>
                        <h1 className={coin.titreCoIn}>Réinitialisation du mot de passe</h1>
                        <form noValidate onSubmit={handleSubmit}>
                            <label className={coin.labelCoIn} htmlFor="email-connexion">Votre e-mail <span className={coin.spanInscription}>*</span></label>
                            <input
                                type="email"
                                name='email'
                                id='email-connexion'
                                className={coin.inputCoIn}
                                minLength={8}
                                maxLength={60}
                                pattern={PATTERN.EMAIL}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                                }} />
                            <br />
                            <div className={coin.contientSubmit}>
                                <button className={coin.submitCoIn}>Envoyer</button>
                                <Link className={coin.inscription} to="/connexion"> <button className={coin.alternatif}>Connexion</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Reset