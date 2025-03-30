// import { useEffect, useState, useRef } from "react";

export const RECAPTCHA_PUBLIC_KEY = "6Le0SuYqAAAAAHfMcbGHjP1Ggqpsa_ynGieVDhqL"

// const Recaptcha = () => {

//     const refRecaptcha = useRef(null)
//     const [recaptchaToken, setRecaptchaToken] = useState(null);

//     useEffect(() => {
//         // On créer le script dans le DOM
//         const script = document.createElement('script');
//         // On indique l'url du fichier JS qu'on veut utiliser
//         script.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_PUBLIC_KEY;
//         // Chargement asynchrone : le navigateur peut continuer de télécharger d'autres ressources pendant que le script est chargé = amélioration des performances de la page.
//         script.async = true;
//         // Le script ne sera exécuté qu'une fois que tout le DOM sera chargé
//         script.defer = true;
//         // On ajoute le script au corps "body" de la page
//         document.body.appendChild(script);

//         return () => {
//             // On nettoie tout effet secondaire laissé par le composant une fois qu'on en a plus besoin.
//             document.body.removeChild(script);
//         };
//     }, []);


//     // on appelle handleRecaptcha lorsque l'utilisateur clique sur le bouton.
//     //   Lorsque l'utilisateur clique sur le bouton, value est égal au token qui est généré lors du clic.
//     const handleRecaptcha = (value) => {
//         setRecaptchaToken(value);

//     };

//     const resetRecaptcha = (value) => {
//         setRecaptchaToken(null);
//         if (refRecaptcha.current) {
//             refRecaptcha.current.reset()
//         }
//     }


//     return { refRecaptcha, recaptchaToken, handleRecaptcha, resetRecaptcha }
// }

// export default Recaptcha

