import Contact from "../models/contact.model.js";
import { RGXR } from "../utils/regex.js";

// CREATION MESSAGE
export const creationMessage = async (req, res) => {
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
        const contentRegexr = RGXR.CONTENT;
        if (!contentRegexr.test(req.body.content) || req.body.content.length < 3 || req.body.content.length > 500) {
            return res.status(400).json({ Message: "Format email, entre 3 et 500 caractères attendus." });
        }
        if (req.body.phone) {
            const phoneRegexr = RGXR.PHONE;
            if (!phoneRegexr.test(req.body.phone) || req.body.phone.length !== 10) {
                return res.status(400).json({ Message: "10 chiffres attendus." });
            }
        }

        const response = await Contact.create(req.body);
        res.status(201).json({ Message: "Message envoyé avec succès.", response })
    } catch (error) {
        console.error(error);
        res.status(500).json({ Message: "Echec lors de la création du message.", error });
    }
}

// GET ALL MESSAGES
export const allMessage = async (req, res) => {
    try {
        const response = await Contact.find().sort({ date: -1 });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la récupération des messages.", error });
    }
}

// MESSAGE BY ID
export const messageID = async (req, res) => {
    try {
        const response = await Contact.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la récupération du message.", error })
    }
}

// UPDATE MESSAGE
export const updateMessage = async (req, res) => {
    try {
        //  "req.params.id" : on récupère l'id du document qu'on veut metre à jour.
        //  "req.body" : contient les nouvelles données envoyées par le client dans le corps de la requête.
        //  "{new: true}" : C'est une option qui permet à la méthode de retourner le document mis à jour plutôt que l'original. Si on ne met pas cette option, la méthode retournera l'état du document avant la MAJ.
        const response = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ Message: "Message modifié avec succès.", response });
    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la modification du message.", error })
    }
}

// DELETE MESSAGE
export const deleteMessage = async (req, res) => {
    try {
        const response = await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json({ Message: "Message supprimé avec succès.", response })
    } catch (error) {
        res.status(500).json({ Message: "Echec de la tentative de suppression du message.", error })
    }
}