import { React, useState, useEffect } from 'react'
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import supprimer from "../../images/Icones/supprimer.png"
import { toast } from 'react-toastify'
import axios from "axios"
import { URL } from '../../utils/Constantes'


const Messages = () => {

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    const allMessages = async () => {
        try {
            const response = await axios.get(URL.MESSAGE_ALL)
            setMessages(response.data)
        } catch (error) {
            console.log("Erreur lors du chargement des messages.", error)
            setError(error.message)
        }
    };
    useEffect(() => { allMessages() }, [])


    const updateStatut = async (id, statut) => {
        try {
            const response = await axios.put(`${URL.MESSAGE_UPDATE}/${id}`, { statut })
            console.log(response)
            if (response.status === 200) {
                // Avec prevMessages on récupère la valeur précédente du state messages avant la MAJ. C'est l'état actuel de message au moment où on appelle la fonction.

                setMessages((prevMessages) =>
                    prevMessages.map((message) =>
                        // Si l'ID du message (message._id) correspond à l'ID (id), alors on modifie le message en mettant à jour la propriété statut avec la valeur response.data.statut
                        // "...message" : on copie toutes les autres propriétés de l'objet message sans les modifier.
                        message._id === id ? { ...message, statut: response.data.statut } : message
                    )
                );
                toast.success("Statut mis à jour avec succès.", { autoClose: 1000 });
            }
        } catch (error) {
            console.log("Erreur lors de la mise à jour du statut.", error);
            toast.error("Erreur lors de la mise à jour du statut.", { autoClose: 3000 });
        }
    }


    const deleteMessage = async (id) => {
        try {
            const response = await axios.delete(`${URL.MESSAGE_DELETE}/${id}`)
            if (response.status === 200) {
                console.log(response.data)
                toast.success("Message supprimé avec succès.", { autoClose: 1000 })
                setMessages((prevMessages) => prevMessages.filter((message) => message._id !== id))
            }
        } catch (error) {
            console.log("Erreur lors de la suppression du message.", error)
            toast.error("Erreur lors de la suppression du message.", { autoClose: 3000 })

        }
    }

    return (
        <div>
            <h1 className={boutique_dashboard.h1}>Liste des messages</h1>

            <table className={boutique_dashboard.tableItem}>
                <thead>
                    <tr className={boutique_dashboard.enteteItem}>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th className={boutique_dashboard.thCache}>E-mail</th>
                        <th>Téléphone</th>
                        <th className={boutique_dashboard.thCache}>Préférence</th>
                        <th >Motif</th>
                        <th className={boutique_dashboard.thCache}>Message</th>
                        <th className={boutique_dashboard.thCache}>Statut</th>
                        <th className={boutique_dashboard.thButton}><button className={boutique_dashboard.refreshItems} onClick={allMessages}>Raffraîchir</button></th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(message => (
                        <tr key={message._id}>
                            <td className={boutique_dashboard.autresTD}>{message.lastname}</td>
                            <td className={boutique_dashboard.autresTD}>{message.firstname}</td>
                            <td className={boutique_dashboard.autresTDcache}>{message.email}</td>
                            <td className={boutique_dashboard.autresTD}>{message.phone}</td>
                            <td className={boutique_dashboard.autresTDcache}>{message.preference}</td>
                            <td className={boutique_dashboard.autresTD}>{message.motif}</td>
                            <td className={boutique_dashboard.autresTDcacheContent}>{message.content}</td>
                            <td className={boutique_dashboard.autresTDcache}>
                                <select value={message.statut} onChange={(event) => updateStatut(message._id, event.target.value)}>
                                    <option value={message.statut}>{message.statut}</option>
                                    <option value={message.statut && message.statut === "En cours" ? "Traité" : "En cours"}>{message.statut && message.statut === "En cours" ? "Traité" : "En cours"}</option>
                                </select>
                            </td>
                            <td className={boutique_dashboard.boutonsTD}>
                                <div className={boutique_dashboard.contientIMG}>
                                    <img onClick={() => deleteMessage(message._id)} src={supprimer} alt="Icone de suppression" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Messages