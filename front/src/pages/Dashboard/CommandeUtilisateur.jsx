import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../../utils/Constantes';
import axios from "axios"
import items from "../Dashboard/css/items.module.css"


const CommandeUtilisateur = () => {

  const { id } = useParams();
  const [utilisateur, setUtilisateur] = useState({});

  useEffect(() => {
    const userById = async () => {
      try {
        const response = await axios.get(`${URL.USER_BY_ID}/${id}`)
        setUtilisateur(response.data)
      } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur.")
      }
    };
    userById();
  }, [id])

  return (
    <div>
      <h1 className={items.h1}>Profil utilisateur</h1>
      <div className={items.div1}>
        <label>Prénom :</label>
        <p className={items.pUtilisateur}>{utilisateur.firstname}</p><br />
        <label>Nom :</label>
        <p className={items.pUtilisateur}>{utilisateur.lastname}</p><br />
        <label>Adresse :</label>
        <p className={items.pUtilisateur}>{utilisateur.adress}</p><br />
        <label>CP :</label>
        <p className={items.pUtilisateur}>{utilisateur.postal}</p><br />
        <label>Ville :</label>
        <p className={items.pUtilisateur}>{utilisateur.town}</p><br />
        <label>Téléphone :</label>
        <p className={items.pUtilisateur}>{utilisateur.phone}</p><br />
        <label>Email :</label>
        <p className={items.pUtilisateur}>{utilisateur.email}</p><br />
      </div>
    </div>
  )
}

export default CommandeUtilisateur