import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import coin from "./coin.module.css"

// CENRALISATION
import { URL } from '../../utils/Constantes'
import axiosInstance from '../../utils/axiosInstance'
import ReCAPTCHA from 'react-google-recaptcha'

// ICONES
import voir from "../../images/Icones/voir.svg"

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar"
import Footer from '../../components/Footer/Footer'
import { PATTERN, RGXR } from '../../utils/Regixr'
import { RECAPTCHA_PUBLIC_KEY } from '../../utils/variables'


const Inscription = () => {

    const [voirA, setVoirA] = useState(false)
    const [voirB, setVoirB] = useState(false)
    const [mdpTape, setMdpTape] = useState(false)
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const [user, setUser] = useState({
        isActive: true
    })
    const navigate = useNavigate();


    const [error, setError] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        if (user.lastname) {
            const lastnameRegexr = RGXR.NOM;
            if (!lastnameRegexr.test(user.lastname) || user.lastname.length < 2 || user.lastname.length > 30) {
                messageError.lastname = "Entre 2 et 30 caractères attendus."
                isValid = false;
            }
        }
        if (user.firstname) {
            const firstnameRegexr = RGXR.PRENOM;
            if (!firstnameRegexr.test(user.firstname) || user.firstname.length < 2 || user.firstname.length > 30) {
                messageError.firstname = "Entre 2 et 30 caractères attendus."
                isValid = false;
            }
        }
        if (user.email) {
            const emailRegexr = RGXR.EMAIL;
            if (!emailRegexr.test(user.email) || user.email.length < 8 || user.email.length > 60) {
                messageError.email = "Format email, entre 8 et 60 caractères attendus."
                isValid = false;
            }
        }
        if (user.password) {
            const passwordRegexr = RGXR.PASSWORD;
            if (!passwordRegexr.test(user.password) || user.password.length < 8 || user.password.length > 40) {
                isValid = false;
            }
        }
        if (user.password !== user.repeatPassword) {
            messageError.repeatPassword = "Les mots de passe ne sont pas identiques."
            isValid = false;
        }

        setError(messageError);
        return isValid;
    }


    // Permet de mettre à jour les valeurs dans le state "utilisateur"
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((user) => ({ ...user, [name]: value })); // "..." fait une copie de l'état précédent.

        // Si l'utilisateur commence à taper le mot de passe, on met à jour le state
        if (name === 'password' && value.length > 0) {
            setMdpTape(true);
        }
    }

    const handleRecaptcha = (value) => {
        setRecaptchaToken(value);
    };

    const checkInput = (event) => {
        const { name } = event.target; // On récupère le nom du champ qui a perdu le focus
        formulaire(); // on rappelle la fonction formumaire pour tenter de revalider.
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!user.lastname || !user.firstname || !user.email || !user.password) {
            toast.error("Veuillez remplir tous les champs", { autoClose: 3000 })
            return;
        }
        
        if (!formulaire()) return;

        if (!recaptchaToken) {
            toast.error("Le CAPTCHA doit être validé.")
            return;
        }

        if (user.password !== user.repeatPassword) {
            toast.error("Les mots de passe ne sont pas identiques.", { autoClose: 3000 })
            return;
        }

        if (URL.USER_INSCRIPTION) {
            try {
                const response = await axiosInstance.post(URL.USER_INSCRIPTION, { ...user, recaptchaToken })
                if (response.status === 201) {
                    navigate("/");
                    toast.success("Merci pour votre inscription ! Pensez à valider votre email pour pouvoir vous connecter.", { autoClose: 5000 })
                }
            } catch (error) {
                console.log("Echec de l'inscription de l'utilisateur.", error.message)
                toast.error("Un problème est survenu, veuillez nous contacter.", { autoClose: 3000 })
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
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
                        <h1 className={coin.titreCoIn}>Inscription</h1>
                        <form onSubmit={handleSubmit} noValidate>
                            <label className={coin.labelCoIn} htmlFor="firstname-inscription">Prénom : <span className={coin.spanInscription}>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="text"
                                name='firstname'
                                id='firstname-inscription'
                                autocomplete="username" // Accessibilité
                                onChange={handleChange}
                                onBlur={checkInput}
                                minLength={2}
                                maxLength={30}
                                pattern={PATTERN.PRENOM}
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '');
                                }}
                            />
                            {error.firstname && <span className={coin.spanError}>{error.firstname}</span>}
                            <br />

                            <label className={coin.labelCoIn} htmlFor="lastname-inscription">Nom : <span className={coin.spanInscription}>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="text"
                                name='lastname'
                                id='lastname-inscription'
                                autocomplete="username" // Accessibilité
                                onChange={handleChange}
                                onBlur={checkInput}
                                minLength={2}
                                maxLength={30}
                                pattern={PATTERN.NOM}
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '').toUpperCase()
                                }}
                            />
                            {error.lastname && <span className={coin.spanError}>{error.lastname}</span>}
                            <br />

                            <label className={coin.labelCoIn} htmlFor="email-inscription">E-mail : <span className={coin.spanInscription}>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="text"
                                name='email'
                                id='email-inscription'
                                autocomplete="username" // Accessibilité
                                onChange={handleChange}
                                onBlur={checkInput}
                                minLength={8}
                                maxLength={60}
                                pattern={PATTERN.EMAIL}
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                                }} />
                            <span className={coin.spanAlerte}>Adresse "gmail" recommandée.</span><br />
                            {error.email && <span className={coin.spanError}>{error.email}</span>}
                            <br />

                            <label className={coin.labelCoIn} htmlFor="password-inscription">Mot de passe : <span className={coin.spanInscription}>*</span></label>
                            <div className={coin.contientInputImg}>
                                <div className={coin.inputsMDP}>
                                    <input
                                        className={coin.inputMDP}
                                        type={voirA ? "text" : "password"}
                                        name='password'
                                        id='password-inscription'
                                        autocomplete="new-password" // Accessibilité
                                        onChange={handleChange}
                                        onBlur={checkInput}
                                        minLength={8}
                                        maxLength={40}
                                        pattern={PATTERN.PASSWORD}
                                        onInput={(event) => {
                                            event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                                        }} />
                                </div>
                                <div className={coin.contientVoir}>
                                    <img onClick={() => setVoirA(!voirA)} className={coin.voir} src={voir} alt="Icone pour voir le mot de passe indiqué" />
                                </div>
                            </div>
                            <br />

                            <label className={coin.labelCoIn} htmlFor="repeatPassword-inscription">Répétez le mot de passe : <span className={coin.spanInscription}>*</span></label>
                            <div className={coin.contientInputImg}>
                                <div className={coin.inputsMDP}>
                                    <input
                                        className={coin.inputMDP}
                                        type={voirB ? "text" : "password"}
                                        name='repeatPassword'
                                        id='repeatPassword-inscription'
                                        autocomplete="new-password" // Accessibilité
                                        onChange={handleChange}
                                        onBlur={checkInput}
                                        minLength={8}
                                        maxLength={40}
                                        pattern={PATTERN.PASSWORD}
                                        onInput={(event) => {
                                            event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                                        }} />
                                </div>
                                <div className={coin.contientVoir}>
                                    <img onClick={() => setVoirB(!voirB)} className={coin.voir} src={voir} alt="Icone pour voir le mot de passe indiqué" />
                                </div>
                            </div>
                            {error.password && <span className={coin.spanError}>{error.password}</span>}
                            {mdpTape && (
                                <div>
                                    {!user.password?.match(/.*[a-z].*/) && (
                                        <span className={coin.spanError}>Au moins une lettre minuscule.</span>
                                    )}
                                    {!user.password?.match(/.*[A-Z].*/) && (
                                        <span className={coin.spanError}>Au moins une lettre majuscule.</span>
                                    )}
                                    {!user.password?.match(/.*\d.*/) && (
                                        <span className={coin.spanError}>Au moins un chiffre.</span>
                                    )}
                                    {!user.password?.match(/.*[,;.?!\*\(\)].*/) && (
                                        <span className={coin.spanError}>Au moins un caractère spécial.</span>
                                    )}
                                </div>
                            )}

                            {error.repeatPassword && <span className={coin.spanError}>{error.repeatPassword}</span>}
                            <br />
                            <div className={coin.divCaptcha}>
                                <ReCAPTCHA
                                    className='g-recaptcha'
                                    sitekey={RECAPTCHA_PUBLIC_KEY}
                                    action="inscription" // Donne un nom à l'action que l'utilisateur est en train de réaliser (dans le cas où on a plusieurs captcha sur un site)
                                    onChange={handleRecaptcha}
                                />
                            </div>
                            <div className={coin.contientSubmit}>
                                <button className={coin.submitCoIn}>M'inscrire</button>
                                <Link className={coin.connexion} to="/connexion"><button className={coin.alternatif}>Déjà inscrit ?</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Inscription