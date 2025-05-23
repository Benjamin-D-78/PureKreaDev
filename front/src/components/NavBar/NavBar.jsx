import { useState, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom"

// CONTEXT
import { AuthContext } from '../../context/AuthContext'

// COMPOSANTS
import navbar from "./navbar.module.css"

// ICONES
import logo from "../../images/NavBar/logo.avif"
import hamburger from "../../images/NavBar/hamburger.svg"
import close from "../../images/NavBar/close.svg"


export default function NavBar() {

    const [montrerMenu, setMontrerMenu] = useState(false)
    const { auth, deconnexion } = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <div className={navbar.contientHeader}>
            <header>
                <nav className={navbar.nav} role='navigation'>
                    <div className={navbar.divImage}>
                        <img className={navbar.img} src={logo} alt="Logo de l'entreprise PureKréa" onClick={() => navigate("/")} />
                    </div>
                    <div className={navbar.navContainer}>
                        <div className={`${montrerMenu ? navbar.montre : navbar.cache}`}>
                            <div className={navbar.divListe}>
                                <NavLink className={navbar.a} to="/">Boutique</NavLink>
                                <NavLink className={navbar.a} to="/nous-connaitre">Nous connaître</NavLink>
                                <NavLink className={navbar.a} to="/rendez-vous">Prendre rendez-vous</NavLink>
                                <NavLink className={navbar.a} to="/contact">Contact</NavLink>

                                {auth ?
                                    <NavLink className={navbar.deconnexion} onClick={deconnexion}>Déconnexion</NavLink>
                                    :
                                    <NavLink className={navbar.deconnexion} to="/connexion">Connexion</NavLink>
                                }
                            </div>
                        </div>
                        <img
                            onClick={() => setMontrerMenu(!montrerMenu)}
                            className={`${montrerMenu ? navbar.menuClose : navbar.menuBurger}`}
                            src={montrerMenu ? close : hamburger}
                            alt="Menu Hamburger" />
                    </div>
                </nav>
            </header>
            <hr className={navbar.hr} />
        </div>
    )
}
