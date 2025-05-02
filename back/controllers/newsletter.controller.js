import Newsletter from "../models/newsletter.model.js";
import { RGXR } from "../utils/regex.js";
import { env } from "../config/index.js";
import axios from "axios"
import { ERROR } from "../utils/error.js";


// CREATION NEWSLETTER
export const creationAbonne = async (req, res) => {
    try {
        const {firstname, lastname, email} = req.body;
        const recaptchaToken = req.body.recaptchaToken;

        if (!recaptchaToken) {
            return res.status(400).json({ message: "Le CAPTCHA est requis." });
        }

        // Vérification du token recaptcha via l'API de Google
        const captcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null,
            {
                params: {
                    secret: env.RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                },
            }
        );

        // On vérifie la validation recaptcha
        if (!captcha.data.success) {
            return res.status(400).json({ message: "Echec de la Vérification reCAPTCHA." });
        }

        const firstnameRegexr = RGXR.PRENOM;
        if (!firstnameRegexr.test(firstname) || firstname.length < 2 || firstname.length > 30) {
            return res.status(400).json({ message: ERROR.U_FIRSTNAME });
        }
        const lastnameRegexr = RGXR.NOM;
        if (!lastnameRegexr.test(lastname) || lastname.length < 2 || lastname.length > 30) {
            return res.status(400).json({ message: ERROR.U_LASTNAME });
        }
        const emailRegexr = RGXR.EMAIL;
        if (!emailRegexr.test(email) || email.length < 10 || email.length > 60) {
            return res.status(400).json({ message: ERROR.U_EMAIL });
        }

        const emailExistant = await Newsletter.findOne({ email: req.body.email});
        if (emailExistant) {
            res.status(404).json({message: "Utilisateur déjà abonné."})
        }

        await Newsletter.create(req.body);
        res.status(201).json({message: "Abonnement réalisé avec succès."})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Erreur lors de la création de l'abonné.", error});
    }
}

// GET ALL NEWSLETTER
export const allAbonnes = async (req, res) => {
    try {
        const response = await Newsletter.find().select("-password").sort({date: -1})
        if (response.length === 0) return res.status(404).json({message: "Aucune personne n'est abonnée."})

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
        if (!response) return res.status(404).json({message: "Utilisateur non trouvé."})
        res.status(200).json({message: "Utilisateur abonné récupéré avec succès."})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Echec lors de la récupération de l'abonné.", error})
    }
}

// UPDATE NEWSLETTER
export const updateAbonne = async (req, res) => {
    try {
        //  "req.params.id" : on récupère l'id du document qu'on veut metre à jour.
        //  "req.body" : contient les nouvelles données envoyées par le client dans le corps de la requête.
        //  "{new: true}" : C'est une option qui permet à la méthode de retourner le document mis à jour plutôt que l'original.
        //  Si on ne met pas cette option, la méthode retournera l'état du document avant la MAJ.
        await Newsletter.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "Utilisateur modifié avec succès."})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Echec lors de la modification de l'abonné."});
    }
}

// DELETE NEWSLETTER
export const deleteAbonne = async (req, res) => {
    try {
        await Newsletter.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Abonné supprimé avec succès."})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Echec lors de la suppression de l'abonné.", error})
    }
}