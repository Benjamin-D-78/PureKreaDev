import nodemailer from "nodemailer";
import { env } from "../config/index.js";

// Fonction pour envoyer un email de vérification
// export const sendEmail = async (user, verifieToken) => {
//     // Créer l'URL de vérification en fonction de l'environnement


//     // Configuration du transporteur Nodemailer
//     const transporter = nodemailer.createTransport({
//         host: "smtp.sendgrid.net",  // Serveur SMTP de Gmail
//         port: 587,  // Port SSL
//         secure: false,  // Utilisation de SSL
//         auth: {
//             user: env.EMAIL_USER,  // L'adresse email configurée dans .env
//             pass: env.RESEND_API_KEY,  // Le mot de passe configuré dans .env
//         },
//     });

//     // Vérification de la connexion au serveur SMTP
//     await new Promise((resolve, reject) => {
//         transporter.verify((error, success) => {
//             if (error) {
//                 console.error("Erreur de connexion au serveur SMTP:", error);
//                 reject(error);  // On rejette la promesse si la connexion échoue
//             } else {
//                 console.log("Le serveur SMTP est prêt à envoyer des messages");
//                 resolve(success);  // On résout la promesse si la connexion réussit
//             }
//         });
//     });

//     // Configuration des détails de l'email
//     const mailData = {
//         from: env.EMAIL_USER,  // Expéditeur (l'email de l'utilisateur)
//         to: user.email,  // Destinataire (l'email de l'utilisateur)
//         subject: "Vérifiez votre email",  // Sujet de l'email
//         text: `Bienvenue ${user.name}.\n\nMerci de vous être inscrit.\n\nCliquez sur ce lien pour vérifier votre email : ${verificationURL}`,
//         html: `Cliquez sur ce lien pour vérifier votre email : ${verificationLink}`,
//     };

//     // Envoi de l'email de vérification
//     await new Promise((resolve, reject) => {
//         transporter.sendMail(mailData, (err, info) => {
//             if (err) {
//                 console.error("Erreur lors de l'envoi de l'email:", err);
//                 reject(err);  // On rejette la promesse si l'envoi échoue
//             } else {
//                 console.log("Email envoyé avec succès:", info);
//                 resolve(info);  // On résout la promesse si l'email est envoyé avec succès
//             }
//         });
//     });

//     // Retourner un statut de succès une fois l'email envoyé
//     console.log("Email de vérification envoyé à", user.email);
// };



// Configuration SMTP de SendGrid.
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465, // 465 pour SSL, 587 pour TLS
  secure: true, // A false pour TLS
  auth: {
    user: env.API_KEY,
    pass: env.PASS_USER,
  },
});

export const sendEmail = async (user, verifieToken) => {

  const verificationURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/verification/${verifieToken}`
    : `https://pure-krea-benjamind.vercel.app/verification/${verifieToken}`;

  // Créer le lien de vérification au format HTML
  const verificationLink = `<a href="${verificationURL}">${verificationURL}</a>`;

  const mailData = {
    from: env.EMAIL_USER,  // Expéditeur (l'email de l'utilisateur)
    to: user.email,  // Destinataire (l'email de l'utilisateur)
    subject: "Vérifiez votre email",  // Sujet de l'email
    // text: `Bienvenue ${user.firstname} ${user.lastname}.\n\nMerci de vous être inscrit.\n\nCliquez sur ce lien pour vérifier votre email : ${verificationURL}`,
    html: `
        <p>Bienvenue ${user.firstname} ${user.lastname}.</p>
        <p>Nous vous remercions pour votre inscription</p>
        <p>Cliquez sur ce bouton pour valider votre email :</p>
        <br />
        <a href="${verificationURL}"><button style="background-color: #C6E60F;">Vérifier mon compte</button></a>
        <br />
        <br />
        <p>L'équipe PureKréa</p>`,
        
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log('Email envoyé :', info.response);
    console.log('Objet de l\'email:', mailData.subject);
  } catch (error) {
    console.error("Erreur lors de l'envoie de l'email : ", error.message);
  }
};
