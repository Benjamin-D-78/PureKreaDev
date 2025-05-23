import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import items from "../Dashboard/css/items.module.css"
import { toast } from 'react-toastify'

// EXTERNALISATION
import axiosInstance from '../../utils/axiosInstance'
import { URL } from '../../utils/constantes'

const CommandeUpdate = () => {

  const { id } = useParams();
  const {auth} = useContext(AuthContext)
  const navigate = useNavigate();
  const [commande, setCommande] = useState({
    userId: "",
    panier: [],
    prixTotal: "",
    comment: "",
    statut: "",
  })

  useEffect(() => {
    const commandeById = async () => {
      if (auth && auth.role === "admin") {
        try {
          const response = await axiosInstance.get(`${URL.COMMANDE_BY_ID}/${id}`)
          setCommande(response.data)

        } catch (error) {
          console.error("Erreur lors de la recherche de la commande", error);
          console.log("Erreur lors de la recherche de la commande", error);
        }
      };
    }
    commandeById()
  }, [auth, id])


  // SI LE STATUT EST CHANGE, ON VA LE VOIR DYNAMIQUEMENT
  // SI LA QUANTITE OU LE PRIX D'UN ARTICLE CHANGE, ON ACTUALISE LE NOUVEAU PRIX PAR RAPPORT A LA QUANTITE OU VICE VERSA EN TEMPS REEL
  const handleChange = (event, index) => {
    const { name, value } = event.target
    // On met juste à jour le "statut" si le statut est changé
    if (name === "statut") {
      setCommande({
        ...commande,
        statut: value
      });
    } else {
      // On créé une copie du tableau panier pour le modifier sans changer directement l'état
      const updatePanier = [...commande.panier];
      // On sélectionne l'élément du panier à l'index (index étant l'élément qui a été modifié par l'utilisateur)
      const updateItem = updatePanier[index];


      if (name === "quantity" || name === "price") {
        // "updateItem[name] = value" : On met à jour la quantité ou le prix de l'élément du panier
        updateItem[name] = value;
        // On recalcule le totalPrice pour chaque item
        updateItem.totalPrice = updateItem.price * updateItem.quantity;
      }
      // On recalcule le prix global total.
      const updatePrixTotal = updatePanier.reduce((total, item) => total + item.totalPrice, 0)

      // On met à jour le state commande
      setCommande({
        ...commande,
        panier: updatePanier,
        prixTotal: updatePrixTotal
      })
    }
  }



  const handleSubmit = async (event) => {
    event.preventDefault();

    // On envoie la commande mise à jour en conservant les propriétés déjà existantes sans qu'elles écrasées.
    const updateCommande = { ...commande }
    // console.log("Réponse avant envoie", updateCommande)

    try {
      const response = await axiosInstance.put(`${URL.COMMANDE_UPDATE}/${id}`, updateCommande)
      console.log("Réponse de l'API", response.data)
      if (response.status === 200) {
        navigate("/dashboard/commande")
        toast.success("Commande mise à jour avec succès.", { autoClose: 1000 })
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande.", error)
      toast.error("Erreur lors de la mise à jour de la commande.", { autoClose: 3000 })
    }
  }


  return (
    <div>
      <h1 className={items.h1}>Modifier une commande</h1>
      <form onSubmit={handleSubmit}>
        {Array.isArray(commande.panier) && commande.panier.map((item, index) => (
          <div key={item.itemId} className={items.div1}>
            <h2 className={items.h2}>{item.name}</h2>
            <label htmlFor="quantity">Quantité :</label>
            <input
              className={items.inputItem}
              type="number"
              name='quantity'
              value={item.quantity}
              // event contient les infos du champ (name, value, etc.)
              // index permet de savoir quel élément du panier je modifie
              onChange={(event) => handleChange(event, index)} />
            <label htmlFor="price">Prix :</label>
            <input
              className={items.inputItem}
              type="number"
              name='price'
              value={item.price}
              onChange={(event) => handleChange(event, index)} />
            <label htmlFor="totalPrice">Prix total :</label>
            <input
              className={items.inputItem}
              type="number"
              name='totalPrice'
              value={item.quantity * item.price}
              // onChange={handleChange}
              readOnly />
          </div>
        ))}

        <div className={items.div1}>
          <label htmlFor="prixTotal">Prix total :</label>
          <input
            className={items.inputItem}
            type="number"
            name='prixTotal'
            value={commande.prixTotal}
            // onChange={handleChange}
            readOnly />
          <label htmlFor="statut">Statut :</label>
          <select
            name="statut"
            id="statut"
            onChange={handleChange} >
            <option>{commande.statut}</option>
            <option>En attente</option>
            <option>Validée</option>
            <option>Refusée</option>
            <option>Annulée</option>
            <option>Expédiée</option>
          </select>
          <div className={items.divBtnAjouter}>
            <button className={items.boutonItemUP}>Mettre à jour</button>
          </div>
        </div>
      </form >
    </div >
  )
}

export default CommandeUpdate