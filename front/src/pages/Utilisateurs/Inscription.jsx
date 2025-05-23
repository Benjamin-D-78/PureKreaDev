import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import coin from "./coin.module.css"

// CENRALISATION
import { URL } from '../../utils/constantes'
import { ERROR } from '../../utils/error'
import axiosInstance from '../../utils/axiosInstance'
import ReCAPTCHA from 'react-google-recaptcha'

// ICONES
import voir from "../../images/Icones/voir.svg"

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar"
import Footer from '../../components/Footer/Footer'
import { RGXR, ONINPUT, PATTERN } from '../../utils/regex'
import useScriptRecaptcha, { RECAPTCHA_PUBLIC_KEY } from '../../utils/recaptcha'


const Inscription = () => {

    const [voirA, setVoirA] = useState(false)
    const [voirB, setVoirB] = useState(false)
    const [mdpTape, setMdpTape] = useState(false)
    const refRecaptcha = useRef(null)
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

    useScriptRecaptcha()

    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        if (user.lastname) {
            const lastnameRegexr = RGXR.NOM;
            if (!lastnameRegexr.test(user.lastname) || user.lastname.length < 2 || user.lastname.length > 30) {
                messageError.lastname = ERROR.U_LASTNAME
                isValid = false;
            }
        }
        if (user.firstname) {
            const firstnameRegexr = RGXR.PRENOM;
            if (!firstnameRegexr.test(user.firstname) || user.firstname.length < 2 || user.firstname.length > 30) {
                messageError.firstname = ERROR.U_FIRSTNAME
                isValid = false;
            }
        }
        if (user.email) {
            const emailRegexr = RGXR.EMAIL;
            if (!emailRegexr.test(user.email) || user.email.length < 8 || user.email.length > 60) {
                messageError.email = ERROR.U_EMAIL
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

    const resetRecaptcha = (value) => {
        setRecaptchaToken(null);
        // "current" c'est l'instance du composant ou l'élément DOM auquel la référence est attachée.
        if (refRecaptcha.current) {
            refRecaptcha.current.reset()
        }
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
                    console.log(response);
                    navigate("/");
                    toast.success("Merci pour votre inscription ! Pensez à valider votre email pour pouvoir vous connecter.", { autoClose: 5000 })
                    resetRecaptcha()
                }
            } catch (error) {
                console.log("Echec de l'inscription de l'utilisateur.", error.message)
                toast.error("Un problème est survenu, veuillez nous contacter.", { autoClose: 3000 })
                resetRecaptcha()
            }
        } else {
            toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })
        }
    }

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
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={formulaire}
                                minLength={2}
                                maxLength={30}
                                pattern={PATTERN.PRENOM}
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(ONINPUT.U_PRENOM, '');
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
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={formulaire}
                                minLength={2}
                                maxLength={30}
                                pattern={PATTERN.NOM}
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(ONINPUT.U_NOM, '').toUpperCase()
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
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={formulaire}
                                minLength={8}
                                maxLength={60}
                                pattern={PATTERN.EMAIL}
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(ONINPUT.U_EMAIL, '').toLowerCase();
                                }} />
                            {/* <span className={coin.spanAlerte}>Adresse "gmail" recommandée.</span><br /> */}
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
                                        autocomplete="off"
                                        onChange={handleChange}
                                        onBlur={formulaire}
                                        minLength={8}
                                        maxLength={40}
                                        pattern={PATTERN.PASSWORD}
                                        onInput={(event) => {
                                            event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
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
                                        autocomplete="off"
                                        onChange={handleChange}
                                        onBlur={formulaire}
                                        minLength={8}
                                        maxLength={40}
                                        pattern={PATTERN.PASSWORD}
                                        onInput={(event) => {
                                            event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
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
                                    ref={refRecaptcha}
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