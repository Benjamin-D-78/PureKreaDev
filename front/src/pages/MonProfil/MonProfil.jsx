import { useContext } from 'react'
import { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { toast } from 'react-toastify';

// EXTERNALISATION
import { URL } from '../../utils/constantes.js';
import { RGXR, ONINPUT, PATTERN } from '../../utils/regex.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { ERROR } from '../../utils/error.js';

// ICONES
import voir from "../../images/Icones/voir.png"

// CONTEXT
import { AuthContext } from '../../context/AuthContext.jsx';

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import PanierTotal from "../../components/PanierSynthèse/visuelPanier.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";
import ModalSuppression from '../../components/ModalSuppression/ModalSuppression.jsx';

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "../Commande/commande.module.css"
import mesCommandes from "../MesCommandes/mesCommandes.module.css"
import monProfil from "./monprofil.module.css"

const MonProfil = () => {

    const { id } = useParams();
    const { auth, setAuth } = useContext(AuthContext);
    const [mdpTape, setMdpTape] = useState(false)

    const [voirA, setVoirA] = useState(false)
    const [voirB, setVoirB] = useState(false)
    const [voirC, setVoirC] = useState(false)

    const voirMDPA = () => {
        setVoirA(!voirA)
    }
    const voirMDPB = () => {
        setVoirB(!voirB)
    }
    const voirMDPC = () => {
        setVoirC(!voirC)
    }


    const [ancienMDP, setAncienMDP] = useState("");
    const [newMDP, setNewMDP] = useState("");
    const [repeteMDP, setRepeteMDP] = useState("");

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

    useEffect(() => {
        const userById = async () => {
            if (URL.USER_BY_ID) {
                try {
                    const response = await axiosInstance.get(`${URL.USER_BY_ID}/${id}`, { withCredentials: true })
                        setUtilisateur(response.data);                        
                } catch (error) {
                    console.error("Erreur lors de la recherche de l'utilisateur", error.message)
                }
            }
        }
        userById();
    }, [id])


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

        const passwordRegexr = RGXR.PASSWORD;
        if (newMDP && !passwordRegexr.test(newMDP)) {
            messageError.newMDP = ERROR.U_PASSWORD
            isValid = false;
        }

        if (utilisateur.phone) {
            const phoneRegexr = RGXR.PHONE;
            if (!phoneRegexr.test(utilisateur.phone) || utilisateur.phone.length < 10 || utilisateur.phone.length > 10) {
                messageError.phone = ERROR.U_PHONE
                isValid = false;
            }
        }

        if (utilisateur.adress) {
            const adressRegexr = RGXR.ADRESS;
            if (!adressRegexr.test(utilisateur.adress) || utilisateur.adress.length < 8 || utilisateur.adress.length > 70) {
                messageError.adress = ERROR.U_ADRESS
                isValid = false;
            }
        }

        if (utilisateur.postal) {
            const postalRegexr = RGXR.POSTAL;
            if (!postalRegexr.test(utilisateur.postal) || utilisateur.postal.length < 5 || utilisateur.postal.length > 5) {
                messageError.postal = ERROR.U_POSTAL
                isValid = false;
            }
        }

        if (utilisateur.town) {
            const townRegexr = RGXR.TOWN;
            if (!townRegexr.test(utilisateur.town) || utilisateur.town.length < 2 || utilisateur.town.length > 50) {
                messageError.town = ERROR.U_TOWN
                isValid = false;
            }
        }

        setError(messageError);
        return isValid;
    }

    // Permet de mettre à jour les valeurs dans le state "utilisateur"
    const handleChange = (event) => {
        const { name, value } = event.target
        setUtilisateur(prev => ({ ...prev, [name]: value })) // "..." fait une copie de l'état précédent.

        if (name === "newMDP" && value.length > 0) {
            setMdpTape(true)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formulaire()) return;

        if (utilisateur.lastname === "" || utilisateur.firstname === "" || utilisateur.email === "" || utilisateur.newMDP === "" || utilisateur.phone === "" || utilisateur.adress === "" || utilisateur.postal === "" || utilisateur.town === "") {
            toast.error("Veuillez modifier au moins un champ pour modifier votre profil.");
            return;
        }

        // On crée un objet. On va ici distinguer le MDP des autres champs car changer de MDP doit être une possibilité et non une obligation.
        const updateUser = {};

        // On véritife et ajoute le MDP uniquement s'il a été changé
        if (newMDP && newMDP !== "") {
            // Si un nouveau MDP est renseigné on doit aussi donner l'ancien MDP
            if (!ancienMDP || ancienMDP === "") {
                toast.error("Le mot de passe actuel est requis pour changer de mot de passe.");
                return;
            }

            if (newMDP && newMDP !== repeteMDP) {
                toast.error("Les mots de passe ne correspondent pas.");
                return;
            }

            // On ajoute le MDP modifié à l'objet de mise à jour
            updateUser.password = newMDP; // Nouveau MDP
            updateUser.ancienMDP = ancienMDP; // Ancien MDP pour validation
        }

        // On ajoute les autres champs non liés au MDP uniquement s'ils ont été renseignés, sinon les champs ne seront pas envoyés dans la requête.
        if (utilisateur.lastname !== "") updateUser.lastname = utilisateur.lastname
        if (utilisateur.firstname !== "") updateUser.firstname = utilisateur.firstname
        if (utilisateur.email !== "") updateUser.email = utilisateur.email
        if (utilisateur.phone !== "") updateUser.phone = utilisateur.phone
        if (utilisateur.adress !== "") updateUser.adress = utilisateur.adress
        if (utilisateur.postal !== "") updateUser.postal = utilisateur.postal
        if (utilisateur.town !== "") updateUser.town = utilisateur.town

        // console.log(updateUser)

        if (URL.USER_UPDATE) {
            try {
                const response = await axiosInstance.put(`${URL.USER_UPDATE}/${id}`, updateUser, { withCredentials: true }
                );
                // console.log(response)
                if (response.status === 200) {
                    toast.success("Profil mis à jour avec succès.", { autoClose: 3000 });
                    const updateAuth = { ...auth, } //On incorpore les nouvelles données dans le auth, sinon ça écrase le auth déjà existant et le remet à zéro.
                    setAuth(updateAuth);
                    localStorage.setItem("auth", JSON.stringify(updateAuth)); // on met à jour le localStorage en convertissant l'objet updateAuth en chaîne de caractères.

                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour des informations.", error);
                toast.error("Une erreur s'est produite lors de la mise à jour des informations. Veuillez nous contacter.", { autoClose: 3000 });
            }
        } else {
            toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })
        }
    };


    return (
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Mon profil</h1>


            <div className={commande.conteneurGlobal}>
                <div className={commande.conteneurG}>
                    <PanierTotal />
                    <PrenezRendezVous />
                    <Accordeon />
                </div>
                <div>
                    <div className={commande.blocEntete1}>
                        <div className={commande.entete1}>
                            <p className={commande.pName}>Récapitulatif</p>
                        </div>
                    </div>
                    <div className={mesCommandes.conteneurD}>
                        <div className={mesCommandes.conteneurGeneralRecap}>

                            <form onSubmit={handleSubmit} noValidate>
                                <p className={monProfil.nomEntete}>Connexion & sécurité</p>
                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Nom : </label>
                                        <label htmlFor="newlastname">Nouveau nom : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.lastname ? (<span className={monProfil.pUtilisateur}>{utilisateur.lastname}</span>) : <span>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='lastname'
                                            id='newlastname'
                                            autocomplete="family-name"
                                            onChange={handleChange}
                                            onBlur={formulaire}
                                            minLength={2}
                                            maxLength={30}
                                            pattern={PATTERN.NOM}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_NOM, '').toUpperCase();
                                            }}
                                        />
                                        {error.lastname && <span className={monProfil.spanError}>{error.lastname}</span>}
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Prénom : </label>
                                        <label htmlFor="newfirstname">Nouveau prénom : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.firstname ? (<span className={monProfil.pUtilisateur}>{utilisateur.firstname}</span>) : <span>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='firstname'
                                            id='newfirstname'
                                            autocomplete="given-name"
                                            onChange={handleChange}
                                            onBlur={formulaire}
                                            minLength={2}
                                            maxLength={30}
                                            pattern={PATTERN.PRENOM}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_PRENOM, '')
                                            }}
                                        />
                                        {error.firstname && <span className={monProfil.spanError}>{error.firstname}</span>}
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Email : </label>
                                        <label htmlFor="email">Nouveau mail : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.email ? (<span className={monProfil.pUtilisateur}>{utilisateur.email}</span>) : <span>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='email'
                                            id='emailProfil'
                                            autocomplete="email"
                                            onChange={handleChange}
                                            onBlur={formulaire}
                                            minLength={8}
                                            maxLength={60}
                                            pattern={PATTERN.EMAIL}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_EMAIL, '').toLowerCase();
                                            }} />
                                        {error.email && <span className={monProfil.spanError}>{error.email}</span>}
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonneesMDP}>
                                    <div className={monProfil.labelsProfil}>
                                        <label className={monProfil.labelsSepare} htmlFor="ancienMDP">Mot de passe actuel : </label>
                                        <label className={monProfil.labelsSepare} htmlFor="newMDP">Nouveau mot de passe : </label>
                                        <label htmlFor="repeteMDP">Répétez le mot de passe : </label>
                                    </div>
                                    <div className={monProfil.contientInputImg}>
                                        <div className={monProfil.inputsMDP}>
                                            <input
                                                className={monProfil.inputsSepare}
                                                type={voirA ? "text" : "password"}
                                                name='ancienMDP'
                                                id='ancienMDP'
                                                autocomplete="current-password"
                                                value={ancienMDP}
                                                minLength={8}
                                                maxLength={40}
                                                pattern={PATTERN.PASSWORD}
                                                onChange={(event) => setAncienMDP(event.target.value)}
                                                onBlur={formulaire}
                                                onInput={(event) => {
                                                    event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
                                                }} />
                                            <input
                                                className={monProfil.inputsSepare}
                                                type={voirB ? "text" : "password"}
                                                name='newMDP'
                                                id='newMDP'
                                                autocomplete="new-password"
                                                value={newMDP}
                                                minLength={8}
                                                maxLength={40}
                                                pattern={PATTERN.PASSWORD}
                                                onChange={(event) => setNewMDP(event.target.value)}
                                                onBlur={formulaire}
                                                onInput={(event) => {
                                                    event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
                                                }} />
                                            <input
                                                type={voirC ? "text" : "password"}
                                                name='repeteMDP'
                                                id='repeteMDP'
                                                autocomplete="new-password"
                                                value={repeteMDP}
                                                minLength={8}
                                                maxLength={40}
                                                pattern={PATTERN.PASSWORD}
                                                onChange={(event) => setRepeteMDP(event.target.value)}
                                                onBlur={formulaire}
                                                onInput={(event) => {
                                                    event.target.value = event.target.value.replace(ONINPUT.U_PASSWORD, '');
                                                }} />
                                            {error.newMDP && <span className={monProfil.spanError}>{error.newMDP}</span>}
                                        </div>
                                        <div>
                                            <div className={monProfil.contientVoir}>
                                                <img onClick={voirMDPA} className={monProfil.voir} src={voir} alt="Voir le mot de passe" />
                                            </div>
                                            <div className={monProfil.contientVoir}>
                                                <img onClick={voirMDPB} className={monProfil.voir} src={voir} alt="Voir le mot de passe" />
                                            </div>
                                            <div className={monProfil.contientVoir}>
                                                <img onClick={voirMDPC} className={monProfil.voir} src={voir} alt="Voir le mot de passe" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label htmlFor="phone">Téléphone : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        <input
                                            type="text"
                                            name='phone'
                                            id='phone'
                                            autocomplete="tel"
                                            onChange={handleChange}
                                            onBlur={formulaire}
                                            value={utilisateur?.phone || ""}
                                            // max={9999999999}
                                            minLength={10}
                                            maxLength={10}
                                            pattern={PATTERN.PHONE}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_PHONE, '')
                                            }} 
                                            />
                                        {error.phone && <span className={monProfil.spanError}>{error.phone}</span>}
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <p className={monProfil.nomEntete}>Adresse</p>

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label className={monProfil.labelsSepare} htmlFor="adress">Adresse : </label>
                                        <label className={monProfil.labelsSepare} htmlFor="postal">Code postal : </label>
                                        <label htmlFor="town">Ville : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        <input
                                            className={monProfil.inputsSepare}
                                            type="text"
                                            name='adress'
                                            id='adress'
                                            autocomplete="address-line1"
                                            value={utilisateur?.adress || ""}
                                            minLength={8}
                                            maxLength={70}
                                            pattern={PATTERN.ADRESS}
                                            onChange={handleChange}
                                            onBlur={formulaire}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_ADRESS, '');
                                            }} />

                                        <input
                                            className={monProfil.inputsSepare}
                                            type="text"
                                            name='postal'
                                            id='postal'
                                            autocomplete="postal-code"
                                            value={utilisateur?.postal || ""}
                                            // max={99999}
                                            minLength={5}
                                            maxLength={5}
                                            onChange={handleChange}
                                            onBlur={formulaire}
                                            pattern={PATTERN.POSTAL}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_POSTAL, '')
                                            }} 
                                            />

                                        <input
                                            type="text"
                                            name='town'
                                            id='town'
                                            autocomplete="address-level2"
                                            value={utilisateur?.town || ""}
                                            minLength={2}
                                            maxLength={50}
                                            onChange={handleChange}
                                            onBlur={formulaire}
                                            pattern={PATTERN.TOWN}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(ONINPUT.U_TOWN, '').toUpperCase();;
                                            }} />
                                        {error.adress && <span className={monProfil.spanError}>{error.adress}</span>}
                                        {error.postal && <span className={monProfil.spanError}>{error.postal}</span>}
                                        {error.town && <span className={monProfil.spanError}>{error.town}</span>}
                                    </div>
                                </div>
                                <div className={monProfil.contientBtn}>
                                    <button className={monProfil.btnEnvoi}>Enregistrer les modifications</button>
                                </div>
                            </form>
                            <ModalSuppression />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default MonProfil