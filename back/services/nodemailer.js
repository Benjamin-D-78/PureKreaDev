import nodemailer from "nodemailer";
import { env } from "../config/index.js";

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

  // const verificationLink = `<a href="${verificationURL}">${verificationURL}</a>`;

  const mailData = {
    from: env.EMAIL_USER,  // Expéditeur (l'email de l'utilisateur)
    to: user.email,  // Destinataire (l'email de l'utilisateur)
    subject: "PureKréa - Vérifiez votre email",  // Sujet de l'email
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
    console.log("Email envoyé :", info.response);
    console.log("Objet de l'email", mailData.subject);
  } catch (error) {
    console.error("Erreur lors de l'envoie de l'email : ", error.message);
  }
};

export const resetMDP = async (user, verifieToken) => {

  const verificationURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/reset/${verifieToken}`
    : `https://pure-krea-benjamind.vercel.app/reset/${verifieToken}`;

  const reset = {
    from: env.EMAIL_USER,  // Expéditeur (l'email de l'utilisateur)
    to: user.email,  // Destinataire (l'email de l'utilisateur)
    subject: "Réinitialisez votre mot de passe",  // Sujet de l'email
    html: `
        <p>Veuillez cliquer sur le bouton ci-dessous pour modifier votre mot de passe :</p>
        <br />
        <a href="${verificationURL}"><button style="background-color: #C6E60F;">Modifier mon mot de passe</button></a>
        <br />
        <br />
        <p style="color: #FF0000;">Si vous n'êtes pas à l'origine de cette demande, veuillez nous contacter dès que possible :</p>
        <ul>
          <li style="color: #FF0000;"> Par retour de mail.</li>
          <li style="color: #FF0000;"> Par téléphone, au 0170707070.</li>
        </ul>
        <br />
        <p>L'équipe PureKréa</p>`,
  };

  try {
    const info = await transporter.sendMail(reset);
    console.log("Email envoyé :", info.response);
    console.log("Objet de l'email", reset.subject);
  } catch (error) {
    console.error("Erreur lors de l'envoie de l'email : ", error.message);
  }
}
