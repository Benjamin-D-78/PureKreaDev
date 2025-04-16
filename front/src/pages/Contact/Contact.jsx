import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import ReCAPTCHA from "react-google-recaptcha";
import useScriptRecaptcha, { RECAPTCHA_PUBLIC_KEY } from '../../utils/recaptcha';

// CENTRALISATION
import { URL } from '../../utils/constantes';
import { ONINPUT, PATTERN } from '../../utils/regex'
import { USER_CHAMPS } from '../../utils/champs';
import axiosInstance from '../../utils/axiosInstance'

// ICONES
import telephone from "../../images/Icones/telephone.png"

// CSS
import boutique from "../Boutique/Boutique.module.css"
import contact from "./contact.module.css"
import commande from "../Commande/commande.module.css"
import monProfil from "../MonProfil/monprofil.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import Accordeon from '../../components/Accordeon/accordeon'


const Contact = () => {

    const refRecaptcha = useRef(null) // On va cherche la référence du recaptcha dans le dom
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const [message, setMessage] = useState({
        motif: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        content: "",
        verification: false,
        preference: ""
    })

    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        content: "",
    })

    useScriptRecaptcha()

    const formulaire = (champ) => {
        const messageError = { ...error };
        let isValid = true;

        if (message[champ] && USER_CHAMPS[champ]) {
            const { regex, minLength, maxLength, type, min, max, errorMessage } = USER_CHAMPS[champ]
            const value = message[champ]

            if (type === "number") {
                const number = Number(value)
                if (!regex.test(value) || number < min || number > max) {
                    messageError[champ] = errorMessage
                    isValid = false
                }
            } else {
                if (!regex.test(value) || value.length < minLength || value.length > maxLength) {
                    messageError[champ] = errorMessage
                    isValid = false
                }
            }

            if (isValid && champ in messageError) {
                messageError[champ] = ""
            }
        }

        setError(messageError);
        return isValid;
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        // On utilise prev comme pour dire qu'on utilise le state le plus récent.
        if (type === "checkbox") { // si l'élément est de type checked
            setMessage((prev) => ({ ...prev, [name]: checked }))
        } else { // si l'élément est d'un autre type
            setMessage((prev) => ({ ...prev, [name]: value }))
        }
    }


    // on appelle handleRecaptcha lorsque l'utilisateur clique sur le bouton.
    // Lorsque l'utilisateur clique sur le bouton, value est égal au token qui est généré lors du clic.
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

        if (!message.motif || !message.firstname || !message.lastname || !message.email || !message.content) {
            toast.error("Certains des champs obligatoires sont vides.")
            return;
        }

        // On teste chaque champ individuellement
        let testFormulaire = true

        for (const champ in message) {
            const isValid = formulaire(champ)
            if (!isValid) testFormulaire = false
        }

        if (!testFormulaire) {
            toast.error("Vous devez saisir les champs correctement.")
            return;
        }

        if (!message.verification) {
            toast.error("Vous devez accepter d'être recontacté pour envoyer votre message.")
            return;
        }
        if (!recaptchaToken) {
            toast.error("Le CAPTCHA doit être validé.")
            return;
        }
        if (URL.MESSAGE_CREATION) {
            try {
                const response = await axiosInstance.post(URL.MESSAGE_CREATION, { ...message, recaptchaToken })
                // console.log(response.data)
                if (response.status === 201) {
                    toast.success("Message envoyé avec succès.", { autoClose: 1000 })

                    setMessage({
                        motif: "",
                        firstname: "",
                        lastname: "",
                        email: "",
                        phone: "",
                        content: "",
                        verification: false,
                        preference: ""
                    })
                    resetRecaptcha()
                }
            } catch (error) {
                resetRecaptcha()
                console.error("Echec de l'envoi du message : ", error.message)
                toast.error("Echec de l'envoi du message.", { autoClose: 3000 })
            }
        }
    }

    return (
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Contact</h1>
            <div className={commande.conteneurGlobal}>
                <div className={commande.conteneurG}>
                    <div className={contact.informationsContact}>
                        <h2 className={contact.h2Contact}>Vous accueillir</h2>
                        <div className={contact.divHoraire}>
                            <p>Du lundi au vendredi :</p>
                            <ul className={contact.ulContact}>
                                <li>9h à 11h30</li>
                                <li>15h à 17h30</li>
                            </ul>
                            <hr className={contact.hrContact} />
                            <h2 className={contact.h2ContactBis}>PureKréa</h2>
                            <h3 className={contact.h3Contact}>Artisan cravatier</h3>
                            <ul className={contact.ulContact}>
                                <li>Place d'Arme</li>
                                <li>78000 VERSAILLES</li>
                            </ul>
                        </div>
                    </div>
                    <Accordeon />
                </div>

                <div>
                    <div className={boutique.blocEntete1}>
                        <div className={contact.entete1}>
                            <p className={contact.pStock}>Contactez-nous</p>
                            <p className={contact.pStock}>|</p>
                            <div className={contact.contientInfoPhone}>
                                <div className={contact.contientPhone}>
                                    <img src={telephone} alt="icone de téléphone" />
                                </div>
                                <p className={contact.pStock}>01 70 70 70 70</p>
                            </div>
                        </div>
                    </div>
                    <div className={contact.conteneurD}>
                        <div className={contact.contientFormulaire}>
                            <h4 className={contact.h4Contact}>Formulaire</h4>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className={contact.contientMotif}>
                                    <label htmlFor="motif">Votre demande concerne <span className={contact.span}>*</span></label>
                                    <select name='motif' value={message.motif} onChange={handleChange} aria-label='Sélectionnez un motif de contact'>
                                        <option></option>
                                        <option value="Le service sur-mesure">Le service sur-mesure</option>
                                        <option value="Une erreur dans une commande">Une erreur dans une commande</option>
                                        <option value="Une réclamation">Une réclamation</option>
                                        <option value="Une question">Une question</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                                <div className={contact.premiereLigne}>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="lastname">Nom <span className={contact.span}>*</span></label>
                                        <input
                                            type="text"
                                            name='lastname'
                                            id='lastname'
                                            autocomplete="family-name"
                                            value={message.lastname}
                                            onChange={handleChange}
                                            onBlur={() => formulaire("lastname")}
                                            minLength={2}
                                            maxLength={30}
                                            pattern={PATTERN.NOM}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_NOM, '').toUpperCase();
                                            }}
                                        // avec "replace" et "/g, ''", on recherche tous les caractères qui ne correspondent PAS à ceux que l'on a renseigné et on les remplace par des caractères vides.
                                        />
                                        {error.lastname && <span className={monProfil.spanError}>{error.lastname}</span>}

                                    </div>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="firstname">Prénom <span className={contact.span}>*</span></label>
                                        <input
                                            type="text"
                                            name='firstname'
                                            id='firstname'
                                            autocomplete="given-name"
                                            value={message.firstname}
                                            onChange={handleChange}
                                            onBlur={() => formulaire("firstname")}
                                            minLength={2}
                                            maxLength={30}
                                            pattern={PATTERN.PRENOM}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_PRENOM, '')
                                            }} />
                                        {error.firstname && <span className={monProfil.spanError}>{error.firstname}</span>}

                                    </div>
                                </div>
                                <div className={contact.premiereLigne}>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="email">Email <span className={contact.span}>*</span></label>
                                        <input
                                            type="text"
                                            name='email'
                                            id='email'
                                            autocomplete="email"
                                            value={message.email}
                                            onChange={handleChange}
                                            onBlur={() => formulaire("email")}
                                            minLength={8}
                                            maxLength={60}
                                            pattern={PATTERN.EMAIL}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_EMAIL, '').toLowerCase();
                                            }} />
                                        {error.email && <span className={monProfil.spanError}>{error.email}</span>}
                                    </div>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="phone">Téléphone</label>
                                        <input
                                            type="number"
                                            name='phone'
                                            id='phone'
                                            autocomplete="tel"
                                            value={message.phone}
                                            onChange={handleChange}
                                            onBlur={() => formulaire("phone")}
                                            // max={9999999999}
                                            minLength={10}
                                            maxLength={10}
                                            pattern={PATTERN.PHONE}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_PHONE, '')
                                            }} />
                                        {error.phone && <span className={monProfil.spanError}>{error.phone}</span>}
                                    </div>
                                </div>
                                <div className={contact.contientLabelInputArea}>
                                    <label htmlFor="content">Commentaire <span className={contact.span}>*</span></label>
                                    <textarea
                                        name="content"
                                        id='content'
                                        autocomplete="off"
                                        className={contact.textarea}
                                        value={message.content}
                                        onChange={handleChange}
                                        onBlur={() => formulaire("content")}
                                        minLength={3}
                                        maxLength={500}
                                        pattern={PATTERN.CONTENT}
                                        onInput={(event) => {
                                            event.target.value = event.target.value.replace(ONINPUT.U_CONTENT, '');
                                        }}
                                    >
                                    </textarea>
                                    {error.content && <span className={monProfil.spanError}>{error.content}</span>}
                                </div>
                                <div className={contact.contientLabelInputRadio}>
                                    <div>
                                        <label htmlFor="matin">Préférence de contact</label>
                                        <div>
                                            <input
                                                type="radio"
                                                name='preference'
                                                id='matin'
                                                value="Matin"
                                                autocomplete="off"
                                                checked={message.preference === 'Matin'}
                                                onChange={handleChange} />
                                            <p>Matin</p>
                                        </div>
                                        <div>
                                            <label htmlFor="apres-midi" className="sr-only">Préférence de contact : après-midi</label>
                                            <input
                                                type="radio"
                                                name='preference'
                                                id='apres-midi'
                                                value="Après-midi"
                                                autocomplete="off"
                                                checked={message.preference === 'Après-midi'}
                                                onChange={handleChange} />
                                            <p>Après-midi</p>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                </div>
                                <div className={contact.contientConfirmation}>
                                    <div className={contact.contientinput}>
                                        <label htmlFor="verification" className="sr-only">Vous acceptez d'être recontacté(e)</label>
                                        <input
                                            type="checkbox"
                                            name='verification'
                                            id='verification'
                                            autocomplete="off"
                                            checked={message.verification}
                                            onChange={handleChange} />
                                    </div>
                                    <p>En cochant cette case, vous acceptez d'être recontacté(e) dans le cadre de votre demande.</p>
                                </div>
                                <div className={contact.contientBtnValidation}>
                                    <ReCAPTCHA
                                        ref={refRecaptcha}
                                        className='g-recaptcha'
                                        sitekey={RECAPTCHA_PUBLIC_KEY}
                                        action="contact" // Donne un nom à l'action que l'utilisateur est en train de réaliser (dans le cas où on a plusieurs captcha sur un site)
                                        onChange={handleRecaptcha}
                                    />
                                    <button className={contact.btnValidation}>Envoyer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Contact