import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { sendEmail } from "../services/nodemailer.js";
import { RGXR } from "../utils/regex.js";




// SIGNUP ( hashage du MDP avec "bcrypt" contenu dans une variable)
export const inscription = async (req, res, next) => {
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
        const passwordRegexr = RGXR.PASSWORD;
        if (!passwordRegexr.test(req.body.password) || req.body.password.length < 8 || req.body.password.length > 40) {
            return res.status(400).json({ Message: "Entre 8 et 40 caractères, (au moins une minuscule, une majusculte, un chiffre et un caractère spécial)." });
        }

        const hashedMDP = await bcrypt.hash(req.body.password, 10)

        const user = await userModel.create({ ...req.body, password: hashedMDP, isVerified: false });

        // On créé un token spécial qui va servir à vérifier l'email.
        const verificationToken = jwt.sign({ id: user._id }, env.TOKEN, { expiresIn: "24h" });
        // On envoi le mail à notre utilisateur avecle lien de vérification.
        await sendEmail(req.body, verificationToken);

        res.status(201).json({ Message: "L'utilisateur a bien été créé et l'email envoyé." });

    } catch (error) {
        console.log("Echec lors de l'inscription : ", error)
        next(error);
    }
}

// Cette fonction va vérifier l'email de l'utilisateur. C'est comme vérifier un ticket d'entrée.
export const verifyEmail = async (req, res, next) => {
    try {
        // On récupère le token depuis l'URL
        const { token } = req.params;
        // On vérifie si le token est valide
        const decoded = jwt.verify(token, env.TOKEN);
        // Maintenant on active le compte de l'utilisateur
        await userModel.findByIdAndUpdate(decoded.id, { isVerified: true }, {
            new: true,
        });

        res.status(200).json({ message: 'Email vérifié avec succès.' });

    } catch (error) {
        // On peut aussi utiliser la fonction next()
        console.error('Erreur de vérification:', error);
        res.status(400).json({ message: 'Lien invalide ou expiré.' });
    }
};

// RENVOIE EMAIL
export const renvoieEmail = async (req, res, next) => {
    try {
        // On regarde dans la BDD si un utilisateur a l'email correspondant à ce qui est indiqué dans le req.body
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ Message: "Utilisateur non trouvé." })

        if (user.isVerified) {
            return res.status(400).json({ message: "L'email est déjà vérifié." });
        }

        // On créé un nouveau JWT qui prend trois paramètres : 
        // Le payload { id: user._id } qui inclu l'ID de l'utilisateur qui permet de vérifier l'identité de l'utilisateur à partir du token.
        // La clé secrète qui permet de signer le token et donc de le sécuriser.
        // L'option d'expiration (24h).
        const verificationToken = jwt.sign({ id: user._id }, env.TOKEN, { expiresIn: "24h" });
        await sendEmail(user, verificationToken);
        res.status(200).json({ Message: "Nouveau mail de vérification envoyé." })

    } catch (error) {
        console.log("Erreur lors de l'envoi du nouveau mail de vérification : ", error)
        next(error)
    }
}

// CONNEXION
export const connexion = async (req, res, next) => {
    try {
        const emailRegexr = RGXR.EMAIL;
        if (!emailRegexr.test(req.body.email) || req.body.email.length < 10 || req.body.email.length > 60) {
            return res.status(400).json({ Message: "Format email, entre 10 et 60 caractères attendus." });
        }
        const passwordRegexr = RGXR.PASSWORD;
        if (!passwordRegexr.test(req.body.password) || req.body.password.length < 8 || req.body.password.length > 40) {
            return res.status(400).json({ Message: "Entre 8 et 40 caractères, (au moins une minuscule, une majusculte, un chiffre et un caractère spécial)." });
        }

        // Recherche de l'utilisateur dans la BDD
        const rechercheUser = await userModel.findOne({ email: req.body.email });

        if (!rechercheUser) return res.status(404).json({ Message: "Utilisateur non trouvé." });

        // On vérifie si l'utilisateur a confirmé son email.
        if (!rechercheUser.isVerified) {
            return res.status(403).json({ message: "Veuillez vérifier votre email pour pouvoir vous connecter." })
        }

        // Comparaison du MDP fourni dans la requête avec le MDP dans la BDD.
        const compareMDP = await bcrypt.compare(req.body.password, rechercheUser.password)

        if (!compareMDP) return res.status(400).json({ Message: "Mauvais Mot De Passe." })

        // Création du Token de connexion avec expiration sous 24h.
        // Ici nous incluons l'ID de l'utilisateur dans lequel on signe le token via la clé secrète (env.token).
        // L'expiration prend au bout de 24h.
        const tokenUser = jwt.sign({ id: rechercheUser._id, role: rechercheUser.role }, env.TOKEN, { expiresIn: "24h" }) // TOKEN = valeur du token renseigné dans mon ".env"

        // On procède à l'extraction du MDP. Les autres propriétés sont regroupées dans un nouvel objet : "others".
        const { password, ...others } = rechercheUser._doc

        // Envoi du token sous forme de cookie HTTPonly, alors qu'avant le MDP était stocké dans le local storage.
        res.cookie("access_token", tokenUser, {
            httpOnly: true,
            secure: false, // A mettre sur "true" lors d'une mis een ligne du site.
            sameSite: "Lax", // Protège des attaques CSRF (usurpation d'identité, etc.)
            //Passer "sameSite" en "Strict" le jour où je met mon site en ligne.
            maxAge: 24 * 60 * 60 * 1000 // 24h en millisecondes.
        })
            .status(200)
            .json(others) // Renvoie les données en réponse à l'exception du MDP.

    } catch (error) {
        console.log("Echec total lors de la tentative de connexion : ", error)
        next(error)
    }
};

