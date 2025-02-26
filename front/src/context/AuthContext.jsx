import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify";
import { URL } from "../utils/Constantes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [auth, setAuth] = useState(null); // On stocke les infos de l'utilisateur connecté
    const navigate = useNavigate();

    useEffect(() => { connexion() }, [])

    const dataFormConnexion = async (dataForm) => {
        setIsLoading(true);
        if (URL.USER_CONNEXION) {
            try {
                const { data, status } = await axios.post(URL.USER_CONNEXION, dataForm, { withCredentials: true })
                if (status === 200) {
                    localStorage.setItem("auth", JSON.stringify(data));

                    setAuth(data);
                    navigate("/");
                    setIsLoading(false)
                    toast.success("Connexion réussie !", { autoClose: 1000 })
                }
            } catch (error) {
                setIsLoading(false)
                if (error.response && error.response.status === 400) {
                    toast.error("Email ou mot de passe incorrect.", { autoClose: 3000 })
                }
                if (error.response && error.response.status === 403) {
                    toast.error("Vous devez valider votre adresse mail pour pouvoir vous connecter.", { autoClose: 3000 })
                }
                if (error.response && error.response.status === 404) {
                    toast.error("Aucun compte n'est associé à cet email.", { autoClose: 3000 })
                }
                if (error.response && error.response.status === 500) {
                    toast.error("Erreur lors de la tentative de connexion. Veuillez nous contacter", { autoClose: 3000 })
                }
            }
        } else {
            toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })

        }
    }

    const connexion = async () => {
        setIsLoading(true)
        try {
            const authData = localStorage.getItem("auth") // On récupère les données de l'utilisateur depuis le localStorage
            setAuth(authData ? JSON.parse(authData) : null)
            setIsLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    };

    const deconnexion = () => {
        setIsLoading(true)
        setAuth(null) // Réinitialise le state à "null"

        localStorage.removeItem("auth") // Supprime les infos de l'utilisateur du localStorage.
        navigate("/")
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{ dataFormConnexion, auth, setAuth, deconnexion, isLoading }}> {/* On fournit les données au composant enfant. */}
            {children}
        </AuthContext.Provider>
    );
};