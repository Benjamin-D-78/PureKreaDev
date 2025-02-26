import { React, useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { toast } from 'react-toastify'
import coin from "./coin.module.css"
import { RGXR, PATTERN } from '../../utils/Regixr'

// ICONES
import voir from "../../images/Icones/voir.svg"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'


const Connexion = () => {

  const [user, setUser] = useState({});
  const { dataFormConnexion } = useContext(AuthContext);
  const [voirA, setVoirA] = useState(false)
  const [error, setError] = useState({
    email: "",
    password: "",
  })



  const formulaire = () => {
    const messageError = {};
    let isValid = true;

    if (user.email) {
      const emailRegexr = RGXR.EMAIL;
      if (!emailRegexr.test(user.email) || user.email.length < 8 || user.email.length > 60) {
        messageError.email = "Format email, entre 10 et 60 caractères attendus."
        isValid = false;
      }
    }

    if (user.password) {
      const passwordRegexr = RGXR.PASSWORD;
      if (!passwordRegexr.test(user.password) || user.password.length < 8 || user.password.length > 40) {
        messageError.password = "Entre 8 et 40 caractères, (au moins une minuscule, une majusculte, un chiffre et un caractère spécial)."
        isValid = false;
      }
    }

    setError(messageError);
    return isValid;
  }



  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    if (!user.email || !user.password) {
      toast.error("Veuillez remplir tous les champs", { autoClose: 3000 })
      return;
    }
    
    if (!formulaire()) return;

    dataFormConnexion(user) // On appelle Context
  }

  return (
    <>
      <NavBar />
      <div className={coin.divContainerIn}>
        <div className={coin.boxIn1}>
          <div className={coin.formIn}>
            <h1 className={coin.titreCoIn}>Connexion</h1>
            <form onSubmit={handleSubmit} noValidate>
              <label className={coin.labelCoIn} htmlFor="email-connexion">E-mail <span className={coin.spanInscription}>*</span></label>
              <input
                type="email"
                name='email'
                id='email-connexion'
                className={coin.inputCoIn}
                onChange={handleChange}
                minLength={10}
                maxLength={60}
                pattern={PATTERN.EMAIL}
                onInput={(event) => {
                  event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                }} />
              {error.email && <span className={coin.spanError}>{error.email}</span>}

              <br />
              <label className={coin.labelCoIn} htmlFor="password-connexion">Mot de passe <span className={coin.spanInscription}>*</span></label>
              <div className={coin.contientInputImg}>
                <div className={coin.inputsMDP}>
                  <input
                    type={voirA ? "text" : "password"}
                    name='password'
                    id='password-connexion'
                    className={coin.inputCoIn}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={40}
                    pattern={PATTERN.PASSWORD}
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                    }} />
                  {error.password && <span className={coin.spanError}>{error.password}</span>}

                </div>
                <div className={coin.contientVoir}>
                  <img onClick={() => setVoirA(!voirA)} className={coin.voir} src={voir} alt="Icone pour voir le mot de passe indiqué" />
                </div>
              </div>
              <div className={coin.contientSubmit}>
                <button className={coin.submitCoIn}>Me connecter</button>
                <Link className={coin.inscription} to="/inscription"> <button className={coin.alternatif}>Pas encore inscrit ?</button></Link>
              </div>
              <Link className={coin.linkValidation} to="/renvoi"><p className={coin.validation}>Je veux recevoir un nouveau mail de validation</p></Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Connexion