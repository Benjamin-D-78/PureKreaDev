import { React, useState, useEffect } from 'react'
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import supprimer from "../../images/Icones/supprimer.png"
import { toast } from 'react-toastify'
import axios from "axios"
import { URL } from '../../utils/Constantes'


const Abonnes = () => {

  const [abonnes, setAbonnes] = useState([]);
  const [error, setError] = useState(null);

  const allAbonnes = async () => {
    try {
      const response = await axios.get(URL.ABONNE_ALL)
      setAbonnes(response.data);
    } catch (error) {
      console.log("Erreur lors du chargement des abonnés.", error)
      setError(error.message);
    }
  };
  useEffect(() => { allAbonnes() }, [])


  const updateAbonne = async (id, statut) => {
    try {
      const response = await axios.put(`${URL.ABONNE_UPDATE}/${id}`, { statut })
      console.log(response);
      if (response.status === 200) {
        // Avec prevMessages on récupère la valeur précédente du state messages avant la MAJ. C'est l'état actuel de message au moment où on appelle la fonction.
        setAbonnes((prevAbonnes) =>
          prevAbonnes.map((abonnes) =>
            // Si l'ID du message (message._id) correspond à l'ID (id), alors on modifie le message en mettant à jour la propriété statut avec la valeur response.data.statut
            // "...message" : on copie toutes les autres propriétés de l'objet message sans les modifier.
            abonnes._id === id ? { ...abonnes, statut: response.data.statut } : abonnes
          )
        );
        toast.success("Statut mis à jour avec succès.", { autoClose: 1000 });
      }
    } catch (error) {
      console.log("Erreur lors de la mise à jour de l'abonné.", error)
      toast.error("Erreur lors de la mise à jour de l'abonné.", { autoClose: 3000 });
    }
  }


  const deleteAbonne = async (id) => {
    try {
      const response = await axios.delete(`${URL.ABONNE_DELETE}/${id}`)
      if (response.status === 200) {
        console.log(response.data)
        toast.success("Abonné supprimé avec succès.", { autoClose: 1000 })
        setAbonnes((prevAbonnes) => prevAbonnes.filter((abonne) => abonne._id !== id))
      }
    } catch (error) {
      console.log("Erreur lors de la suppression de l'abonné.", error)
      toast.error("Erreur lors de la suppression de l'abonné.", { autoClose: 3000 })
    }
  }

  return (
    <div>
      <h1 className={boutique_dashboard.h1}>Liste des Abonnés</h1>

      <table className={boutique_dashboard.tableItem}>
        <thead>
          <tr className={boutique_dashboard.enteteItem}>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <th>Statut</th>
            <th><button className={boutique_dashboard.refreshItems} onClick={allAbonnes}>Raffraîchir</button></th>
          </tr>
        </thead>
        <tbody>
          {abonnes.map(abonne => (
            <tr key={abonne._id}>
              <td className={boutique_dashboard.autresTD}>{abonne.lastname}</td>
              <td className={boutique_dashboard.autresTD}>{abonne.firstname}</td>
              <td className={boutique_dashboard.autresTD}>{abonne.email}</td>
              <td className={boutique_dashboard.autresTD}>
                <select value={abonne.statut} onChange={(event) => updateAbonne(abonne._id, event.target.value)}>
                  <option value={abonne.statut}>{abonne.statut}</option>
                  <option value={abonne.statut && abonne.statut === "Abonné" ? "Désabonné" : "Abonné"}>{abonne.statut && abonne.statut === "Abonné" ? "Désabonné" : "Abonné"}</option>
                </select>
              </td>
              <td className={boutique_dashboard.boutonsTD}>
                <div className={boutique_dashboard.contientIMG}>
                  <img onClick={() => deleteAbonne(abonne._id)} src={supprimer} alt="Icone de suppression" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Abonnes