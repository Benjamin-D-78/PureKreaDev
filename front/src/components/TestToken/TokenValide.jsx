// import coin from "../../pages/Utilisateurs/coin.module.css"

// // CENTRALISATION
// import axiosInstance from "../../utils/axiosInstance";
// import { URL } from "../../utils/Constantes";
// import { RGXR, PATTERN } from "../../utils/Regixr";

// // COMPOSANTS
// import NavBar from "../NavBar/NavBar";
// import Footer from "../Footer/Footer";

// const TokenValide = () => {



//   return (
//     <div>
//     <NavBar />
//     <div className={coin.divContainerIn}>
//         <div className={coin.boxIn1}>
//             <div className={coin.formIn}>
//                 <h1 className={coin.titreCoIn}>Modifier mon mot de passe</h1>
//                 <form onSubmit={handleSubmit} noValidate>

//                     <label className={coin.labelCoIn} htmlFor="email-inscription">E-mail : <span className={coin.spanInscription}>*</span></label>
//                     <input
//                         className={coin.inputCoIn}
//                         type="text"
//                         name='email'
//                         id='email-inscription'
//                         onChange={handleChange}
//                         onBlur={checkInput}
//                         minLength={8}
//                         maxLength={60}
//                         pattern={PATTERN.EMAIL}
//                         onInput={(event) => {
//                             event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
//                         }} />
//                     <span className={coin.spanAlerte}>Adresse "gmail" recommandée.</span><br />
//                     {error.email && <span className={coin.spanError}>{error.email}</span>}
//                     <br />

//                     <label className={coin.labelCoIn} htmlFor="password-inscription">Mot de passe : <span className={coin.spanInscription}>*</span></label>
//                     <div className={coin.contientInputImg}>
//                         <div className={coin.inputsMDP}>
//                             <input
//                                 className={coin.inputMDP}
//                                 type={voirA ? "text" : "password"}
//                                 name='password'
//                                 id='password-inscription'
//                                 onChange={handleChange}
//                                 onBlur={checkInput}
//                                 minLength={8}
//                                 maxLength={40}
//                                 pattern={PATTERN.PASSWORD}
//                                 onInput={(event) => {
//                                     event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
//                                 }} />
//                         </div>
//                         <div className={coin.contientVoir}>
//                             <img onClick={() => setVoirA(!voirA)} className={coin.voir} src={voir} alt="Icone pour voir le mot de passe indiqué" />
//                         </div>
//                     </div>
//                     <br />

//                     <label className={coin.labelCoIn} htmlFor="repeatPassword-inscription">Répétez le mot de passe : <span className={coin.spanInscription}>*</span></label>
//                     <div className={coin.contientInputImg}>
//                         <div className={coin.inputsMDP}>
//                             <input
//                                 className={coin.inputMDP}
//                                 type={voirB ? "text" : "password"}
//                                 name='repeatPassword'
//                                 id='repeatPassword-inscription'
//                                 onChange={handleChange}
//                                 onBlur={checkInput}
//                                 minLength={8}
//                                 maxLength={40}
//                                 pattern={PATTERN.PASSWORD}
//                                 onInput={(event) => {
//                                     event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
//                                 }} />
//                         </div>
//                         <div className={coin.contientVoir}>
//                             <img onClick={() => setVoirB(!voirB)} className={coin.voir} src={voir} alt="Icone pour voir le mot de passe indiqué" />
//                         </div>
//                     </div>
//                     {error.password && <span className={coin.spanError}>{error.password}</span>}
//                     {mdpTape && (
//                         <div>
//                             {!user.password?.match(/.*[a-z].*/) && (
//                                 <span className={coin.spanError}>Au moins une lettre minuscule.</span>
//                             )}
//                             {!user.password?.match(/.*[A-Z].*/) && (
//                                 <span className={coin.spanError}>Au moins une lettre majuscule.</span>
//                             )}
//                             {!user.password?.match(/.*\d.*/) && (
//                                 <span className={coin.spanError}>Au moins un chiffre.</span>
//                             )}
//                             {!user.password?.match(/.*[,;.?!\*\(\)].*/) && (
//                                 <span className={coin.spanError}>Au moins un caractère spécial.</span>
//                             )}
//                         </div>
//                     )}

//                     {error.repeatPassword && <span className={coin.spanError}>{error.repeatPassword}</span>}
//                     <br />
//                     <div className={coin.contientSubmit}>
//                         <button className={coin.submitCoIn}>Envoyer</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//     <Footer />
// </div>
//   )
// }

// export default TokenValide