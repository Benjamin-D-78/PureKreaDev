import { React, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

// CSS
import items from "../Dashboard/css/items.module.css"

// CONSTANTES
import { URL } from "../../utils/Constantes";
import { RGXR, PATTERN } from "../../utils/Regixr";

const AjoutUtilisateur = () => {

    const [utilisateur, setUtilisateur] = useState({
        // Obligé de demander si les valeurs sont là sinon je suis embêté par l'erreur des input incontrôllés.
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        phone: "",
        adress: "",
        postal: "",
        town: ""
    });

    const [error, setError] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        phone: "",
        adress: "",
        postal: "",
        town: ""
    })

    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        if (utilisateur.lastname) {
            const lastnameRegexr = RGXR.NOM;
            if (!lastnameRegexr.test(utilisateur.lastname) || utilisateur.lastname.length < 2 || utilisateur.lastname.length > 30) {
                messageError.lastname = "Entre 2 et 30 caractères attendus."
                isValid = false;
            }
        }

        if (utilisateur.firstname) {
            const firstnameRegexr = RGXR.PRENOM;
            if (!firstnameRegexr.test(utilisateur.firstname) || utilisateur.firstname.length < 2 || utilisateur.firstname.length > 30) {
                messageError.firstname = "Entre 2 et 30 caractères attendus."
                isValid = false;
            }
        }

        if (utilisateur.email) {
            const emailRegexr = RGXR.EMAIL;
            if (!emailRegexr.test(utilisateur.email) || utilisateur.email.length < 8 || utilisateur.email.length > 60) {
                messageError.email = "Entre 8 et 60 caractères attendus."
                isValid = false;
            }
        }

        const passwordRegexr = RGXR.PASSWORD;
        if (utilisateur.password && !passwordRegexr.test(utilisateur.password)) {
            messageError.password = "Entre 8 et 40 caractères, (au moins une minuscule, une majuscule, un chiffre et un caractère spécial)."
            isValid = false;
        }

        if (utilisateur.phone) {
            const phoneRegexr = RGXR.PHONE;
            if (!phoneRegexr.test(utilisateur.phone) || utilisateur.phone.length < 10 || utilisateur.phone.length > 10) {
                messageError.phone = "10 chiffres attendus."
                isValid = false;
            }
        }

        if (utilisateur.adress) {
            const adressRegexr = RGXR.ADRESS;
            if (!adressRegexr.test(utilisateur.adress) || utilisateur.adress.length < 8 || utilisateur.adress.length > 70) {
                messageError.adress = "Adresse : Entre 8 et 70 caractères attendus."
                isValid = false;
            }
        }

        if (utilisateur.postal) {
            const postalRegexr = RGXR.POSTAL;
            if (!postalRegexr.test(utilisateur.postal) || utilisateur.postal.length < 5 || utilisateur.postal.length > 5) {
                messageError.postal = " Code postal : 5 chiffres attendus."
                isValid = false;
            }
        }

        if (utilisateur.town) {
            const townRegexr = RGXR.TOWN;
            if (!townRegexr.test(utilisateur.town) || utilisateur.town.length < 2 || utilisateur.town.length > 50) {
                messageError.town = "Ville : Entre 2 et 50 caractères attendus."
                isValid = false;
            }
        }

        setError(messageError);
        return isValid;
    }


    const checkInput = (event) => {
        const { name } = event.target;
        formulaire()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setUtilisateur((user) => ({ ...user, [name]: value }))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (utilisateur.lastname === "" || utilisateur.firstname === "" || utilisateur.email === "" || utilisateur.password === "" || utilisateur.phone === "" || utilisateur.adress === "" || utilisateur.postal === "" || utilisateur.town === "") {
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
                const response = await axios.post(URL.USER_INSCRIPTION, utilisateur)
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
                        onChange={handleChange}
                        onBlur={checkInput}
                        minLength={2}
                        maxLength={30}
                        pattern={PATTERN.PRENOM}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '')
                        }}
                    />
                    {error.firstname && <span className={items.spanError}>{error.firstname}</span>}

                    <label htmlFor="lastname">Nom * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='lastname'
                        id='lastname'
                        onChange={handleChange}
                        onBlur={checkInput}
                        minLength={2}
                        maxLength={30}
                        pattern={PATTERN.NOM}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '').toUpperCase();
                        }}
                    />
                    {error.lastname && <span className={items.spanError}>{error.lastname}</span>}

                    <label htmlFor="email">E-mail * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='email'
                        id='email'
                        onChange={handleChange}
                        onBlur={checkInput}
                        minLength={8}
                        maxLength={60}
                        pattern={PATTERN.EMAIL}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                        }} />
                    {error.email && <span className={items.spanError}>{error.email}</span>}

                    <label htmlFor="phone">Téléphone : </label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='phone'
                        id='phone'
                        onChange={handleChange}
                        onBlur={checkInput}
                        minLength={10}
                        maxLength={10}
                        pattern={PATTERN.PHONE}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/\D/g, '')
                        }} />
                    {error.phone && <span className={items.spanError}>{error.phone}</span>}

                    <label htmlFor="adress">Adresse : </label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='adress'
                        id='adress'
                        onChange={handleChange}
                        onBlur={checkInput}
                        minLength={8}
                        maxLength={70}
                        pattern={PATTERN.ADRESS}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s\-'^¨èéàù]/g, '');
                        }} />
                    {error.adress && <span className={items.spanError}>{error.adress}</span>}

                    <label htmlFor="postal">Code postal : </label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='postal'
                        id='postal'
                        onChange={handleChange}
                        onBlur={checkInput}
                        minLength={5}
                        maxLength={5}
                        pattern={PATTERN.POSTAL}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/\D/g, '')
                        }} />
                    {error.postal && <span className={items.spanError}>{error.postal}</span>}

                    <label htmlFor="town">Ville : </label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='town'
                        id='town'
                        onChange={handleChange}
                        onBlur={checkInput}
                        minLength={2}
                        maxLength={50}
                        pattern={PATTERN.TOWN}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/[^a-zA-Z\s\-'^¨èéàù]/g, '').toUpperCase();;
                        }} />
                    {error.town && <span className={items.spanError}>{error.town}</span>}

                    <label htmlFor="password">Mot de passe * :</label>
                    <input
                        className={items.inputItem}
                        type="password"
                        name='password'
                        id='password'
                        onChange={handleChange}
                        minLength={8}
                        maxLength={40}
                        pattern={PATTERN.PASSWORD}
                        onBlur={checkInput}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                        }} />
                    {error.password && <span className={items.spanError}>{error.password}</span>}

                    <label htmlFor="repeatPassword">Répétez * :</label>
                    <input
                        className={items.inputItem}
                        type="password"
                        name='repeatPassword'
                        id='repeatPassword'
                        onChange={handleChange}
                        minLength={8}
                        maxLength={40}
                        pattern={PATTERN.PASSWORD}
                        onBlur={checkInput}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                        }} />

                    <div className={items.divBtnAjouter}>
                        <button className={items.boutonItem}>Ajouter</button>
                    </div>
                </form>
            </div >
        </div >
    )


}

export default AjoutUtilisateur