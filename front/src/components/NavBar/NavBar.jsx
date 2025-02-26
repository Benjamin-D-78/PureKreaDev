import { React, useState, useContext } from 'react'
import { NavLink } from "react-router-dom"

// CONTEXT
import { AuthContext } from '../../context/AuthContext'

// COMPOSANTS
import navbar from "./navbar.module.css"

// ICONES
import logo from "../../images/NavBar/logo.png"
import hamburger from "../../images/NavBar/hamburger.svg"
import close from "../../images/NavBar/close.svg"


export default function NavBar() {

    const [montrerMenu, setMontrerMenu] = useState(false)
    const { auth, deconnexion } = useContext(AuthContext)


    return (
        <div className={navbar.contientHeader}>
            <header>
                <nav className={navbar.nav}>
                    <div className={navbar.divImage}>
                        <NavLink to="/"><img className={navbar.img} src={logo} alt="Logo 'PureKréNavLink'" />
                        </NavLink>
                    </div>
                    <div className={navbar.navContainer}>
                        <div className={`${montrerMenu ? navbar.montre : navbar.cache}`}>
                            <ul className={navbar.ul}>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/">Boutique</NavLink>
                                </li>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/nous-connaitre">Nous connaître</NavLink>
                                </li>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/rendez-vous">Prendre rendez-vous</NavLink>
                                </li>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/contact">Contact</NavLink>
                                </li>

                                {auth ?
                                    <li className={navbar.navbarLI}>
                                        <NavLink className={navbar.deconnexion} onClick={deconnexion}>Déconnexion</NavLink>
                                    </li>
                                    :
                                    <li className={navbar.navbarLI}>
                                        <NavLink className={navbar.deconnexion} to="/connexion">Connexion</NavLink>
                                    </li>
                                }
                            </ul>
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
