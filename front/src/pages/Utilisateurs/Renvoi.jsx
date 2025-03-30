import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import coin from "./coin.module.css"
import axios from "axios"
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'

// CENTRALISATION
import axiosInstance from '../../utils/axiosInstance'
import { RECAPTCHA_PUBLIC_KEY, recaptcha } from '../../utils/recaptcha'
import { URL } from '../../utils/Constantes'
import { RGXR, PATTERN } from '../../utils/Regixr'

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

const Renvoi = () => {

    // const { refRecaptcha, recaptchaToken, handleRecaptcha, resetRecaptcha } = Recaptcha()
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [email, setEmail] = useState("");
    const [responseMessage, setReponseMessage] = useState("");

    const [user, setUser] = useState({
        isActive: true
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


    // on appelle handleRecaptcha lorsque l'utilisateur clique sur le bouton.
    //   Lorsque l'utilisateur clique sur le bouton, value est égal au token qui est généré lors du clic.
    const handleRecaptcha = (value) => {
        setRecaptchaToken(value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            toast.error("Veuillez renseigner votre adresse mail.");
            return;
        }

        if (!recaptchaToken) {
            toast.error("Le CAPTCHA doit être validé.")
            return;
        }

        if (!formulaire()) return;

        if (URL.EMAIL_VERIFICATION_BIS) {
            try {
                const response = await axiosInstance.post(URL.EMAIL_VERIFICATION_BIS, { email, recaptchaToken })
                setReponseMessage(response.data.message)
                toast.success("Email envoyé avec succès, pensez à le valider pour pouvoir vous connecter.")

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("L'adresse email est déjà validée.");
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

    useEffect(() => {
        // On créer le script dans le DOM
        const script = document.createElement('script');
        // On indique l'url du fichier JS qu'on veut utiliser
        script.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_PUBLIC_KEY;
        // Chargement asynchrone : le navigateur peut continuer de télécharger d'autres ressources pendant que le script est chargé = amélioration des performances de la page.
        script.async = true;
        // Le script ne sera exécuté qu'une fois que tout le DOM sera chargé
        script.defer = true;
        // On ajoute le script au corps "body" de la page
        document.body.appendChild(script);

        return () => {
            // On nettoie tout effet secondaire laissé par le composant une fois qu'on en a plus besoin.
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <NavBar />
            <div className={coin.divContainerIn}>
                <div className={coin.boxIn1}>
                    <div className={coin.formIn}>
                        <h1 className={coin.titreCoIn}>Mail de validation</h1>
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
                            <div className={coin.divCaptcha}>
                                <ReCAPTCHA
                                    className='g-recaptcha'
                                    sitekey={RECAPTCHA_PUBLIC_KEY}
                                    action="renvoie" // Donne un nom à l'action que l'utilisateur est en train de réaliser (dans le cas où on a plusieurs captcha sur un site)
                                    onChange={handleRecaptcha}
                                />
                            </div>
                            <div className={coin.contientSubmit}>
                                <button className={coin.submitCoIn}>Envoyer</button>
                                <Link className={coin.inscription} to="/connexion"> <button className={coin.alternatif}>Connexion</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Renvoi