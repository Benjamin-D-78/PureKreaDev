import { React, useContext, useState, useEffect } from 'react'
import axios from "axios"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { URL } from '../utils/Constantes'

// CONTEXT
import { PanierContext } from '../context/PanierContext'
import { AuthContext } from '../context/AuthContext'

const TestFormulaire = () => {

    const stripe = useStripe();
    const [paiementValide, setPaiementValide] = useState(false)
    const elements = useElements();
    const { prixTotal, panier, validerCommande } = useContext(PanierContext);
    const { auth } = useContext(AuthContext)
    const [utilisateur, setUtilisateur] = useState({
        firstname: "",
        lastname: "",
        adress: "",
        postal: "",
        town: "",
        phone: ""
    });

    const carteCompletee = (event) => {
        // On vérifie si le champ est complet ou la carte valide.
        if (event.complete) {
            setPaiementValide(true)
        } else {
            setPaiementValide(false)
        }
    }

    useEffect(() => {
        if (auth) {
            const userById = async () => {
                try {
                    const response = await axios.get(`${URL.USER_BY_ID}/${auth._id}`);
                    setUtilisateur(response.data)
                } catch (error) {
                    console.error("Erreur lors de la recherche d'utilisateur", error)
                }
            };
            userById();
        }
    }, [auth])

    const handleSubmit = async (event) => {
        event.preventDefault();

        // on créé ici une méthode de paiement
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement), // On récupère cette méthode de paiement avec le getElement
        });
        if (!error) {
            console.log("Token généré : ", paymentMethod) // On génère grâce à paymentMethod un paiement qui sera en fait un Token. Ce token sera à envoyer au backend pour réaliser le paiement.
            // on envoie le token au back
            try {
                const { id } = paymentMethod;
                const response = await axios.post(URL.CHARGEMENT, {
                    montant: prixTotal * 100,
                    id: id
                })
                if (response.data.success) {
                    toast.success("Paiement réalisé avec succès.", { autoClose: 2000 })
                }
            } catch (error) {
                toast.error("Votre paiement a échoué")
                console.log("Erreur : ", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <div className='w-[100%]'>
            <div className='w-[80%] ms-auto me-auto mt-5 p-4 bg-[#193E61] rounded-xl sm:w-[60%] md:w-[50%]'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-white text-center text-[2rem] mt-4 mb-5 font-marko'>{auth ? `${utilisateur.firstname} ${utilisateur.lastname}` : ""}</h1>
                    <p className='text-white text-[1.4rem] font-marko mb-5'>Votre adresse de livraison :</p>
                    <p className='text-white text-[1.2rem] text-center'>{auth ? `${utilisateur.adress}` : ""}</p>
                    <p className='text-white text-[1.2rem] text-center'>{auth ? `${utilisateur.postal}` : ""}</p>
                    <p className='text-white text-[1.2rem] text-center'>{auth ? `${utilisateur.town}` : ""}</p>

                    <p className='text-white text-[1.4rem] font-marko my-5'>Sommes à payer :</p>
                    {panier.length > 0 ? <p className='rounded-md max-w-[30rem] mx-auto font-bold text-[#C6E60F]'>{prixTotal} € TTC</p> : ""}
                    <CardElement
                        options={{ hidePostalCode: true }}
                        onChange={carteCompletee}
                        className='bg-white rounded-md max-w-[30rem] mx-auto' />
                    <div className='flex justify-center align-items-center flex-column'>
                        <button
                            disabled={!paiementValide}
                            onClick={validerCommande}
                            className='bg-[#C6E60F] mb-[1rem] w-[12rem] h-[2.5rem] font-marko text-[1.4rem] rounded-xl mt-[4rem]'>Payer
                        </button>
                        <Link className='border-1 border-[#C6E60F]  text-white rounded-md font-marko rounded-xl mb-[2rem]' to={{ pathname: "/" }}><button className='w-[12rem] h-[2.5rem] font-marko text-[1.4rem]'>Abandonner</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TestFormulaire