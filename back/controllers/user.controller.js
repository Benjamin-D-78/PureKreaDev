import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { sendEmail, resetMDP } from "../services/nodemailer.js";
import { RGXR } from "../utils/regex.js";
import { ERROR } from "../utils/error.js";
import axios from "axios"




// SIGNUP
export const inscription = async (req, res, next) => {
    try {
        const {recaptchaToken, firstname, lastname, email, password} = req.body

        if (!recaptchaToken) {
            return res.status(400).json({ message: "Le CAPTCHA est requis." });
        }
        if(!firstname || !lastname || !email || !password) {
            return res.status(400).json({message: "Tous les champs sont requis."})
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
        const passwordRegexr = RGXR.PASSWORD;
        if (!passwordRegexr.test(password) || password.length < 8 || password.length > 40) {
            return res.status(400).json({ message: ERROR.U_PASSWORD });
        }

        const userExist = await userModel.findOne({email: email})
        if (userExist) {
            return res.status(409).json({message: "Cet email est déjà utilisé."}) // code 409 pour les conflits
        }

        // 10 est le facteur de coût. C'est le nombre d'itération sur le mot de passe avant qu'il soit hashé.
        // Plus il y en a, plus c'est lent et donc mieux c'est.
        const hashedMDP = await bcrypt.hash(req.body.password, 10)
        const user = await userModel.create({ ...req.body, password: hashedMDP, isVerified: false });

        // On créé un token spécial qui va servir à vérifier l'email.
        const verificationToken = jwt.sign({ id: user._id }, env.TOKEN, { expiresIn: "24h" });
        // On envoi le mail à notre utilisateur avec le lien de vérification.
        await sendEmail(req.body, verificationToken);

        res.status(201).json({ message: "L'utilisateur a bien été créé et l'email envoyé : "});

    } catch (error) {
        console.log("Echec lors de l'inscription : ", error)
        res.status(500).json({message : "Echec de la tentative d'inscription."})
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

        res.status(200).json({ message: "Email vérifié avec succès." });

    } catch (error) {
        console.error("Erreur de vérification : ", error);
        res.status(400).json({ message: "Lien invalide ou expiré." });
    }
};

// RENVOIE EMAIL
export const renvoieEmail = async (req, res, next) => {
    try {
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

        // On regarde dans la BDD si un utilisateur a l'email correspondant à ce qui est indiqué dans le req.body
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." })

        if (user.isVerified) {
            return res.status(400).json({ message: "L'email est déjà vérifié." });
        }

        // On créé un nouveau JWT qui prend trois paramètres : 
        // Le payload { id: user._id } qui inclu l'ID de l'utilisateur qui permet de vérifier l'identité de l'utilisateur à partir du token.
        // La clé secrète qui permet de signer le token et donc de le sécuriser.
        // L'option d'expiration (24h).
        const verificationToken = jwt.sign({ id: user._id }, env.TOKEN, { expiresIn: "24h" });
        await sendEmail(user, verificationToken);
        res.status(200).json({ message: "Nouveau mail de vérification envoyé." })

    } catch (error) {
        console.log("Erreur lors de l'envoi du nouveau mail de vérification : ", error)
        next(error)
    }
}

export const mdpOublie = async (req, res) => {
    try {
        const recaptchaToken = req.body.recaptchaToken
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

        const emailRegexr = RGXR.EMAIL;
        if (!emailRegexr.test(req.body.email) || req.body.email.length < 10 || req.body.email.length > 60) {
            return res.status(400).json({ Message: "Format email, entre 10 et 60 caractères attendus." });
        }

        const rechercheUser = await userModel.findOne({ email: req.body.email });
        if (!rechercheUser) return res.status(404).json({ Message: "Utilisateur non trouvé." });

        // On vérifie si l'utilisateur a confirmé son email.
        if (!rechercheUser.isVerified) {
            return res.status(403).json({ message: "Veuillez vérifier votre email avant d'effectuer toute autre manipulation." })
        }

        // On créé un token spécial qui va servir à vérifier l'email.
        const verificationToken = jwt.sign({ email: rechercheUser.email }, env.TOKEN, { expiresIn: "1h" });
        // On envoi le mail à notre utilisateur avecle lien de vérification.
        await resetMDP(req.body, verificationToken);
        res.status(200).json({ Message: "L'utilisateur a bien été créé et l'email envoyé." });

    } catch (error) {
        res.status(500).json({ Message: "Echec de l'envoie du mail", error })
    }
}

export const resetPassword = async (req, res) => {
    try {
        // On récupère le token depuis l'URL
        const { token } = req.params;
        // On vérifie si le token est valide
        const decoded = jwt.verify(token, env.TOKEN);
        // On récupère l'utilisateur à partir de l'email
        const user = await userModel.findOne({ email: decoded.email });
        if (!user) {
            return res.status(400).json({ Message: "Utilisateur non trouvé" });
        }
        if (!user.isVerified) {
            return res.status(400).json({ Message: "Email non validé." });
        }

        res.status(200).json({ Message: "Token valide, vous pouvez maintenant réinitialiser votre mot de passe", user });

    } catch (error) {
        console.error(error)
        res.status(500).json({ Message: "Echec lors du décodage du token : ", error })
    }
}

export const mdpModifie = async (req, res) => {
    try {
        // On récupère le token depuis l'URL
        // console.log("req.body : ",req.body)
        // console.log("req.params : ",req.params)
        const { token } = req.params;
        // console.log(token)

        // On déstructure le req.body pour mieux le réutiliser
        const { email, password, repeatPassword } = req.body;

        if (repeatPassword !== password) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }

        const emailRegexr = RGXR.EMAIL;
        if (!emailRegexr.test(email) || email.length < 10 || email.length > 60) {
            return res.status(400).json({ Message: "Format email, entre 10 et 60 caractères attendus." });
        }
        const passwordRegexr = RGXR.PASSWORD;
        if (!passwordRegexr.test(password) || password.length < 8 || password.length > 40) {
            return res.status(400).json({ Message: "Entre 8 et 40 caractères, (au moins une minuscule, une majusculte, un chiffre et un caractère spécial)." });
        }
        const repeatPasswordRegexr = RGXR.PASSWORD;
        if (!repeatPasswordRegexr.test(repeatPassword) || repeatPassword.length < 8 || repeatPassword.length > 40) {
            return res.status(400).json({ Message: "Entre 8 et 40 caractères, (au moins une minuscule, une majusculte, un chiffre et un caractère spécial)." });
        }

        // On vérifie si le token est valide
        const decoded = jwt.verify(token, env.TOKEN);
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // On hashe le nouveau MDP
        const hashedPassword = await bcrypt.hash(password, 10); // On hache le nouveau mot de passe
        user.password = hashedPassword //On remplace le MDP par sa version hachée.
        await user.save();

        res.status(200).json({ Message: "Mot de passe modifié avec succès." })

    } catch (error) {
        console.error(error)
        res.status(500).json({ Message: "Echec de la modification du mot de passe." })
    }
}

