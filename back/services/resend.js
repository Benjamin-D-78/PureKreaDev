import Resend from 'resend';
import { env } from '../config/index.js'; // Assurez-vous de charger votre .env

const resend = new Resend(env.EMAIL_PASS);

export const sendEmail = async (user, verifieToken) => {
    const verificationURL = process.env.NODE_ENV === 'development' 
        ? `http://localhost:3000/verification/${verifieToken}` 
        : `https://pure-krea-benjamind.vercel.app/verification/${verifieToken}`;
    
    // Vous pouvez personnaliser ce message selon vos besoins
    const htmlContent = `
        <p>Bonjour ${user.name},</p>
        <p>Merci de vous être inscrit ! Cliquez sur le lien ci-dessous pour vérifier votre email.</p>
        <a href="${verificationURL}">${verificationURL}</a>
    `;

    try {
        // Envoyer l'email
        const response = await resend.emails.send({
            from: 'votre-email@domaine.com', // Utilisez votre propre adresse email
            to: user.email,
            subject: 'Vérification de votre email',
            html: htmlContent,
        });

        console.log('Email envoyé avec succès:', response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
};
