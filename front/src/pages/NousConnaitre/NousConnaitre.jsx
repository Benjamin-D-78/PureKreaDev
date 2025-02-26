import { React, useState } from 'react'

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "../Commande/commande.module.css"
import nous_connaitre from "./nous_connaitre.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import PetitCaroussel from '../../components/PetitCaroussel/PetitCaroussel'
import Accordeon from '../../components/Accordeon/accordeon'

const NousConnaitre = () => {

    const [ouvrirA, setOuvrirA] = useState(false)
    const [ouvrirB, setOuvrirB] = useState(false)
    const [ouvrirC, setOuvrirC] = useState(false)
    const [ouvrirD, setOuvrirD] = useState(false)

    return (
        <main>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Nous connaître</h1>

            <div className={commande.conteneurGlobal}>
                <div className={commande.conteneurG}>
                    <PetitCaroussel />
                    <Accordeon />
                </div>

                <div className={boutique.conteneurDH}>
                    <div className={commande.blocEntete1}>
                        <div className={commande.entete1}>
                            <p className={nous_connaitre.pName}>Artisan cravatier français</p>
                        </div>
                    </div>

                    <div className={nous_connaitre.accordeon}>
                        {/* TabIndex(0) pour que l'élément soit focusable */}
                        <div onClick={() => setOuvrirA(!ouvrirA)} className={nous_connaitre.teteAccordeon} tabIndex={0}>
                            <p className={nous_connaitre.nomsChapitres}>Notre histoire</p>
                            <div className={nous_connaitre.plusMoins}>{ouvrirA ? "-" : "+"}</div>
                        </div>
                        {ouvrirA && (
                            <div className={nous_connaitre.corpsAccordeon}>
                                <p className={nous_connaitre.pAccordeon}>{<>Passionné de Sciences sociales depuis de nombreuses années, je ne pouvais pas passer à côté de ce qui distingue le plus visiblement l'individualité humaine : le domaine vestimentaire.<br /><br /> D'abord "essayiste" en construisant ma propre garde-robe, j'ai moi-même traversé tous les clichés que l'on peut vivre et entendre au sujet de l'élégance masculine. <br /><br /> Après une formation en modélisme en alternance, fort de ces expériences et savoir-faire acquis, je décidai de me lancer dans une aventure de pure création, au travers d'un accessoire que j'affectionne particulièrement : la cravate. <br /><br /> L'objectif de PureKréa est d'apporter l'originalité et la singularité aux hommes qui souhaitent s'accomplir.</>}</p>
                            </div>
                        )}

                        <div onClick={() => setOuvrirB(!ouvrirB)} className={nous_connaitre.teteAccordeon} tabIndex={0}>
                            <p className={nous_connaitre.nomsChapitres}>Pourquoi la cravate ?</p>
                            <div className={nous_connaitre.plusMoins}>{ouvrirB ? "-" : "+"}</div>
                        </div>
                        {ouvrirB && (
                            <div className={nous_connaitre.corpsAccordeon}>
                                <p className={nous_connaitre.pAccordeon}>{<>La cravate est l'accessoire qui accompagne le plus ma garde-robe. J'en suis moi-même un friand collectionneur. <br /><br /> Qui n'a pas déjà entendu ce bon vieux malentendu qui est de penser que la cravate est le symbole de la laisse autours du cou ? <br /><br /> Rien est plus faux, en plus d'être complètement décallé de la réalité. <br /><br /> Si l'on fait le point : en dehors de la qualité des tissus, un homme n'a que peu de choix possibles pour habiller a tenue. Nous optons pour les bagues, les boutons de manchettes, des petits mouchours de poche, et puis c'est à peu près tout. <br /><br /> La cravate, victime de ses préjugés et pourtant bel et bien un inconditionnel de l'élégance masculine, en étant à la fois l'accessoire le plus voyant. <br /><br /> Quite à créer quelque chose qui ait du sens, autant que ce soit la cravate.</>}</p>
                            </div>
                        )}

                        <div onClick={() => setOuvrirC(!ouvrirC)} className={nous_connaitre.teteAccordeon} tabIndex={0}>
                            <p className={nous_connaitre.nomsChapitres}>Inspiration</p>
                            <div className={nous_connaitre.plusMoins}>{ouvrirC ? "-" : "+"}</div>
                        </div>
                        {ouvrirC && (
                            <div className={nous_connaitre.corpsAccordeon}>
                                <p className={nous_connaitre.pAccordeon}>{<>Notre catalogue de prêt-à-porter s'inspire des couleurs offertes par la nature et l'ère du temps. <br /><br /> Chacune de nos cravates est confectionnée avec le soucis du moindre détail. Aussi, le plus long n'est pas la conception, mais bien la réflexion ! <br /><br /> Nous tentons de communiquer dans chacune d'elles : singularité, amour, passion et dynamisme.</>}</p>
                            </div>
                        )}

                        <div onClick={() => setOuvrirD(!ouvrirD)} className={nous_connaitre.teteAccordeon} tabIndex={0}>
                            <p className={nous_connaitre.nomsChapitres}>Quel avenir pour la cravate ?</p>
                            <div className={nous_connaitre.plusMoins}>{ouvrirD ? "-" : "+"}</div>
                        </div>
                        {ouvrirD && (
                            <div className={nous_connaitre.corpsAccordeon}>
                                <p className={nous_connaitre.pAccordeon}>{<>Pour PureKréa, l'avenir de la cravate a le même destin que toute pièce vestimentaire : il fluctuera selon les aléa de la mode. <br /><br /> La cravate a traveré les siècles et, bien qu'elle qit connu des périodes de déclin, elle reste un accessoire symbolique dans de nombreux environnements professionnels, sociaux et cérémoniaux. <br /><br /> Alors que tout le confort moderne et accessible tend à nous faire penser que certains accessoires vestimentaires viendraient à disparaître (comme les boutons de manchettes par exemple), toutes les statistiques venant des entreprises de markéting mettent en avant un vrai goût pour l'art tailleur de la part des jeunes. <br /><br /> Pour PureKréa, c'est bein la preuve que les modes vestimentaires ne cessent de fluctuer et que nos jeunes ont soif de singularité !</>}</p>
                            </div>
                        )}
                    </div>

                    {/* <div className={nous_connaitre.accordeon}> */}
                    {/* TabIndex(0) pour que l'élément soit focusable */}

                    {/* </div> */}
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default NousConnaitre