// GET ALL USERS
export const allUsers = async (req, res) => {
    try {
        const response = await userModel.find();
        res.status(200).json(response);
    } catch (error) {
        console.log("Echec lors de la réception des utilisateurs : ", error);
    }
};

// GET USER BY ID
export const userID = async (req, res) => {
    try {
        const response = await userModel.findById(req.params.id)

        if (response) res.status(200).json(response)
    } catch (error) {
        console.log("Echec lors de la réception de l'utilisateur : ", error)
    }
}

// UPDATE USER
export const upUser = async (req, res) => {
    try {
        if (req.body.firstname) {
            const firstnameRegexr = RGXR.PRENOM;
            if (!firstnameRegexr.test(req.body.firstname) || req.body.firstname.length < 2 || req.body.firstname.length > 30) {
                return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
            }
        }
        if (req.body.lastname) {
            const lastnameRegexr = RGXR.NOM;
            if (!lastnameRegexr.test(req.body.lastname) || req.body.lastname.length < 2 || req.body.lastname.length > 30) {
                return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
            }
        }
        if (req.body.email) {
            const emailRegexr = RGXR.EMAIL;
            if (!emailRegexr.test(req.body.email) || req.body.email.length < 10 || req.body.email.length > 60) {
                return res.status(400).json({ Message: "Format email, entre 10 et 60 caractères attendus." });
            }
        }
        if (req.body.password) {
            const passwordRegexr = RGXR.PASSWORD;
            if (!passwordRegexr.test(req.body.password) || req.body.password.length < 8 || req.body.password.length > 40) {
                return res.status(400).json({ Message: "Entre 8 et 40 caractères, (au moins une minuscule, une majusculte, un chiffre et un caractère spécial)." });
            }
        }
        if (req.body.phone) {
            const phoneRegexr = RGXR.PHONE;
            if (!phoneRegexr.test(req.body.phone) || req.body.phone.length != 10) {
                return res.status(400).json({ Message: "10 chiffres attendus." })
            }
        }
        if (req.body.adress) {
            const adressRegexr = RGXR.ADRESS;
            if (!adressRegexr.test(req.body.adress) || req.body.adress.length < 8 || req.body.adress.length > 70) {
                return res.status(400).json({ Message: "Entre 8 et 70 aractères attendus." })
            }
        }
        if (req.body.postal) {
            const postalRegexr = RGXR.POSTAL;
            if (!postalRegexr.test(req.body.postal) || req.body.postal.length != 5) {
                return res.status(400).json({ Message: "5 chiffres attendus." })
            }
        }
        if (req.body.town) {
            const townRegexr = RGXR.TOWN;
            if (!townRegexr.test(req.body.town) || req.body.town.length < 2 || req.body.town.length > 50) {
                return res.status(400).json({ Message: "Entre 2 et 50 caractères attendus." })
            }
        }

        // On vérifie si l'utilisateur existe :
        const response = await userModel.findById(req.params.id);
        if (!response) return res.status(404).json({ Message: "Utilisateur non trouvé." });

        // toString (avec majuscule !) ; ici on compare si l'id de l'utilisateur à updater est le même id que l'utilisateur qui souhaite faire cet update.
        // req.user.id car on fait appel au "user" définit dans le "auth.js".
        if (req.user.id !== response._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ Message: "Accès refusé : vous n'êtes pas l'utilisateur concerné." })
        }

        // Si le mot de passe est modifié, on le hache avant de le sauvegarder
        if (req.body.password) {
            if (!req.body.ancienMDP) {
                return res.status(400).json({ Message: "Le mot de passe actuel est requis." })
            }

            // On vérifie que le mot de passe actuel envoyé par l'utilisateur coresspond à celui stocké dans la BDD
            const correspond = await bcrypt.compare(req.body.ancienMDP, response.password);
            if (!correspond) {
                return res.status(400).json({ Message: "Le mot de passe actuel est incorrect." })
            }

            // On hashe le nouveau MDP
            const hashedPassword = await bcrypt.hash(req.body.password, 10); // On hache le nouveau mot de passe
            req.body.password = hashedPassword //On remplace le MDP par sa version hachée.
        }
        // Mise à jour de l'utilisateur :
        const update = await userModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // set est propre à mongoose, et spécifie les champs qui doivent être mis à jour.
            { new: true }) // On envoie le nouveau document mis à jour.
        res.status(200).json({ message: "Informations mises à jour avec succès.", update })

    } catch (error) {
        console.log("Erreur lors de la tentative de mise à jour : ", error)
    }
}

// DELETE USER
export const deleteUser = async (req, res) => {
    try { // On vérifie si l'utilisateur existe :
        const response = await userModel.findById(req.params.id);

        if (!response) return res.status(404).json({ message: "Utilisateur non trouvé." });
        console.log("req.user.role : ", req.user);
        if (req.user.id !== response._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Accès refusé : vous n'êtes pas l'utilisateur concerné." })
        }

        // Suppression de l'utilisateur
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });

    } catch (error) {
        console.log("Erreur lors de la tentative de suppression : ", error);
    }
};