import Stripe from "stripe"
import { env } from "../config/index.js";

const stripe = new Stripe(env.STRIPE_SECRET_TEST);

export const paiementStripe = async (req, res) => {
    let {montant, id} = req.body; // L'ID est notre objet token
    try {
        // "paymentIntents" appelle l'API de stripe pour créer une intention de paiement, donc un paiement en cours de traitement. On gère comme ça le paiement de manière suivie et sécurisée. stripe prend tout en compte.
        const paiement = await stripe.paymentIntents.create({
            amount: montant,
            currency: "EUR",
            description: "Paiement réceptionné.",
            payment_method: id,
            confirm: true,
            return_url: "http://localhost:8000"
        })
        res.status(201).json({
            Message: "Paiement réalisé avec succès.", 
            success: true,
            clientSecret: paiement.client_secret}) // "client_secret" est une clé qui permet de finaliser le paiement côté client, après qu'il a été créé. Cette clé est envoyée au front, où elle est utilisée pour finaliser le paiement en appelant l'API Stripe côté client. (c'est une sécurité).
        
    } catch (error) {
        console.log("Erreur lors de la tentative de paiement", error)
        res.status(500).json({Message: "Echèc lors de la tentative de paiement, veuillez nous contacter.", success: false})
    }
} 