// CONNEXION
export const connexion = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message: "Tous les champs sont requis."})
        }

        const emailRegexr = RGXR.EMAIL;
        if (!emailRegexr.test(email) || email.length < 10 || email.length > 60) {
            return res.status(400).json({ message: ERROR.U_EMAIL});
        }
        const passwordRegexr = RGXR.PASSWORD;
        if (!passwordRegexr.test(password) || password.length < 8 || password.length > 40) {
            return res.status(400).json({ message: ERROR.U_PASSWORD});
        }

        const rechercheUser = await userModel.findOne({ email: email });
        if (!rechercheUser) return res.status(404).json({ message: "Utilisateur non trouvé." });

        // On vérifie si l'utilisateur a confirmé son email.
        if (!rechercheUser.isVerified) {
            return res.status(403).json({ message: "Veuillez vérifier votre email pour pouvoir vous connecter." })
        }

        // Comparaison du MDP fourni dans la requête avec le MDP dans la BDD.
        const compareMDP = await bcrypt.compare(password, rechercheUser.password)
        if (!compareMDP) return res.status(400).json({ Message: "Mauvais Mot De Passe." })

        const tokenUser = jwt.sign({ id: rechercheUser._id, role: rechercheUser.role }, env.TOKEN, { expiresIn: "24h" })

        // "_doc" est l'objet renvoyé par mongoose, contenant plein de propriétés.
        const { password: _, ...reste } = rechercheUser._doc

        // Envoi du token sous forme de cookie HTTPonly, alors qu'avant le MDP était stocké dans le local storage.
        res.cookie("access_token", tokenUser, {
            httpOnly: true,
            secure: true, // A mettre sur "true" lors d'une mis een ligne du site.
            sameSite: "None", // Protège des attaques CSRF // Lex // Passer "sameSite" en "Strict" le jour où je met mon site en ligne.
            maxAge: 24 * 60 * 60 * 1000 // 24h en millisecondes.
        }).status(200).json(reste) // Renvoie les données en réponse à l'exception du MDP.

    } catch (error) {
        console.log("Echec total lors de la tentative de connexion : ", error)
        res.status(500).json({message: "Echec lors de la tentative de connexion."})
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
            if (!phoneRegexr.test(req.body.phone) || req.body.phone <0 || req.body.phone >9999999999) {
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
            if (!postalRegexr.test(req.body.postal) || req.body.postal < 1 || req.body.postal > 99999) {
                return res.status(400).json({ Message: "5 chiffres attendus." })
            }
        }
        if (req.body.town) {
            const townRegexr = RGXR.TOWN;
            if (!townRegexr.test(req.body.town) || req.body.town.length < 2 || req.body.town.length > 50) {
                return res.status(400).json({ Message: "Entre 2 et 50 caractères attendus." })
            }
        }

        const response = await userModel.findById(req.params.id);
        if (!response) return res.status(404).json({ Message: "Utilisateur non trouvé." });

        if (req.user.id !== response._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ Message: "Accès refusé : vous n'êtes pas l'utilisateur concerné." })
        }

        if (req.body.password) {
            if (!req.body.ancienMDP) {
                return res.status(400).json({ Message: "Le mot de passe actuel est requis." })
            }

            const correspond = await bcrypt.compare(req.body.ancienMDP, response.password);
            if (!correspond) {
                return res.status(400).json({ Message: "Le mot de passe actuel est incorrect." })
            }

            // 10 est le facteur de coût. C'est le nombre d'itération sur le mot de passe avant qu'il soit hashé.
            // Plus il y en a, plus c'est lent et donc mieux c'est.
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword
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
    try { // On vérifie si l'utilisateur existe
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
        console.log("Erreur lors de la tentative de suppression : ", error.message);
    }
};