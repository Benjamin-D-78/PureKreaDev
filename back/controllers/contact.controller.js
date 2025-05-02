import Contact from "../models/contact.model.js";
import { env } from "../config/index.js"
import axios from "axios"
import { USER_CHAMPS } from "../utils/champs.js";

// CREATION MESSAGE
export const creationMessage = async (req, res) => {
    try {
        const { recaptchaToken, motif, firstname, lastname, email, phone, content, verification } = req.body

        if (!recaptchaToken) {
            return res.status(400).json({ message: "Le CAPTCHA est requis." });
        }
        if (!motif || !firstname || !lastname || !email || !content || !verification) {
            return res.status(400).json({ message: "Un ou plusieurs champs sont manquants." });
        }

        // Vérification du token recaptcha via l'API de Google
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null,
            {
                params: {
                    secret: env.RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                },
            }
        );

        // On vérifie la validation recaptcha
        if (!response.data.success) {
            return res.status(400).json({ message: "Echec de la Vérification reCAPTCHA." });
        }
        
        const champVerif = {firstname, lastname, email, phone, content}
        let errors = {}
        for (const champ in champVerif) {
            const { regex, minLength, maxLength, min, max, errorMessage, type } = USER_CHAMPS[champ]
            const value = champVerif[champ]

            if (type === "number") {
                const number = Number(value)
                if (!regex.test(value) || number < min || number > max) {
                    errors[champ] = errorMessage
                }
            } else {
                if (!regex.test(value) || value.length < minLength || value.length > maxLength) {
                    errors[champ] = errorMessage
                }
            }
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({message: "Tous les champs doivent êre renseignés correctement : ", errors})
        }

        const contact = await Contact.create(req.body);
        res.status(201).json({ Message: "Message envoyé avec succès.", contact })
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