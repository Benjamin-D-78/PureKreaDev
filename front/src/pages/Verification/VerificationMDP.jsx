import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import coin from "../Utilisateurs/coin.module.css"
import notfound from "../NotFound/notfound.module.css"
import voir from "../../images/Icones/voir.svg"
import { toast } from 'react-toastify';

// CENTRALISATION
import axiosInstance from '../../utils/axiosInstance';
import { URL } from '../../utils/constantes'
import { RGXR, ONINPUT, PATTERN } from '../../utils/regex'
import { ERROR } from '../../utils/error'

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const VerificationMDP = () => {

    const [loading, setLoading] = useState(true);
    const [tokenValide, setTokenValide] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate()

    const [voirA, setVoirA] = useState(false)
    const [voirB, setVoirB] = useState(false)
    const [mdpTape, setMdpTape] = useState(false)

    const [user, setUser] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    })

    const [error, setError] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    })



    useEffect(() => {
        const testToken = async () => {
            if (URL.USER_PASSWORD) {
                try {
                    const response = await axiosInstance.get(`${URL.USER_PASSWORD}/${token}`)
                    console.log(response.data)
                    if (response.status === 200) {
                        setTokenValide(true)
                        setLoading(false)
                    }
                } catch (error) {
                    setTokenValide(false)
                    setLoading(false)
                }
            }
        };
        testToken();
    }, [token])


    const formulaire = () => {
        const messageError = {};
        let isValid = true;

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.email || !user.password) {
            toast.error("Veuillez remplir tous les champs", { autoClose: 3000 })
            return;
        }

        if (!formulaire()) return;

        if (user.password !== user.repeatPassword) {
            toast.error("Les mots de passe ne sont pas identiques.", { autoClose: 3000 })
            return;
        }

        try {
            const response = await axiosInstance.post(`${URL.USER_MODIFICATION_PASSWORD}/${token}`, user)
            console.log(response.data)
            if (response.status === 200) {
                navigate("/connexion")
                toast.success("Mot de passe modifié avec succès.")
            }
        } catch (error) {
            toast.error("Echec de la modification du mot de passe.")
        }
    }


    if (loading) {
        return <p className='text-center'>Vérification du token...</p>;
    }

    return (
        <div>
            {tokenValide && <NavBar />}

            {tokenValide ? (

                <div className={coin.divContainerIn}>
                    <div className={coin.boxIn1}>
                        <div className={coin.formIn}>
                            <h1 className={coin.titreCoIn}>Modifiez votre mot de passe</h1>
                            <form onSubmit={handleSubmit} noValidate>

                                <label className={coin.labelCoIn} htmlFor="email-inscription">E-mail : <span className={coin.spanInscription}>*</span></label>
                                <input
                                    className={coin.inputCoIn}
                                    type="text"
                                    name='email'
                                    id='email-inscription'
                                    onChange={handleChange}
                                    onBlur={formulaire}
                                    minLength={8}
                                    maxLength={60}
                                    pattern={PATTERN.EMAIL}
                                    onInput={(event) => {
                                        event.target.value = event.target.value.replace(ONINPUT.U_EMAIL, '').toLowerCase();
                                    }} />
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
                                <div className={coin.contientSubmit}>
                                    <button className={coin.submitCoIn}>Envoyer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            ) : (

                <div className={notfound.contientNotFound}>
                    <div className={notfound.divNotFound}>
                        <p>Token expiré</p>
                        <div className={notfound.contientBtnRevenir}>
                            <Link to="/reinitialisation"><button className={notfound.btnRevenir}>Nouveau token</button></Link>
                        </div>
                    </div>
                </div>

            )
            }
            {tokenValide && <Footer />}
        </div>
    )
}

export default VerificationMDP