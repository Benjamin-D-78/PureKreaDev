import { React, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import { URL } from '../../utils/Constantes'
import { PATTERN } from '../../utils/Regixr'

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "./commande.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import PrenezRendezVous from '../../components/PrenezRendezVous/prenezRendezVous'
import Accordeon from '../../components/Accordeon/accordeon'
import ModalCGV from '../../components/ModalCGV/ModalCGV'
import PetitCaroussel from '../../components/PetitCaroussel/PetitCaroussel'

// CONTEXT
import { AuthContext } from '../../context/AuthContext'
import { PanierContext } from '../../context/PanierContext'

const Commande = () => {

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext)
  const { validerCommande, prixParQuantite, totalArticle, panier, prixTotal, commentaire, setCommentaire } = useContext(PanierContext)
  const [checkboxCochee, setCheckboxCochee] = useState(false)

  const [utilisateur, setUtilisateur] = useState({
    firstname: "",
    lastname: "",
    adress: "",
    postal: "",
    town: "",
    phone: ""
  });


  const handleCheckbox = () => {
    setCheckboxCochee(!checkboxCochee)
  }

  const verifieInformations = () => {

    return !(auth && utilisateur.firstname && utilisateur.lastname && utilisateur.adress && utilisateur.postal && utilisateur.town && utilisateur.phone)
  }

  const informationsManquantes = verifieInformations();

  const errorValidation = () => {
    if (!checkboxCochee || informationsManquantes) {
      toast.error("Vous devez compléter vos informations et cocher nos CGV pour valider la commande.")
    } else if (panier.length === 0) {
      toast.error("Votre panier est vide.")
    } else {
      navigate("/commande/paiement")
    }
  }





  useEffect(() => {
    if (auth) {
      const userById = async () => {
        if (URL.USER_BY_ID) {
          try {
            const response = await axios.get(`${URL.USER_BY_ID}/${auth._id}`);
            setUtilisateur(response.data)
          } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur", error)
          }
        }
      };
      userById();
    }
  }, [auth])




  return (
    <main>
      <NavBar />
      <h1 className={boutique.h1Boutique}>Commande</h1>

      <div className={commande.conteneurGlobal}>
        <div className={commande.conteneurG}>
          <PetitCaroussel />
          <PrenezRendezVous />
          <Accordeon />
        </div>

        <div>
          <div className={commande.blocEntete1}>
            <div className={commande.entete1}>
              <p className={commande.pName}>Récapitulatif</p>
            </div>
          </div>
          <div className={commande.conteneurD}>
            <div className={commande.conteneurGeneralRecap}>
              <p className={commande.livraisonA}>Livraison à :</p>
              <div className={commande.conteneurInfoUtilisateur}>
                <div className={commande.labelUtilisateur}>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Nom : </label>
                    {utilisateur && utilisateur.lastname ? (<span className={commande.pUtilisateur}>{utilisateur.lastname}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Prénom : </label>
                    {utilisateur && utilisateur.firstname ? <span className={commande.pUtilisateur}>{utilisateur.firstname}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Adresse : </label>
                    {utilisateur && utilisateur.adress ? <span className={commande.pUtilisateur}>{utilisateur.adress}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Code postal : </label>
                    {utilisateur && utilisateur.postal ? <span className={commande.pUtilisateur}>{utilisateur.postal}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Ville : </label>
                    {utilisateur && utilisateur.town ? <span className={commande.pUtilisateur}>{utilisateur.town}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Téléphone : </label>
                    {utilisateur && utilisateur.phone ? <span className={commande.pUtilisateur}>{utilisateur.phone}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div className={commande.contientArea}>
                    <div className={commande.labelArea}><label className={commande.labelCommentaire} htmlFor="comment">Commentaire : </label></div>
                    <div className={commande.textArea}>
                      <textarea
                        value={commentaire}
                        className={commande.areaUtilisateur}
                        minLength={3}
                        maxLength={500}
                        name="comment"
                        id="comment"
                        rows={4}
                        cols={24}
                        onChange={(event) => setCommentaire(event.target.value)}
                        pattern={PATTERN.CONTENT}
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(/[^a-zA-Z0-9,?!().\"'éèêàùîôäëïöü -]/g, '');
                        }}
                      >
                      </textarea>
                    </div>
                  </div>
                  <div className={commande.contientBtnMInfo}>
                    <Link to={{ pathname: `/monprofil/${utilisateur._id}` }}><button className={commande.btnModifierInformations}>Modifier mes informations</button></Link>
                  </div>
                </div>
              </div>
              <hr className={commande.hrCommande} />
              <p className={commande.livraisonA}>Récapitulatif d'achat(s) :</p>
              <div className={commande.conteneurInfoUtilisateur}>


                <div className={commande.synthesePanier}>
                  <p className={commande.pNomArticle}>Référence</p>
                  <p className={commande.pLargeur}>Largeur</p>
                  <p className={commande.pU}>P/U</p>
                  <p className={commande.pQte}>Quantité</p>
                  <p className={commande.pPrix}>Total</p>
                </div>

                {panier.map((article, index) => (
                  <div key={index} className={commande.detailsPanier}>
                    <p className={commande.nomArticle}>{article.name}</p>
                    <p className={commande.largeurArticle}>{article.width} cm</p>
                    <p className={commande.quantiteU}>{article.price} €</p>
                    <p className={commande.quantiteArticle}>{article.quantite}</p>
                    <p className={commande.prixArticle}>{prixParQuantite(article.price, article.quantite)} €</p>
                  </div>
                ))}
                <hr className={commande.hrBilan} />
              </div>
              <div className={commande.totalRecapHT}>
                <p className={commande.pHT}>HT :</p>
                <p className={commande.quantiteTotalRecapHT}>{totalArticle()}</p>
                <p className={commande.prixTotalRecapHT}>{(prixTotal / 1.20).toFixed(2)} €</p>
              </div>
              <div className={commande.totalRecapTTC}>
                <p className={commande.pTTC}>TTC :</p>
                <p className={commande.quantiteTotalRecapTTC}>{totalArticle()}</p>
                <p className={commande.prixTotalRecapTTC}>{prixTotal.toFixed(2)} €</p>
              </div>

              <div className={commande.divContientCheckBox}>
                <div className={commande.contientCheckbox}>
                  <input
                    onChange={handleCheckbox}
                    className={commande.checkboxCommande}
                    type='checkbox'
                    required>
                  </input>
                </div>
                <div className={commande.divPCGV}>
                  <p className={commande.pCGV}>En cochant cette case vous acceptez nos</p>
                  <ModalCGV />
                </div>
              </div>

              <div className={commande.contientBtnValidation1}>
                <button
                  onClick={errorValidation}
                  className={commande.btnValidation1}>Valider la commande
                </button>
              </div>
              <div className={commande.contientBtnValidation2}>
                <Link to={{ pathname: "/" }}><button className={commande.btnValidation2}>Revenir au panier</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Commande