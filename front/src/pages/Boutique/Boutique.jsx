import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import boutique from "./Boutique.module.css"
import { URL } from "../../utils/Constantes.jsx";

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
    const { incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, panier, prixTotal } = useContext(PanierContext)

    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    const [itemsAffiches, setItemsAffiches] = useState(8)




    // SELECT - c'est la valeur du filtre de collection (on démarre avec une chaîne vide)
    const [selectionCollection, setSelectionCollection] = useState("")
    const [selectionPrix, setSelectionPrix] = useState("")
    const [selectionLargeur, setSelectionLargeur] = useState("")
    const [selectionCouleur, setSelectionCouleur] = useState("")

    // VALEURS UNIQUES POUR FILTRAGE
    const [collections, setCollections] = useState([])
    const [prix, setPrix] = useState([])
    const [largeurs, setLargeurs] = useState([])
    const [couleurs, setCouleurs] = useState([])



    useEffect(() => { // On appelle la fonction "depart" qui déclenche mon action Redux pour indiquer qu'il n'y a pas encore de données (ITEM.DEPART)
        const depart = async () => {
            if (URL.ITEM_ALL) {
                try {
                    const response = await axios.get(URL.ITEM_ALL);
                    setItems(response.data);

                    // On extrait les valeurs de chaque collection (category).
                    // "Set" est un objet JS qui stocke uniquement les valeurs uniques en supprimant les doublons.
                    // La fonction map parcours tous les "item" récupérés et en extrait la category, qui sont ensuite stockés dans "collections", qui appartient à la même lignée que "setCollections"
                    setCollections([...new Set(response.data.map(item => item.category))].sort((a, b) => b - a))
                    setPrix([...new Set(response.data.map(item => item.price))].sort((a, b) => a - b))
                    setLargeurs([...new Set(response.data.map(item => item.width))].sort((a, b) => a - b))
                    setCouleurs([...new Set(response.data.map(item => item.color))].sort())

                } catch (error) {
                    console.log("Erreur lors de l'appel API", error)
                    setError(error.message);
                }
            }
        };
        depart();
    }, []);


    // On créer une fonction de filtrage pour les items en fonction de l'option sélectionnée.
    // Avec filter, on va créer un nouveau tableau contenant seulement les éléments "items" qui passent le test de filtrage :
    const filtreItems = items.filter(item => {
        // Si "selectionCollection" (qui contient la valeur de la catégorie sélectionnée) a une valeur définie et si cette valeur n'est pas une chaîne vide (car si aucun champ n'est sélectionné, alors c'est une chaîne vide).
        // Si la condition précédente est true, alors on compare la catégorie de l'item avec la catégorie sélectionnée (convertie en nombre car selectCollections est une chaîne de caractère, or, "category" est un nombre.)
        // Si aucune collection n'a été sélectionnée, alors la partie après ":" est exécutée et on retourne simplement "true", ce qui affiche donc tous les items par défauts.
        const testCollection = selectionCollection && selectionCollection !== "" ? item.category === Number(selectionCollection) : true;
        const testLargeur = selectionLargeur && selectionLargeur !== "" ? item.width === Number(selectionLargeur) : true;
        const testCouleur = selectionCouleur ? item.color === selectionCouleur : true;
        const testPrix = selectionPrix && selectionPrix !== "" ? item.price === Number(selectionPrix) : true;

        return testCollection && testPrix && testLargeur && testCouleur
    }
    )


    // On utilise "..." pour créer un nouveau tableau à partir de l'objet Set (qui supprime les doublons)
    // On extrait toutes les valeurs de la prop category de chaque objet item dans filtreItems.
    // "map" créé un nouveau tableau où chaque élément est le résultat de l'exécution de la fonction fournie sur chaque élément de filtreItems. C'est ce qui rend les filtres dynamiques en focntion de ce qui est cliqué
    const collectionDisponible = [...new Set(filtreItems.map(item => item.category))].sort((a, b) => b - a);
    const prixDisponible = [...new Set(filtreItems.map(item => item.price))].sort((a, b) => a - b);
    const largeurDisponible = [...new Set(filtreItems.map(item => item.width))].sort((a, b) => a - b);
    const couleurDisponible = [...new Set(filtreItems.map(item => item.color))].sort();



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
    };

    const handleLargeur = (event) => {
        const largeurValue = event.target.value;
        if (largeurValue === "Largeur") {
            setSelectionLargeur("");
        } else {
            setSelectionLargeur(largeurValue);
        }
    };

    const handleCouleur = (event) => {
        const couleurValue = event.target.value; // On récupère la valeur de l'option sélectionnée dans le menu
        if (couleurValue === "Couleur") { // Si l'option sélectionnée est "couleur" alors on réinitialise le filtre, sinon, on maintient sur la valeur déjà sélectionnée.
            setSelectionCouleur("");
        } else {
            setSelectionCouleur(couleurValue);
        }
    };



    const resetFiltre = () => {
        setSelectionCollection("")
        setSelectionPrix("")
        setSelectionLargeur("")
        setSelectionCouleur("")
    }



    if (error) return <> <p>{error}</p> </>

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
                            <select
                                className={boutique.selectEntete}
                                name="width"
                                id="width"
                                value={selectionLargeur}
                                onChange={handleLargeur}>
                                <option onClick={resetFiltre}>Largeur</option>
                                {largeurDisponible.map(largeur => (
                                    <option key={largeur} value={largeur}>{largeur} cm</option>
                                ))}
                            </select>
                            <select
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
                            <select
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
                            <select
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
                        {/* On appelle ici la fonction de filtrage pour les items en fonction de l'opti,on sélectionnée. */}
                        {filtreItems.slice(0, itemsAffiches).map(item => (
                            <div className={boutique.carte} key={item._id}>
                                <div className={boutique.contientDivImg}>
                                    <Link className={boutique.imgCliquable} to={{ pathname: `/details/${item._id}` }}>
                                        <div className={boutique.divImg}>
                                            <div className={boutique.divApercuImg}>
                                                <img className={boutique.apercuImg} src={item.picture.img} alt={item.name} />
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
                                        <Link className={boutique.btnCliquable} to={{ pathname: `/details/${item._id}` }}>
                                            <button className={boutique.buttonDetails}>Plus de détails</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {itemsAffiches < filtreItems.length && (
                            <div className={boutique.divBtnToutVoir}>
                                <button tabIndex={0} className={boutique.toutVoir} onClick={() => setItemsAffiches(itemsAffiches.length)}>Tout voir</button>
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