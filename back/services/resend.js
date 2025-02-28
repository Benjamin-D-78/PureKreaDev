import { Resend } from 'resend';
import { env } from '../config/index.js';

const resend = new Resend("re_9wc9TdHE_GrMHiQkEc6TAgr5hHxQZJNDY");
console.log("mon test API_KEY : ", process.env.RESEND_API_KEY)

export const sendEmail = async (user, verifieToken) => {
    const verificationURL = process.env.NODE_ENV === 'development' 
        ? `http://localhost:3000/verification/${verifieToken}` 
        : `https://pure-krea-benjamind.vercel.app/verification/${verifieToken}`;
    
    const htmlContent = `
        <p>Bonjour ${user.name},</p>
        <p>Merci de vous être inscrit ! Cliquez sur le lien ci-dessous pour vérifier votre email.</p>
        <a href="${verificationURL}">${verificationURL}</a>
    `;

    try {
        // On envoie l'email
        const response = await resend.emails.send({
            from: 'desmonet.idf@gmail.com',
            to: user.email,
            subject: 'Vérification de votre email',
            html: htmlContent,
        });

        console.log('Email envoyé avec succès:', response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
};
