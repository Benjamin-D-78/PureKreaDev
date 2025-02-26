import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"
import { URL } from "../../utils/Constantes.jsx";

// CSS
import boutique from "../Boutique/Boutique.module.css"
import detailsCSS from "./details.module.css"

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import PanierTotal from "../../components/PanierSynthèse/visuelPanier.jsx";
import ConnectezVous from "../../components/ConnectezVous/connectezVous.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";

// CONTEXT
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanierContext } from "../../context/PanierContext.jsx";

const Details = () => {





    const { auth } = useContext(AuthContext)
    const { ajouterArticle } = useContext(PanierContext)

    const [item, setItem] = useState([]);
    const [error, setError] = useState(null)
    const { id } = useParams(); // On récupère le paramètre dynamique de l'URL.

    const [imgSelection, setImgSelection] = useState("")
    const handleImgSelection = (image) => {
        // Si la même image est sélectionnée, on l'enlève du zoom
        if (imgSelection === image) {
            setImgSelection("");
        } else {
            setImgSelection(image);
        }
    };


    useEffect(() => {
        const detailsItem = async () => {
            if (URL.ITEM_BY_ID) {
                try {
                    const { data, status } = await axios.get(`${URL.ITEM_BY_ID}/${id}`)
                    setItem(data);
                } catch (error) {
                    setError("Erreur lors de la réception des données", error)
                }
            }
        };
        detailsItem();
    }, [id])

    return (
        <main>
            <NavBar />
            <h1 className={boutique.h1Boutique}>{item.name}</h1>

            <div className={detailsCSS.conteneurGlobal}>
                <div className={detailsCSS.conteneurG}>
                    {auth ? <PanierTotal /> : <ConnectezVous />}
                    <PrenezRendezVous />
                    <Accordeon />
                </div>
                <div >
                    <div className={detailsCSS.blocEntete1}>
                        <div className={detailsCSS.entete1}>
                            <p className={detailsCSS.pName}>Plus de détails</p>
                        </div>
                    </div>
                    {/* <div className={detailsCSS.contientConteneurD}> */}
                    <div className={detailsCSS.conteneurD}>
                        <div className={detailsCSS.conteneurIMG}>

                            {/* "noopener" indique au navigateur d’ouvrir un lien dans un nouvel onglet sans fournir d’accès au document qui a ouvert le lien. 
                                window.opener est automatiquement définie sur null. 
                                C'est fait pour empêcher les attaques de phishing ou prise de contrôle. */}
                            {/* window.opener représente la fenêtre qui a ouvert celle dans laquelle se trouve se code. */}
                            {/* "noreferrer" empêche le site nouvellement ouvert d’obtenir des informations sur l’origine du trafic.
                                C'est fait pour fausser les chiffres de trafic */}
                            <div>{item.picture && item.picture.img &&
                                <a href={item.picture.img} target="_blank" rel="noopener noreferrer">
                                    <img
                                        tabIndex="0"
                                        className={detailsCSS.imageDetail1}
                                        src={item.picture.img}
                                        alt={item.name} /></a>}</div>

                            <div className={detailsCSS.contientIMG2}>
                                {item.picture && item.picture.img &&
                                    <a href={item.picture.img2} target="_blank" rel="noopener noreferrer">
                                        <img
                                            tabIndex="0"
                                            className={detailsCSS.imageDetail2}
                                            src={item.picture.img2}
                                            alt={item.name} /></a>}</div>
                        </div>
                        <div className={detailsCSS.conteneurDetails}>
                            <p className={detailsCSS.nomProduit}>{item.name}</p>
                            <div className={detailsCSS.conteneurDetailsProduits}>
                                <div className={detailsCSS.detailsProduitG}>
                                    <p>Largeur : </p>
                                    <p>Couleur : </p>
                                    <p>Autre : </p>
                                    <p>Motifs : </p>
                                    <p>Collection : </p>
                                    <p>Stock : </p>
                                </div>
                                <div className={detailsCSS.detailsProduitD}>
                                    <p>{item.width} cm</p>
                                    <p>{item.color}</p>
                                    <p>{item.content}</p>
                                    <p>{item.detail}</p>
                                    <p>{item.category}</p>
                                    <p>{item.stock}</p>
                                </div>
                            </div>
                            <p className={detailsCSS.pPrix}>{item.price} €</p>
                            <div className={detailsCSS.contientBtnAjout}>
                                <button onClick={() => ajouterArticle(item)} className={detailsCSS.btnAjout}>Ajouter au panier</button>
                                <Link to={{ pathname: "/" }}><button className={detailsCSS.btnRevenir}>Revenir à la boutique</button></Link>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Details