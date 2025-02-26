import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { URL } from '../../utils/Constantes'
import items from "../Dashboard/css/items.module.css"
import { toast } from 'react-toastify'


const CommandeUpdate = () => {

  const { id } = useParams();
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
      try {
        const response = await axios.get(`${URL.COMMANDE_BY_ID}/${id}`)
        setCommande(response.data)
        const data = response.data

        // On créé un nouveau tableau upPanier qui est une version mise à jour de data.panier.
        // Chaque élément "item" est modifié pour inclure le champ calculé "totalPrice"
        const upPanier = data.panier.map(item => ({
          ...item,
          totalPrice: item.price * item.quantity
        }));

        // On calcule maintenant le prix total de la commande en utilisant reduce. On additionne ici les totalPrice de chaque article pour obtenir le "upPrixTotal"
        const upPrixTotal = upPanier.reduce((total, item) => total + item.totalPrice, 0);

        // On met le state commande à jour 
        // "...data" permet de conserver toutes les autres propriétés de la commande d'origine sans les écraser.
        setCommande({
          ...data,
          panier: upPanier, // On incorpore les informations de upPanier
          prixTotal: upPrixTotal
        })


      } catch (error) {
        console.error("Erreur lors de la recherche de la commande", error);
      }
    };
    commandeById()
  }, [id]) // L'effet se déclenche chaque fois que la valeur de l'ID change. 



  const handleChange = (event, index) => {
    // "event.target" est l'élément sur le DOM qui a déclenché l'évènement.
    // "name" : attribut name de l'input
    // "value" : la valeur qui est en train d'être saisie par l'utilisateur.
    const { name, value } = event.target

    // On met à jour le state commande en incorporant le nouveau statut.
    // "...commande" permet de conserver toutes les autres propriétés d'origine sans qu'elles soient écrasées par les nouvelles.
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

      // On utilise reduce pour recalculer le prixTotal
      // reduce parcourt tous les éléments du panier et additionne leur totalPrice pour obtenir le prixTotal
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
    const updateCommande = {
      ...commande,
      panier: commande.panier,
      prixTotal: commande.prixTotal,
      statut: commande.statut
    }
    console.log("Réponse avant envoie", updateCommande)

    try {
      const response = await axios.put(`${URL.COMMANDE_UPDATE}/${id}`, updateCommande)
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
              onChange={handleChange}
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
            onChange={handleChange}
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