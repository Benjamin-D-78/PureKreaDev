import { useState } from "react";
import { toast } from "react-toastify";

// CSS
import items from "../Dashboard/css/items.module.css"

// CONSTANTES
import axiosInstance from "../../utils/axiosInstance";
import { URL } from "../../utils/constantes";
import { RGXR, ONINPUT, PATTERN } from "../../utils/regex";
import { ERROR } from "../../utils/error";

const AjoutUtilisateur = () => {

    const [utilisateur, setUtilisateur] = useState({
        // Obligé de demander si les valeurs sont là sinon je suis embêté par l'erreur des input incontrôllés.
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const [error, setError] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        repeatPassword: "",
    })

    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        if (utilisateur.lastname) {
            const lastnameRegexr = RGXR.NOM;
            if (!lastnameRegexr.test(utilisateur.lastname) || utilisateur.lastname.length < 2 || utilisateur.lastname.length > 30) {
                messageError.lastname = ERROR.U_LASTNAME
                isValid = false;
            }
        }

        if (utilisateur.firstname) {
            const firstnameRegexr = RGXR.PRENOM;
            if (!firstnameRegexr.test(utilisateur.firstname) || utilisateur.firstname.length < 2 || utilisateur.firstname.length > 30) {
                messageError.firstname = ERROR.U_FIRSTNAME
                isValid = false;
            }
        }

        if (utilisateur.email) {
            const emailRegexr = RGXR.EMAIL;
            if (!emailRegexr.test(utilisateur.email) || utilisateur.email.length < 8 || utilisateur.email.length > 60) {
                messageError.email = ERROR.U_EMAIL
                isValid = false;
            }
        }

        if (utilisateur.password) {
            const passwordRegexr = RGXR.PASSWORD;
            if (!passwordRegexr.test(utilisateur.password) || utilisateur.password.length < 8 || utilisateur.password.length > 40) {
                messageError.password = ERROR.U_PASSWORD
                isValid = false;
            }
        }

        if (utilisateur.password !== utilisateur.repeatPassword) {
            messageError.repeatPassword = "Les mots de passe ne sont pas identiques."
            isValid = false;
        }

        setError(messageError);
        return isValid;
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setUtilisateur((user) => ({ ...user, [name]: value }))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (utilisateur.lastname === "" || utilisateur.firstname === "" || utilisateur.email === "" || utilisateur.password === "") {
            toast.error("Le formulaire n'est pas complété.");
            return;
        }

        if (!formulaire()) return;

        if (utilisateur.password !== utilisateur.repeatPassword) {
            toast.error("Les mots de passe ne sont pas identiques.", { autoClose: 3000 })
            return;
        }

        if (URL.USER_INSCRIPTION) {
            try {
                const response = await axiosInstance.post(URL.USER_INSCRIPTION, { ...utilisateur, dashboard: true })
                console.log(response)
                if (response.status === 201) {
                    toast.success("Utilisateur ajouté avec succès.", { autoClose: 1000 })
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    console.log("Certains des champs obligatoires sont vides.", error.message)
                    toast.error("Certains des champs obligatoires sont vides.", { autoClose: 3000 })
                }
                if (error.response?.status === 500) {
                    console.log("Echec de l'ajout de l'utilisateur.", error.message)
                    toast.error("Echec de l'ajout de l'utilisateur.", { autoClose: 3000 })
                }
            }
        }
    }


    return (
        <div className={items.conteneurPrincipal}>
            <h1 className={items.h1}>Ajouter un utilisateur</h1>
            <div className={items.div1}>
                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="firstname">Prénom * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='firstname'
                        id='firstname'
                        autocomplete="off"
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={2}
                        maxLength={30}
                        pattern={PATTERN.PRENOM}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.U_PRENOM, '')
                        }}
                    />
                    {error.firstname && <span className={items.spanError}>{error.firstname}</span>}

                    <label htmlFor="lastname">Nom * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='lastname'
                        id='lastname'
                        autocomplete="off"
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={2}
                        maxLength={30}
                        pattern={PATTERN.NOM}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.U_NOM, '').toUpperCase();
                        }}
                    />
                    {error.lastname && <span className={items.spanError}>{error.lastname}</span>}

                    <label htmlFor="email">E-mail * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='email'
                        id='email'
                        autocomplete="off"
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={8}
                        maxLength={60}
                        pattern={PATTERN.EMAIL}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.U_EMAIL, '').toLowerCase();
                        }} />
                    {error.email && <span className={items.spanError}>{error.email}</span>}

                    <label htmlFor="password">Mot de passe * :</label>
                    <input
                        className={items.inputItem}
                        type="password"
                        name='password'
                        id='password'
                        autocomplete="off"
                        onChange={handleChange}
                        minLength={8}
                        maxLength={40}
                        pattern={PATTERN.PASSWORD}
                        onBlur={formulaire}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
                        }} />
                    {error.password && <span className={items.spanError}>{error.password}</span>}

                    <label htmlFor="repeatPassword">Répétez * :</label>
                    <input
                        className={items.inputItem}
                        type="password"
                        name='repeatPassword'
                        id='repeatPassword'
                        autocomplete="off"
                        onChange={handleChange}
                        minLength={8}
                        maxLength={40}
                        pattern={PATTERN.PASSWORD}
                        onBlur={formulaire}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
                        }} />
                    {error.repeatPassword && <span className={items.spanError}>{error.repeatPassword}</span>}


                    <div className={items.divBtnAjouter}>
                        <button className={items.boutonItem}>Ajouter</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AjoutUtilisateur