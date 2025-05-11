import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import items from "../Dashboard/css/items.module.css"

// EXTERNALISATION
import { URL } from '../../utils/constantes';
import axiosInstance from '../../utils/axiosInstance';

const CommandeUtilisateur = () => {

  const { id } = useParams();
  const [utilisateur, setUtilisateur] = useState({});
  const userAuth = localStorage.getItem("auth");
  const auth = userAuth && JSON.parse(userAuth);

  useEffect(() => {
    if (auth && auth.role === "admin") {
      const userById = async () => {
        try {
          const response = await axiosInstance.get(`${URL.USER_BY_ID}/${id}`)
          setUtilisateur(response.data)
        } catch (error) {
          console.error("Erreur lors de la recherche de l'utilisateur.")
        }
      };
      userById();
    }
  }, [auth, id])

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