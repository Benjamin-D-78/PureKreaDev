import { React, useState, useEffect } from "react";
import modalcgv from "../ModalCGV/modalcgv.module.css"

const ModaleCookies = () => {

    const [modal, setModal] = useState(false);

    useEffect(() => {
        const consentement = localStorage.getItem("cookieConsent");
        if (!consentement) {
            setModal(true);
        }
    }, []);

    const handleAccepte = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setModal(false);
    }

    const handleRefus = () => {
        localStorage.setItem("cookieConsent", "declined");
        setModal(false);
    }

    return (
        <div>
            {modal && (
                <div className={modalcgv.conteneurPrincipalCookie}>
                    <div className={modalcgv.contientModal}>
                        <div className={modalcgv.modalCGV}>
                            <h1 className={modalcgv.titreH1}>Gestion des cookies</h1>

                            <div className={modalcgv.divCookies}>
                                <p>Nous utilisons des cookies pour améliorer votre expérience. Acceptez-vous leur utilisation ?</p>
                            </div>
                            <div className={modalcgv.divBtnCookies}>
                                <button className={modalcgv.Accepter} onClick={handleAccepte}>Accepter</button>
                                <button className={modalcgv.Refuser} onClick={handleRefus}>Refuser</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default ModaleCookies