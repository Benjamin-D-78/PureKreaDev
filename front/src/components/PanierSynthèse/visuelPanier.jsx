import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import visuelPanier from "./visuelPanier.module.css"
import { URL } from '../../utils/constantes';
import axiosInstance from '../../utils/axiosInstance';

// CONTEXT
import { AuthContext } from "../../context/AuthContext"; // On importe le contexte
import { PanierContext } from '../../context/PanierContext';

// ICONES
import supprimer from "../../images/Icones/supprimer.png"
import imgDeconnexion from "../../images/Icones/deconnexion.png"



const PanierTotal = () => {

  const { retirerArticle, prixParQuantite, totalArticle, changerQuantite, videPanier, panier, prixTotal } = useContext(PanierContext)
  const { auth, deconnexion } = useContext(AuthContext); // On récupère l'objet utilisateur depuis le contexte
  const [loading, setLoading] = useState(true)
  const [utilisateur, setUtilisateur] = useState({
    firstname: "",
    lastname: "",
  });

  const [selection, setSelection] = useState("")

  const deconnexionTotale = () => {
    videPanier();
    deconnexion();
  }

  const navigate = useNavigate();

  // On crée une fonction pour gérer le changement de sélection dans le select.
  const select = (event) => {
    const value = event.target.value
    setSelection(value)

    if (value === "Mon profil") {
      navigate(`/monprofil/${auth._id}`)

    } else if (value === "Mes commandes") {
      navigate(`/mescommandes/${auth._id}`)
    }
  }



  useEffect(() => {
    if (auth) {
      const userById = async () => {
        if (URL.USER_BY_ID) {
          try {
            const response = await axiosInstance.get(`${URL.USER_BY_ID}/${auth._id}`);
            setUtilisateur(response.data)
            setLoading(false)
          } catch (error) {
            console.error("Erreur lors de la recherche d'utilisateur", error)
            setLoading(false)
          }
        }
      };
      userById();
    }
  }, [auth])

  if (loading) return;

  return (
    <div>
      <div className={visuelPanier.gestionUtilisateur}>
        <div className={visuelPanier.contientSelect}>
          <label htmlFor="select-option" className="sr-only">Sélectionnez une option : mon profil ou mon compte</label>
          <select value={selection} onChange={select} id='select-option' aria-label="Sélectionnez une option : mon profil ou mon compte">
            <option>Mon compte ▼</option>
            <option value="Mon profil">Mon profil</option>
            <option value="Mes commandes">Mes commandes</option>
          </select>
        </div>
        <div className={visuelPanier.contientBtnDeconnexion}>
          <img onClick={deconnexionTotale} src={imgDeconnexion} alt="Bouton cliquable pour se déconnecter de son compte" />
        </div>
      </div>
      <section className={visuelPanier.containerPanier}>
        <p className={visuelPanier.nom}>{auth ? `${utilisateur.firstname}` : ""}</p>
        <p className={visuelPanier.prenom}>{auth ? `${utilisateur.lastname}` : ""}</p>
        <hr className={visuelPanier.hr} />

        <p className={visuelPanier.pMonPanier}>Mon panier :</p>
        <div className={visuelPanier.synthesePanier}>
          <p className={visuelPanier.pQte}>Qté</p>
          <p className={visuelPanier.pPrix}>Prix</p>
          <p className={visuelPanier.totalArticle}>{totalArticle()}</p>
          <p className={visuelPanier.prixTotal}>{prixTotal} €</p>
        </div>

        {panier.map((article, index) => (
          <div key={index} className={visuelPanier.detailsPanier}>
            <p className={visuelPanier.nomArticle}>{article.name}</p>

            <label htmlFor="select-quantite" className="sr-only">Sélectionnez une quantité</label>
            <select
              id='select-quantite'
              aria-label="Sélectionnez une quantité"
              className={visuelPanier.selectQTE}
              // On lie la quantité de l'article dans le panier à la valeur de l'option sélectionnée dans le select
              // Chaque modification dans le selecteur appelle la fonction "changerQuantite".
              value={article.quantite}
              // on appelle onChange a chaque fois qu'une nouvelle quantité est choisie dans le select.
              // index sert à identifier quel article doit être modifié.
              onChange={(event) => changerQuantite(index, parseInt(event.target.value, 10))} // 10 pour 2 chiffres après la virgule
            >
              {/* On créé un tableau vide (...Array) dans lequel on va ajouter le stock du produit (dynamiquement) et que l'on va mapper. */}
              {/* "_" est une convention pour dire que l'on a pas besoin de la valeur de l'élément puisque les éléments du tableau sont "undefined" à la base. */}
              {[...Array(article.stock)].map((_, qte) => ( 
                <option key={qte} value={qte + 1}> {/* {qte + 1} correspond à la quantité disponible à choisir. */}
                  {qte + 1}
                </option>
              ))}
            </select>
            
            {/* Ici on multiplie le prix par la quantité avec la fonction "prixParQuantite" définie dans notre PanierContext */}
            <p className={visuelPanier.prixArticle}>{prixParQuantite(article.price, article.quantite)} €</p>
            <div className={visuelPanier.contientIconeSuppression}>
              <img onClick={() => retirerArticle(index)} src={supprimer} alt="supprimer un article du panier" />
            </div>
          </div>
        ))}
        <div className={visuelPanier.contientBoutonCommande}>
          <Link to={{ pathname: "/commande" }}><button className={visuelPanier.boutonPasserCommande}>Passer la commande</button></Link>
        </div>
      </section>
    </div>

  );
};

export default PanierTotal;
