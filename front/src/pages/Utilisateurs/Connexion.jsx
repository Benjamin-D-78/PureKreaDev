import { useState, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import coin from "./coin.module.css"
import { RGXR, ONINPUT, PATTERN } from '../../utils/regex'
import { ERROR } from '../../utils/error'

// ICONES
import voir from "../../images/Icones/voir.svg"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'


const Connexion = () => {

  const { dataFormConnexion } = useContext(AuthContext);
  const [voirA, setVoirA] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  })



  const formulaire = (champ) => {
    const messageError = { ...error };
    let isValid = true;

    if (champ === "email") {
      if (user.email) {
        const emailRegexr = RGXR.EMAIL;
        if (!emailRegexr.test(user.email) || user.email.length < 8 || user.email.length > 60) {
          messageError.email = ERROR.U_EMAIL
          isValid = false;
        }
      }
    }

    if (champ === "password") {
      if (user.password) {
        const passwordRegexr = RGXR.PASSWORD;
        if (!passwordRegexr.test(user.password) || user.password.length < 8 || user.password.length > 40) {
          messageError.password = ERROR.U_PASSWORD
          isValid = false;
        }
      }
    }

    if (isValid && champ in messageError) {
      messageError[champ] = ""
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

    let form = true
    for (const champ in user) {
      const isValid = formulaire(champ)
      if (!isValid) form = false
    }

    if (!form) {
      toast.error("Veuillez saisir les champs correctement.", { autoClose: 3000 })
      return;
    }

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
                autocomplete="email"
                className={coin.inputCoIn}
                onChange={handleChange}
                onBlur={() => formulaire("email")}
                minLength={10}
                maxLength={60}
                pattern={PATTERN.EMAIL}
                onInput={(event) => {
                  event.target.value = event.target.value.replace(ONINPUT.U_EMAIL, '').toLowerCase();
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
                    autocomplete="current-password"
                    className={coin.inputCoIn}
                    onChange={handleChange}
                    onBlur={() => formulaire("password")}
                    minLength={8}
                    maxLength={40}
                    pattern={PATTERN.PASSWORD}
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
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
              <Link className={coin.linkValidation} to="/reinitialisation"><p className={coin.validation}>J'ai oublié mon mot de passe</p></Link>
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