import { React, useState, useEffect } from 'react'
import { Link, NavLink } from "react-router-dom"
import footerCSS from "./footer.module.css"
import axios from "axios"
import { URL } from '../../utils/Constantes'
import { toast } from 'react-toastify'
import { PATTERN, RGXR } from '../../utils/Regixr'
import ModalePolitique from '../ModalPolitique/ModalePolitique'

// ICONES
import linkedin from "../../images/Reseaux/linkedin.png"
import github from "../../images/Reseaux/github.png"



export default function Footer() {

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!abonne.firstname || !abonne.lastname || !abonne.email) {
      toast.error("Certains des champs obligatoires sont vides.")
      return;
    }

    if (!formulaire()) return;

    if (URL.ABONNE_CREATION) {
      try {
        const response = await axios.post(URL.ABONNE_CREATION, abonne)
        console.log(response)
        if (response.status === 201) {
          toast.success("Merci de vous être abonné !", { autoClose: 3000 })
          setAbonne({
            firstname: "",
            lastname: "",
            email: ""
          })
        }
      } catch (error) {
        console.error("Echec de la tentative d'abonnement : ", error.message)
        toast.error("Echec de la tentative d'abonnement.", { autoClose: 3000 })
      }
    } else {
      toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })
    }
  }


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
            </form>
          </div>
        </div>
      </div>
      {/* Bloc droite */}
      <div className={footerCSS.droite}>
        <div><p className={footerCSS.texteH}>PureKréa - Artisan cravatier français - Images libres de droits <br />Site Projet 2024</p></div>
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
