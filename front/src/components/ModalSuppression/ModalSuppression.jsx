import { React, useState, useContext } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import { URL } from '../../utils/Constantes'

// CSS
import monProfil from "../../pages/MonProfil/monprofil.module.css"
import modalcgv from "../ModalCGV/modalcgv.module.css"


const ModalSuppression = () => {

    const { auth, deconnexion } = useContext(AuthContext);

    const deleteUser = async () => {
        if (URL.USER_DELETE) {
            try {
                const response = await axios.delete(`${URL.USER_DELETE}/${auth._id}`, { withCredentials: true })
                // console.log(response)
                if (response.status === 200) {
                    toast.success("Compte supprimé avec succès.", { autoClose: 2000 })
                    deconnexion();

                }
            } catch (error) {
                console.error("Erreur lors de la suppression du profil", error)
            }
        }
    }

    const [modal, setModal] = useState(false)

    const activeModal = () => {
        setModal(!modal)
    }

    return (
        <div>
            <div className={monProfil.contientBtn2}>
                <button onClick={activeModal} className={monProfil.btnSuppression}>Supprimer mon compte</button>
            </div>

            {modal && (
                <div className={modalcgv.conteneurPrincipal}>
                    <div className={modalcgv.contientModal}>
                        <div className={modalcgv.modalSuppression}>
                            <h1 className={modalcgv.titreH1}>Suppression de votre compte utilisateur</h1>
                            <div className={modalcgv.divSuppression}>
                                <p className={modalcgv.pSur}>Etes-vous certain de vouloir nous quitter ?</p>
                                <p>Toutes vos données seront définitvement supprimées.</p>
                                <p>Pensez à récupérer toutes vos factures pour tout besoin éventuel.</p>
                            </div>
                            <div className={modalcgv.contientBtnSuppression}>
                                <button className={modalcgv.btnRevenir} onClick={activeModal}>Non, je me suis trompé de bouton</button>
                                <button className={modalcgv.btnSuppression} onClick={() => deleteUser(auth._id)}>Oui, je veux supprimer mon compte</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalSuppression