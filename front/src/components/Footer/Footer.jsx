import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from "react-router-dom"
import footerCSS from "./footer.module.css"
import axios from "axios"
import { toast } from 'react-toastify'

// CENTRALISATION
import { PATTERN, RGXR } from '../../utils/Regixr'
import { URL } from '../../utils/Constantes'
import { RECAPTCHA_PUBLIC_KEY } from '../../utils/recaptcha'
import axiosInstance from '../../utils/axiosInstance'

// COMPOSANTS
import ModalePolitique from '../ModalPolitique/ModalePolitique'
import ReCAPTCHA from 'react-google-recaptcha'

// ICONES
import linkedin from "../../images/Reseaux/linkedin.png"
import github from "../../images/Reseaux/github.png"


export default function Footer() {

  const refRecaptcha = useRef(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const [abonne, setAbonne] = useState({
    firstname: "",
    lastname: "",
    email: ""
  })

  const formulaire = () => {
    let isValid = true;

    if (abonne.lastname) {
      const lastnameRegexr = RGXR.NOM;
      if (!lastnameRegexr.test(abonne.lastname) || abonne.lastname.length < 2 || abonne.lastname > 30) {
        isValid = false;
      }
    }

    if (abonne.firstname) {
      const firstnameRegexr = RGXR.PRENOM;
      if (!firstnameRegexr.test(abonne.firstname) || abonne.firstname.length < 2 || abonne.firstname > 30) {
        isValid = false;
      }
    }

    if (abonne.email) {
      const emailRegexr = RGXR.EMAIL;
      if (!emailRegexr.test(abonne.email) || abonne.email.length < 8 || abonne.email > 60) {
        isValid = false;
      }
    }

    return isValid;
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setAbonne((abonne) => ({ ...abonne, [name]: value }))
  }

  // on appelle handleRecaptcha lorsque l'utilisateur clique sur le bouton.
  //   Lorsque l'utilisateur clique sur le bouton, value est égal au token qui est généré lors du clic.
  const handleRecaptcha = (value) => {
    setRecaptchaToken(value);

  };

  const resetRecaptcha = (value) => {
    setRecaptchaToken(null);
    if (refRecaptcha.current) {
      refRecaptcha.current.reset()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!abonne.firstname || !abonne.lastname || !abonne.email) {
      toast.error("Certains des champs obligatoires sont vides.")
      return;
    }

    if (!formulaire()) return;

    if (!recaptchaToken) {
      toast.error("Le CAPTCHA doit être validé.")
      return;
    }

    if (URL.ABONNE_CREATION) {
      try {
        const response = await axiosInstance.post(URL.ABONNE_CREATION, { ...abonne, recaptchaToken })
        // console.log(response)
        if (response.status === 201) {
          toast.success("Merci de vous être abonné !", { autoClose: 3000 })
          setAbonne({
            firstname: "",
            lastname: "",
            email: ""
          })
          resetRecaptcha()
        }
      } catch (error) {
        setAbonne({
          firstname: "",
          lastname: "",
          email: ""
        })
        resetRecaptcha()

        if (error.response && error.response.status === 400) {
          toast.error("Veuillez réessayer.", { autoClose: 3000 })
        }
        if (error.response && error.response.status === 404) {
          toast.error("Vous êtes déjà abonné.", { autoClose: 3000 })
        }
        if (error.response && error.response.status === 409) {
          toast.error("Veuillez réessayer.", { autoClose: 3000 })
        }
        if (error.response && error.response.status === 500) {
          console.error("Echec de la tentative d'abonnement : ", error.message)
          toast.error("Echec de la tentative d'abonnement.", { autoClose: 3000 })
        }
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);

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
    <footer>
      {/* Bloc gauche */}
      <div className={footerCSS.gauche}>
        <div>
          <p className={footerCSS.pGauche}>Suivez-nous</p>
        </div>
        <div className={footerCSS.contientReseaux}>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/78600-benjamin-d"><img className={footerCSS.lg} src={linkedin} alt="Logo Linkedin" /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/Benjamin-D-78"><img className={footerCSS.lg} src={github} alt="Logo Linkedin" /></a>
        </div>
      </div>
      {/* Bloc centre */}
      <div className={footerCSS.centre}>
        <div>
          <p className={footerCSS.pCentre}>Newsletter</p>
        </div>
        <div className={footerCSS.contientTexteEtForm}>
          <div className={footerCSS.divTexteNewsletter}>
            <p className={footerCSS.pTexteNewsletter}>Abonnez-vous pour recevoir toutes nos actualités et offres exclusives !</p>
          </div>
          <div className={footerCSS.divFormNewsletter}>
            <form onSubmit={handleSubmit}>
              <div className={footerCSS.divFormNewsletterH}>
                <input
                  className={footerCSS.inputFormNewsletterH}
                  placeholder='Nom'
                  type="text"
                  id='lastname'
                  name='lastname'
                  minLength={2}
                  maxLength={30}
                  pattern={PATTERN.NOM}
                  value={abonne.lastname}
                  onChange={handleChange}
                  required
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '').toUpperCase();
                  }}
                />
                <input
                  className={footerCSS.inputFormNewsletterH}
                  placeholder='Prénom'
                  type="text"
                  id='firstname'
                  name='firstname'
                  minLength={2}
                  maxLength={30}
                  pattern={PATTERN.PRENOM}
                  value={abonne.firstname}
                  onChange={handleChange}
                  required
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '')
                  }}
                />
              </div>
              <div className={footerCSS.divFormNewsletterB}>
                <input
                  className={footerCSS.inputFormNewsletterB}
                  placeholder='E-mail'
                  type="email"
                  id='email'
                  name='email'
                  minLength={8}
                  maxLength={60}
                  pattern={PATTERN.EMAIL}
                  value={abonne.email}
                  onChange={handleChange}
                  required
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                  }}
                />
                <button className={footerCSS.btnEnvoiFormNewsletter}>Je m'abonne</button>
              </div>
              <div className={footerCSS.divCaptcha}>
                <ReCAPTCHA
                  ref={refRecaptcha} // ça pointe directement sur l'élément DOM
                  className='g-recaptcha'
                  sitekey={RECAPTCHA_PUBLIC_KEY}
                  action="newsletter" // Donne un nom à l'action que l'utilisateur est en train de réaliser (dans le cas où on a plusieurs captcha sur un site)
                  onChange={handleRecaptcha}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Bloc droite */}
      <div className={footerCSS.droite}>
        <div><p className={footerCSS.texteH}>PureKréa - Artisan cravatier français - Images libres de droits <br />Site Projet 2024 / 2025</p></div>
        <div className={footerCSS.texteC}>
          <nav>
            <ul>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA} to="/">Boutique</NavLink>
              </li>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA} to="/nous-connaitre">Nous connaître</NavLink>
              </li>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA} to="/rendez-vous">Prendre rendez-vous</NavLink>
              </li>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA} to="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div><ModalePolitique /></div>
      </div>
    </footer>
  )
}
