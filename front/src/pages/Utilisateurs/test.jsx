// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const ResetPassword = () => {
//   const { token } = useParams(); // Récupère le token depuis l'URL
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas.");
//       return;
//     }

//     try {
//       // Envoi du nouveau mot de passe au backend
//       const response = await axiosInstance.post("/reset-password", { token, newPassword });
//       toast.success(response.data.message); // Affiche un message de succès
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Erreur lors de la réinitialisation du mot de passe.");
//     }
//   };

//   return (
//     <div>
//       <h2>Réinitialiser votre mot de passe</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nouvelle adresse e-mail</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirmez le mot de passe</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p>{error}</p>}
//         <button type="submit">Réinitialiser le mot de passe</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;




// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useParams, useHistory } from "react-router-dom";
// import { toast } from "react-toastify";

// const ResetPassword = () => {
//   const { token } = useParams(); // Récupère le token depuis l'URL
//   const history = useHistory(); // Pour la redirection
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [tokenValid, setTokenValid] = useState(false); // Pour suivre l'état de la validité du token
//   const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement pendant la validation du token

//   // Vérifier la validité du token lorsqu'on arrive sur la page
//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         // Envoie une requête GET au backend pour valider le token
//         await axiosInstance.get(`/reset/${token}`);
//         setTokenValid(true); // Le token est valide, on peut afficher le formulaire
//       } catch (error) {
//         setTokenValid(false); // Le token est invalide ou expiré
//         toast.error("Le lien de réinitialisation est invalide ou a expiré.");
//       } finally {
//         setLoading(false); // Fin du chargement
//       }
//     };

//     validateToken(); // Appel de la fonction pour valider le token
//   }, [token]);

//   // Gérer la soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas.");
//       return;
//     }

//     try {
//       // Envoi du nouveau mot de passe au backend
//       const response = await axiosInstance.post("/reset-password", { token, newPassword });
//       toast.success(response.data.message); // Affiche un message de succès
//       history.push("/connexion"); // Redirige l'utilisateur vers la page de connexion
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Erreur lors de la réinitialisation du mot de passe.");
//     }
//   };

//   // Si le token est encore en cours de validation ou invalide, on affiche un message d'attente
//   if (loading) {
//     return <p>Vérification du lien...</p>;
//   }

//   if (!tokenValid) {
//     return <p>Le lien de réinitialisation est invalide ou a expiré.</p>;
//   }

//   return (
//     <div>
//       <h2>Réinitialiser votre mot de passe</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nouvelle adresse e-mail</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirmez le mot de passe</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p>{error}</p>}
//         <button type="submit">Réinitialiser le mot de passe</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
