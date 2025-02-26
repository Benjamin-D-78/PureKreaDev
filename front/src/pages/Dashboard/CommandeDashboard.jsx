import React from 'react';
import { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import items from "./css/items.module.css"
import { URL } from '../../utils/Constantes';

// ICONES
import supprimer from "../../images/Icones/supprimer.png"
import modifier from "../../images/Icones/modifier.png"
import profil from "../../images/Icones/profil.png"

const CommandeDashboard = () => {

  const [commandes, setCommandes] = useState([]);
  const [error, setError] = useState(null);

  const deleteCommande = async (id) => {
    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth);

    if (auth.role === "admin") {
      try {
        const response = await axios.delete(`${URL.COMMANDE_DELETE}/${id}`, { withCredentials: true })
        if (response.status === 200) {
          console.log(response)
          toast.success("Commande supprimée avec succès.", { autoClose: 1000 })
          setCommandes((prevCommandes) => prevCommandes.filter((user) => commandes._id !== id))
          // On met à jour le state local en retirant de la liste la commande supprimée.
        }
      } catch (error) {
        console.log("Erreur lors de la suppression de la commande", error)
        toast.error("Erreur lors de la suppression de la commande.", { autoClose: 3000 })
      }
    }
  }

  const depart = async () => {
    try {
      const response = await axios.get(URL.COMMANDE_ALL)
      setCommandes(response.data)
    } catch (error) {
      console.log("Erreur lors du chargement des commandes.", error)
      setError(error.message)
    }
  };
  useEffect(() => { depart() }, [])

  return (
    <div>
      <h1 className={items.h1}>Liste des commandes</h1>
      <table className={boutique_dashboard.tableItem}>
        <thead>
          <tr className={boutique_dashboard.enteteItem}>
            <th className={boutique_dashboard.th}>Article(s)</th>
            <th className={boutique_dashboard.th}>Quantité</th>
            <th className={boutique_dashboard.th}>Prix</th>
            <th className={boutique_dashboard.thCache}>N° Commande</th>
            <th className={boutique_dashboard.thCache}>Commentaire</th>
            <th className={boutique_dashboard.thCache}>Date</th>
            <th className={boutique_dashboard.th}>Statut</th>
            <th className={boutique_dashboard.thButton}><button className={boutique_dashboard.refreshItems} onClick={depart}>Raffraîchir</button></th>
          </tr>
        </thead>
        <tbody>
          {commandes.map(commande => (
            <tr key={commande._id}>
              <td className={boutique_dashboard.autresTD}>
                {commande.panier.map(item => (
                  <React.Fragment key={item.itemId}>
                    {item.name}
                    <br />
                  </React.Fragment>))}</td>
              <td className={boutique_dashboard.autresTD}>
                {commande.panier.map(item => (
                  <React.Fragment key={item.itemId}>
                    {item.quantity}
                    <br />
                  </React.Fragment>))}</td>
              <td className={boutique_dashboard.autresTD}>{commande.prixTotal} €</td>
              <td className={boutique_dashboard.autresTDcache}>{commande._id}</td>
              <td className={boutique_dashboard.autresTDcache}>{commande.comment}</td>
              <td className={boutique_dashboard.autresTDcache}>{new Date(commande.date).toLocaleDateString()}</td>
              <td className={boutique_dashboard.autresTD}>{commande.statut}</td>
              <td className={boutique_dashboard.boutonsTD}>
                <div className={boutique_dashboard.contientIMG}>
                  <Link to={{ pathname: `/dashboard/commande/utilisateur/${commande.userId}` }}><img src={profil} alt="Icone de modification" /></Link>
                  <Link to={{ pathname: `/dashboard/update/commande/${commande._id}` }}><img src={modifier} alt="Icone de modification" /></Link>
                  <img onClick={() => deleteCommande(commande._id)} src={supprimer} alt="Icone de suppression" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default CommandeDashboard