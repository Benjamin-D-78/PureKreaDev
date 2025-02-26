import Newsletter from "../models/newsletter.model.js";
import { RGXR } from "../utils/regex.js";

// CREATION NEWSLETTER
export const creationAbonne = async (req, res) => {
    try {
        const firstnameRegexr = RGXR.PRENOM;
        if (!firstnameRegexr.test(req.body.firstname) || req.body.firstname.length < 2 || req.body.firstname.length > 30) {
            return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
        }
        const lastnameRegexr = RGXR.NOM;
        if (!lastnameRegexr.test(req.body.lastname) || req.body.lastname.length < 2 || req.body.lastname.length > 30) {
            return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
        }
        const emailRegexr = RGXR.EMAIL;
        if (!emailRegexr.test(req.body.email) || req.body.email.length < 10 || req.body.email.length > 60) {
            return res.status(400).json({ Message: "Format email, entre 10 et 60 caractères attendus." });
        }

        const response = await Newsletter.create(req.body);
        res.status(201).json({Message: "Abonnement réalisé avec succès."})
    } catch (error) {
        console.error(error)
        res.status(500).json({Message: "Erreur lors de la création de l'abonné.", error});
    }
}

// GET ALL NEWSLETTER
export const allAbonnes = async (req, res) => {
    try {
        const response = await Newsletter.find().sort({date: -1})
        res.status(200).json(response);
    } catch (error) {
        console.error(error)
        res.status(500).json({Message: "Erreur lors de la réception des abonnés.", error});
    }
}

// NEWSLETTER BY ID
export const abonneID = async (req, res) => {
    try {
        const response = await Newsletter.findById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({Message: "Echec lors de la récupération de l'abonné.", error})
    }
}

// UPDATE NEWSLETTER
export const updateAbonne = async (req, res) => {
    try {
        //  "req.params.id" : on récupère l'id du document qu'on veut metre à jour.
        //  "req.body" : contient les nouvelles données envoyées par le client dans le corps de la requête.
        //  "{new: true}" : C'est une option qui permet à la méthode de retourner le document mis à jour plutôt que l'original. Si on ne met pas cette option, la méthode retournera l'état du document avant la MAJ.
        const response = await Newsletter.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({Message: "Abonné modifié avec succès." ,response})
    } catch (error) {
        console.error(error);
        res.status(500).json({Message: "Echec lors de la modification de l'abonné."});
    }
}

// DELETE NEWSLETTER
export const deleteAbonne = async (req, res) => {
    try {
        const response = await Newsletter.findByIdAndDelete(req.params.id)
        res.status(200).json({Message: "Abonné supprimé avec succès.", response})
    } catch (error) {
        console.error(error);
        res.status(500).json({Message: "Echec lors de la suppression de l'abonné.", error})
    }
}