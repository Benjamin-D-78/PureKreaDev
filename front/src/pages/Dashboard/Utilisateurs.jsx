import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import axios from "axios"
import { toast } from 'react-toastify'
import { URL } from '../../utils/Constantes'

// ICONES
import supprimer from "../../images/Icones/supprimer.png"
import modifier from "../../images/Icones/modifier.png"

// COMPOSANTS
import AjoutUtilisateur from './Users'

const Utilisateurs = () => {

  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)


  const deleteUser = async (id) => {
    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth);

    if (auth.role === "admin") {
      try {
        const response = await axios.delete(`${URL.USER_DELETE}/${id}`, { withCredentials: true })
        if (response.status === 200) {
          console.log(response)
          toast.success("Utilisateur supprimé avec succès.", { autoClose: 1000 })
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } // On met à jour le state local en retirant de la liste l'utilisateur supprimé.
      } catch (error) {
        console.log("Erreur lors de la suppression de l'utilisateur.", error)
        toast.error("Erreur lors de la suppression de l'utilisateur.", { autoClose: 3000 })
      }
    }
  }

  const depart = async () => {
    try {
      const response = await axios.get(URL.USER_ALL, { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.log("Erreur lors du chargement des utilisateurs.", error)
      setError(error.message)
    }
  };
  useEffect(() => { depart() }, []);

  if (error) return <> <p>{error}</p> </>;

  return (
    <div>
      <AjoutUtilisateur />
      <h1 className={boutique_dashboard.h1}>Liste des utilisateurs</h1>

      <table className={boutique_dashboard.tableItem}>
        <thead>
          <tr className={boutique_dashboard.enteteItem}>
            <th>Nom</th>
            <th>Prénom</th>
            <th className={boutique_dashboard.thCache}>E-mail</th>
            <th className={boutique_dashboard.thCache}>Adresse</th>
            <th className={boutique_dashboard.thCache}>CP</th>
            <th className={boutique_dashboard.thCache}>Ville</th>
            <th className={boutique_dashboard.thCache}>Numéro</th>
            <th className={boutique_dashboard.thCache}>Role</th>
            <th className={boutique_dashboard.thCache}>Compte</th>
            <th className={boutique_dashboard.thButton}><button className={boutique_dashboard.refreshItems} onClick={depart}>Raffraîchir</button></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className={boutique_dashboard.autresTD}>{user.firstname}</td>
              <td className={boutique_dashboard.autresTD}>{user.lastname}</td>
              <td className={boutique_dashboard.autresTDcache}>{user.email}</td>
              <td className={boutique_dashboard.autresTDcache}>{user.adress}</td>
              <td className={boutique_dashboard.autresTDcache}>{user.postal}</td>
              <td className={boutique_dashboard.autresTDcache}>{user.town}</td>
              <td className={boutique_dashboard.autresTDcache}>{user.phone}</td>
              <td className={boutique_dashboard.autresTDcache}>{user.role}</td>
              <td className={boutique_dashboard.autresTDcache}>{user.isVerified ? "Vérifié" : "En attente"}</td>
              <td className={boutique_dashboard.boutonsTD}>
                <div className={boutique_dashboard.contientIMG}>
                  <Link to={{ pathname: `/dashboard/update/utilisateur/${user._id}` }}><img src={modifier} alt="Icone de modification" /></Link>
                  <img onClick={() => deleteUser(user._id)} src={supprimer} alt="Icone de suppression" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Utilisateurs
