import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import boutique from "./Boutique.module.css"
import { URL } from "../../utils/constantes.js";
import axiosInstance from "../../utils/axiosInstance.js";

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PanierTotal from "../../components/PanierSynthèse/visuelPanier.jsx";
import ConnectezVous from "../../components/ConnectezVous/connectezVous.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";

// ICONES & IMAGES
import iconePanier from "../../images/Icones/paniers.png"
import raffraichir from "../../images/Icones/raffraichir.svg"

// CONTEXT
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanierContext } from "../../context/PanierContext.jsx";


const Boutique = () => {

    const { auth } = useContext(AuthContext)
    const { ajouterArticle } = useContext(PanierContext)

    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    const [itemsAffiches, setItemsAffiches] = useState(8)
    const [loading, setLoading] = useState(true)

    // Pour récupérer les valeurs sélectionnées
    const [selectionCollection, setSelectionCollection] = useState("")
    const [selectionPrix, setSelectionPrix] = useState("")
    const [selectionLargeur, setSelectionLargeur] = useState("")
    const [selectionCouleur, setSelectionCouleur] = useState("")


    useEffect(() => {
        const depart = async () => {
            if (URL.ITEM_ALL) {
                try {
                    const response = await axiosInstance.get(URL.ITEM_ALL);

                    if (Array.isArray(response.data)) { // "isArray" est une méthode spécifique de Array
                        setItems(response.data);
                    }
                    setLoading(false)
                } catch (error) {
                    console.log("Erreur lors de l'appel API", error)
                    setError(error.message);
                    setLoading(false)
                }
            }
        };
        depart();
    }, []);


     // ME PERMET DE RECUPERER LA VALEUR SELECTIONNEE EN TEMPS REEL
     const handleCollection = (event) => {
        const collectionValue = event.target.value;
        if (collectionValue === "Collection") {
            setSelectionCollection("");
        } else {
            setSelectionCollection(collectionValue);
        }
    }
    const handlePrix = (event) => {
        const prixValue = event.target.value;
        if (prixValue === "Prix") {
            setSelectionPrix("");
        } else {
            setSelectionPrix(prixValue);
        }
    }
    const handleLargeur = (event) => {
        const largeurValue = event.target.value;
        if (largeurValue === "Largeur") {
            setSelectionLargeur("");
        } else {
            setSelectionLargeur(largeurValue);
        }
    }
    const handleCouleur = (event) => {
        const couleurValue = event.target.value;
        if (couleurValue === "Couleur") {
            setSelectionCouleur("");
        } else {
            setSelectionCouleur(couleurValue);
        }
    }

    const resetFiltre = () => {
        setSelectionCollection("")
        setSelectionPrix("")
        setSelectionLargeur("")
        setSelectionCouleur("")
    }


    // JE CREE UN FILTRE DYNAMIQUE EN TEMPS REEL, QUI FILTRE LES VALEURS CONTENUES DANS "ITEMS" DANS UN TABLEAU
    // EN FONCTION DE CE QUI EST SELECTIONNE DANS LE SELECT ET STOCKE DANS "selectionCollection", "selectionLargeur", etc.
    // On applique plusieurs valeur de filtrage conditionnelles
    const filtreItems = Array.isArray(items) ? items.filter(item => {

        const testCollection = selectionCollection ? item.category === Number(selectionCollection) : true; // "true" = accepte tout
        const testLargeur = selectionLargeur ? item.width === Number(selectionLargeur) : true;
        const testCouleur = selectionCouleur ? item.color === selectionCouleur : true;
        const testPrix = selectionPrix ? item.price === Number(selectionPrix) : true;

        return testCollection && testPrix && testLargeur && testCouleur
    }
    ) : [];


    // SERT JUSTE POUR LES VALEURS DISPONIBLES DANS LE SELECT EN TEMPS REEL
    // Je veux extraire toutes les valeurs de "category" via "item.category" donc on les map
    // "Set" permet de supprimer les doublons mais renvoie un objet.
    // Je fais donc une copie de "new" avec le spread operator et met le tout entre crochet pour obtenir un tableau et y appliquer le ".sort"
    const collectionDisponible = [...new Set(filtreItems.map(item => item.category))].sort((a, b) => b - a);
    const prixDisponible = [...new Set(filtreItems.map(item => item.price))].sort((a, b) => a - b);
    const largeurDisponible = [...new Set(filtreItems.map(item => item.width))].sort((a, b) => a - b);
    const couleurDisponible = [...new Set(filtreItems.map(item => item.color))].sort();


    if (error) return <> <p>{error}</p> </>
    if (loading) return <p className="text-center">En cours de chargement</p>


    return (
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Boutique</h1>

            <div className={boutique.conteneurGlobal}>
                <div className={boutique.conteneurG}>
                    {auth ? <PanierTotal /> : <ConnectezVous />}
                    <PrenezRendezVous />
                    <Accordeon />
                </div>

                <div className={boutique.conteneurDH}>
                    <div className={boutique.blocEntete1}>
                        <div className={boutique.entete1}>
                            <p className={boutique.pStock}>Toutes nos cravates</p>
                        </div>

                        <div className={boutique.conteneurSelect}>
                            {/* <div className={boutique.refresh}> */}
                            <img className={boutique.refresh} onClick={resetFiltre} src={raffraichir} alt="réinitialisation des filtres" />
                            {/* </div> */}
                            <label for="width" className="sr-only">Choisissez la largeur :</label>
                            <select
                                aria-label="Sélectionnez une classe de produits par sa largeur."
                                className={boutique.selectEntete}
                                name="width"
                                id="width"
                                value={selectionLargeur}
                                onChange={handleLargeur}>
                                <option>Largeur</option>
                                {largeurDisponible.map(largeur => (
                                    <option key={largeur} value={largeur}>{largeur} cm</option>
                                ))}
                            </select>
                            <label for="color" className="sr-only">Choisissez la couleur :</label>
                            <select
                                aria-label="Sélectionnez une classe de produits par sa couleur."
                                className={boutique.selectEntete}
                                name="color"
                                id="color"
                                value={selectionCouleur}
                                onChange={handleCouleur}>
                                <option>Couleur</option>
                                {couleurDisponible.map(couleur => (
                                    <option key={couleur} value={couleur}>{couleur}</option>
                                ))}

                            </select>
                            <label for="price" className="sr-only">Choisissez la tranche de prix :</label>
                            <select
                                aria-label="Sélectionnez une classe de produits par son prix."
                                className={boutique.selectEntete}
                                name="price"
                                id="price"
                                value={selectionPrix}
                                onChange={handlePrix}>
                                <option >Prix</option>
                                {prixDisponible.map(pri => (
                                    <option key={pri} value={pri}>{pri} €</option>
                                ))}
                            </select>
                            <label for="category" className="sr-only">Choisissez la catégorie :</label>
                            <select
                                aria-label="Sélectionnez une classe de produits par son année de collection."
                                className={boutique.selectEntete}
                                name="category"
                                id="category"
                                value={selectionCollection}
                                onChange={handleCollection}>
                                <option>Collection</option>
                                {/* "collections" stocke les différentes valeurs unique de category */}
                                {collectionDisponible.map(collection => (
                                    <option key={collection} value={collection}>{collection}</option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <div className={boutique.conteneurCartes}>
                        {/* On appelle ici la fonction de filtrage pour les items en fonction de l'opti,on sélectionnée */}
                        {/* SLice 0 car on commence à afficher à partir de l'item 0 */}
                        {filtreItems?.filter(item => item.stock > 0).slice(0, itemsAffiches).map(item => (
                            <div className={boutique.carte} key={item._id}>
                                <div className={boutique.contientDivImg}>
                                    <Link className={boutique.imgCliquable} to={{ pathname: `/details/${item._id}` }}>
                                        <div className={boutique.divImg}>
                                            <div className={boutique.divApercuImg}>
                                                <img className={boutique.apercuImg} src={item.picture.img} alt={item.name} loading="lazy" />
                                                <p className={boutique.pRef}>{item.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className={boutique.apercuCravate}>
                                    <div className={boutique.divContientPrix}>
                                        <p className={boutique.apercuPrix}>{item.price} €</p>
                                    </div>
                                    <div className={boutique.divIconAchat}>
                                        <img onClick={() => ajouterArticle(item)} className={boutique.iconeAchat} src={iconePanier} alt="icone panier" />
                                    </div>
                                    <div className={boutique.divButtonDetails}>
                                        <Link className={boutique.linkDetails} to={{ pathname: `/details/${item._id}` }}>Plus de détails</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {itemsAffiches < filtreItems.length && (
                            <div className={boutique.divBtnToutVoir}>
                                <button tabIndex={0} className={boutique.toutVoir} onClick={() => setItemsAffiches(item => item + 8)}>Voir plus</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Boutique;


    // Me permet de réceptionner les valeurs uniques pour les utiliser ensuite dans la fonction de filtrage
    // const [collections, setCollections] = useState([])
    // const [prix, setPrix] = useState([])
    // const [largeurs, setLargeurs] = useState([])
    // const [couleurs, setCouleurs] = useState([])

    
    // Je veux extraire toutes les valeurs de "category" via "item.category" donc on les map
    // "Set" permet de supprimer les doublons mais renvoie un objet.
    // Je fais donc une copie de "new" avec le spread operator et met le tout entre crochet pour obtenir un tableau et y appliquer le ".sort"
    // setCollections([...new Set(response.data.map(item => item.category))].sort((a, b) => b - a))
    // setPrix([...new Set(response.data.map(item => item.price))].sort((a, b) => a - b))
    // setLargeurs([...new Set(response.data.map(item => item.width))].sort((a, b) => a - b))
    // setCouleurs([...new Set(response.data.map(item => item.color))].sort())