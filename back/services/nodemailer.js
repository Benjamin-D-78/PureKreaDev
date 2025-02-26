import nodemailer from "nodemailer";
import { env } from "../config/index.js"


// TLS Transport Layer Security) et SSL Secure Sockets Layer) sont des protocoles de sécurité qui permettent de crypter les communications sur Internet :
// SSL C'est l'ancien protocole de sécurité, maintenant considéré comme obsolète. Il utilise généralement le port 465 pour les connexions email sécurisées.
// TLS C'est le successeur de SSL, plus moderne et plus sécurisé. Il utilise généralement le port 587 pour les connexions email.
// Dans le contexte de l'envoi d'emails avec Nodemailer, ces protocoles assurent que les communications entre notre application et le serveur SMTP de Gmail sont chiffrées et sécurisées.
const transporter = nodemailer.createTransport({
    // Configuration du serveur SMTP de Gmail
    host: "smtp.gmail.com",
    // Port standard pour TLS
    port: 587,
    // false pour TLS (port 587), true pour SSL (port 465)
    secure: false,
    // Authentification avec les identifiants Gmail
    auth: {
        // l'email configuré dans .env
        user: env.EMAIL_USER,
        // mot de passe configuré dans .env
        pass: env.EMAIL_PASS,
    },
});



// Cette fonction va nous permettre d'envoyer un email de vérification
export const sendEmail = async (user, verifieToken) => {
    // On crée un lien de vérification que l'utilisateur pourra cliquer
    // Le ${verifieToken} sera remplacé par le vrai token généré précédemment
    const verificationLink = `
    <a href='http://localhost:3000/verification/${verifieToken}'>${verifieToken}</a>
    `;
    // Maintenant, on va utiliser notre configuration nodemailer
    // pour envoyer l'email
    await transporter.sendMail({
        // C'est nous qui envoyons l'email (comme l'adresse de l'expéditeur)
        from: env.EMAIL_USER,
        // L'adresse email de notre nouvel utilisateur
        to: user.email,
        // Le sujet du mail (ce que verra l'utilisateur en premier)
        subject: "Vérifiez votre email",
        // Le message en version texte simple (au cas où l'HTML ne marche pas)
        text: `Bienvenue ${user.name}.\n\nMerci de vous être inscrit.\n\nCordialement.`,
        // La version en HTML avec notre lien de vérification
        html: `Cliquez sur ce lien pour vérifier votre email : ${verificationLink}`,
    });
};



