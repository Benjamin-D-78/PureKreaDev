import Commande from "../models/commande.model.js";
import { RGXR } from "../utils/regex.js";


export const creationCommande = async (req, res) => {

    const { userId, panier, comment, statut, verification } = req.body;
    try {
        if (req.user.id !== userId && req.user.role !== "admin") {
            return res.status(403).json({ message: "Accès refusé." })
        }

        if (!verification){
            return res.status(400).json({message: "Vous devez acceptez nos CGV pour passer une commande."})
        }

        if (comment) {
            const contentRegexr = RGXR.CONTENT;
            if (!contentRegexr.test(comment) || comment.length < 3 || comment.length > 500) {
                return res.status(400).json({ message: "Entre 3 et 500 caractères attendus." });
            }
        }

        // On calcul le prix total de la commande à partir des prix totaux des articles dans le panier
        const prixTotal = panier.reduce((total, item) => total + item.totalPrice, 0);

        // On créé la commande dans la BDD
        const nouvelleCommande = new Commande({
            userId, //ID de l'utilisateur
            panier, // les articles qu'on a mis dans le panier
            prixTotal, // Le prix total de tous les articles dans le panier
            comment, // Le commentaire éventuel.
            statut,
            verification: true
        });

        const commandeEnregistree = await nouvelleCommande.save(); // On sauvegarde la commande
        res.status(201).json(commandeEnregistree);

    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        res.status(500).json({ message: "Erreur lors de la création de la commande", error });
    }
};


// GET ALL COMMANDES
export const allCommandes = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Accès réservé à l'administrateur." })
        }
        const response = await Commande.find().sort({ date: -1 });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ Message: "Echec de la récupération de toutes les commandes.", error })
    }
}


// COMMANDE BY ID
export const commandeID = async (req, res) => {
    try {
        const response = await Commande.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ Message: "Echec lors de récupération de la commande.", error })
    }
}


// ALL COMMANDES BY ID USER
export const commandeByUser = async (req, res) => {
    try {
        const { id } = req.params
        if (req.user.id !== id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Accès refusé." })
        }
        // On déclare un "objet de filtre" qui nous permet de récupérer uniquement les commandes associées à l'utilisateur concerné.
        const commandes = await Commande.find({ userId: id })
            // On vient peupler la référence qui se trouve dans le champ "panier.itemId" de chaque commande.
            // Par ex, on a chaque commande qui possède un panier (un tableau d'objets) et chaque objet dans ce panier a une référence à un autre document dans une autre collection (ex : une collection de produits).
            // On va donc récupérer les infos complètes de ces produits en utilisant leur identifiant stocké dans itemId.
            .populate("panier.itemId")
            .sort({ date: -1 })

        res.status(200).json(commandes)
    } catch (error) {
        console.error("Erreur lors de la réception des commandes.", error)
        res.status(500).json({ message: "Echec lors de la réception des commandes." })
    }
}


// PUT - UPDATE BY ID
export const upCommande = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Accès réservé à l'administrateur." })
        }
        const response = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ Message: "Commande mise à jour avec succès : ", response })
    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la mise à jour de la commande." })
    }
}


// DELETE
export const deleteCommande = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Accès réservé à l'administrateur." })
        }
        const response = await Commande.findByIdAndDelete(req.params.id)
        res.status(200).json({ Message: "Commande supprimée avec succès.", response })
    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la suppression de la commande.", error })
    }
}