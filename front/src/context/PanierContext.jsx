import { createContext, useState, useEffect, useContext } from "react";
import { debounce } from "lodash"
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../utils/constantes";
import { RGXR } from "../utils/regex";
import { ERROR } from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export const PanierContext = createContext()

export const PanierProvider = ({ children }) => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();

    const [panier, setPanier] = useState([]);
    const [prixTotal, setPrixTotal] = useState(0);
    const [commentaire, setCommentaire] = useState("");
    const [verification, setVerification] = useState(false)
    const [idCommande, setIdCommande] = useState("");

    // RECUPERATION DU PANIER DANS LE LOCAL STORAGE
    useEffect(() => {
        const loadPanier = async () => {
            try {
                const userId = auth ? auth._id : null

                if (userId) {
                    // On récupère les données stockées dans le localStorage sous la clé "panier", puis on vérifie si les données existent dans le localStorage.
                    const panierJSON = await localStorage.getItem(`panier${userId}`);
                    if (panierJSON !== null) {
                        const panierStorage = JSON.parse(panierJSON); // On convertit les données (chaîne de caractères) en objet JS.
                        setPanier(panierStorage);
                    }
                }
            } catch (error) {
                console.log("Echec lors du chargement des données : ", error)
            }
        };
        loadPanier();
    }, [auth])


    // CALCUL DU PRIX TOTAL DU PANIER A CHAQUE MODIFICATION DU PANIER
    useEffect(() => {
        let total = 0;
        panier.forEach(item => {
            const itemPrice = parseFloat(item.price);
            const itemQuantite = parseInt(item.quantite, 10); // 10 pour "0 à 9"

            // On vérifie que nos données soient des nombres valides.
            if (!isNaN(itemPrice) && !isNaN(itemQuantite)) {
                total += itemPrice * itemQuantite;
            }
        });
        setPrixTotal(parseFloat(total.toFixed(2)));
    }, [panier]);



    // CREATION DU PANIER DANS LE LOCALSTORAGE
    const sauvegardePanier = debounce((nouveauPanier) => { // "debounce" sert à retarder l'exécution de la fonction "sauvegardePanier" jusqu’à ce qu’il n’y ait plus de nouvelles modifications pendant (ici) 1 seconde.
        const userId = auth ? auth._id : null
        if (userId) {
            localStorage.setItem(`panier${userId}`, JSON.stringify(nouveauPanier)) // on converti l'objet JS en chaîne de carac' au format json car le localstorage ne stocke que des chaînes de caractères
        }
    }, 1000); // On sauvegarde le panier qu'après X millisecondes sans modification


    // TOTAL D'ARTICLES AU PANIER
    const totalArticle = () => {
        let totalArticle = 0;
        panier.forEach(item => totalArticle += item.quantite);
        return totalArticle;
    }

    // PRIX TOTAL
    const prixParQuantite = (price, quantity) => {
        const resultat = price * quantity
        return parseFloat(resultat.toFixed(2))
    }


    const incremente = (index) => {
        const nouveauPanier = [...panier]
        nouveauPanier[index].quantite++ //index fait référence à l'index dans le tableau panier
        setPanier(nouveauPanier)
        sauvegardePanier(nouveauPanier)
    }


    const decremente = (index) => {
        const nouveauPanier = [...panier]
        if (nouveauPanier[index].quantite > 1) {
            nouveauPanier[index].quantite--
            setPanier(nouveauPanier)
            sauvegardePanier(nouveauPanier)
        }
    }

    // CHANGEMENT DE QUANTITE
    const changerQuantite = (index, nouvelleQuantite) => {
        const nouveauPanier = [...panier];
        nouveauPanier[index].quantite = nouvelleQuantite;
        setPanier(nouveauPanier);
        sauvegardePanier(nouveauPanier);
    }

    // RETIRER UN ARTICLE
    const retirerArticle = (index) => {
        const nouveauPanier = [...panier]
        nouveauPanier.splice(index, 1) // litérallement : "supprime 1 élément à l'index (l'item) donné"
        setPanier(nouveauPanier)
        sauvegardePanier(nouveauPanier)
    }


    // AJOUTER UN ARTICLE
    const ajouterArticle = async (product) => {
        try {
            if (!auth) {
                navigate("/connexion")
            }

            const userId = auth ? auth._id : null;
            if (userId) {
                const panier = await localStorage.getItem(`panier${userId}`);
                let nouveauPanier = [];

                // Si le panier existe déjà, on le converti en tableau d'objet.
                if (panier !== null) {
                    nouveauPanier = JSON.parse(panier);

                    // On vérifie si l'article sélectionné existe déjà dans le panier. Si c'est le cas, on augmente la quantité de 1 sinon on ajoute l'article dans le panier.
                    const articleTrouve = nouveauPanier.find(item => item._id === product._id);

                    if (articleTrouve) {
                        if (articleTrouve.quantite < product.stock) {
                            articleTrouve.quantite += 1;
                        } else {
                            toast.error("Le stock maximum a été atteint pour cet article.", { autoClose: 1000 })
                        }
                    } else {
                        nouveauPanier.push({ ...product, quantite: 1 }); // Je copie le produit en question et y ajoute la quantité à 1
                    }
                } else {
                    nouveauPanier.push({ ...product, quantite: 1 });
                } // On enregistre maintenant le nouveau panier dans le localStorage :
                sauvegardePanier(nouveauPanier)
                setPanier(nouveauPanier);
            }
        } catch (error) {
            console.log("Erreur lors de l'actualisation du panier : ", error);
        }
    }

    // VIDER LE PANIER
    const videPanier = () => {
        setPanier([]);
        const userId = auth ? auth._id : null;
        if (userId) {
            localStorage.removeItem(`panier${userId}`)
        }
    }

    // VALIDER LA COMMANDE
    const validerCommande = async () => {
        try {
            if (panier.length === 0) {
                toast.error("Votre panier est vide. Veuillez ajouter des articles pour pouvoir passer commande.");
                return;
            }

            if (!verification){
                toast.error("Vous devez accepter nos CGV pour pouvoir passer commande.");
                return;
            }

            if (commentaire) {
                const regexComment = RGXR.CONTENT
                if (!regexComment.test(commentaire) || commentaire.length < 2 || commentaire.length > 500) {
                    toast.error(ERROR.U_CONTENT);
                    return;
                }
            }

            // On calcule le prix total du panier en ajoutant le prix total pour chaque article
            const panierTotal = panier.map(item => ({
                ...item, // Pour chaque item du tableau "panier" on retourne un nouvel objet. Comme ça on garde toutes les propriétés originales sans les modifier.
                totalPrice: item.price * item.quantite  // Pour chaque item on ajoute une propriété "totalPrice" qui calcule le prix de l'article multiplié par la quantité.
            }));

            // On calcule le prix total de la commande :
            // reduce réduit la tableau à une seule valeur en appliquant une fonction itérée à chaque élément du tableau
            // 0 indique que la valeur de total commencera à 0 à la première itération.
            const prixTotal = panierTotal.reduce((total, item) => total + item.totalPrice, 0);

            // On créé notre objet de commande à envoyer à notre back.
            const commandeData = {
                userId: auth._id,
                panier: panierTotal.map(item => ({
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantite,
                    totalPrice: item.totalPrice // On ajoute le prix total calculé pour l'article
                })),
                total: prixTotal,  // prix total de la commande.
                comment: commentaire,
                statut: "En attente",
                verification: true
            };

            const response = await axiosInstance.post(URL.COMMANDE_CREATION, commandeData);

            if (response.status === 201) {
                toast.success("Commande validée avec succès!", { autoClose: 2000 });
                // console.log(response)
                const id = response.data._id

                for (let item of panier) {
                    try {
                        const majStock = await axiosInstance.put(`${URL.ITEM_STOCK}/${item._id}`, {stock: item.stock - item.quantite})
                        // if(majStock.status === 200){
                        //     console.log("Stock des items mis à jour avec succès.")
                        // }
                    } catch (error) {
                        console.error("Erreur lors de la mise à jour du stock : ", item.name, error)
                    }
                }
                setPanier([]) // On vide le panier

                // On supprime le panier dans le localStorage pour l'utilisateur
                const userId = auth ? auth._id : null
                if (userId) {
                    localStorage.removeItem(`panier${userId}`)
                }

                setIdCommande(id)
            }

        } catch (error) {
            console.error("Erreur lors de la validation de la commande:", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.", { autoClose: 3000 });
        }
    };

    // REDIRECTION SUR LA PAGE DE CONFIRMATION
    useEffect(() => {
        if (idCommande) {
            // On s'assure ensuite que le localStorage est bien vide avant de rediriger, d'où le temps de latence avec SetTimeOut. On attend 500 millisecondes.
            setTimeout(() => {
                navigate(`/commande/paiement/confirmation/${idCommande}`);
                //Je suis obligé de réinitialiser la valeur de idCommande sinon je rentre dans une boucle infinie.
                setIdCommande("");
            }, 500)
        }
    }, [idCommande, navigate]) // On précise navigate par précaution, pour éviter des comportaments innatendus lors d'une MAJ de navigate. (en gros : sinon ça bug)



    return (
        <PanierContext.Provider value={{ incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, changerQuantite, videPanier, validerCommande, commentaire, setCommentaire, verification, setVerification, setPanier, setIdCommande, panier, prixTotal }} >
            {children}
        </PanierContext.Provider>
    )
}