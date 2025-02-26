import React, { useState } from 'react'
import accordeon from "./accordeon.module.css"




export default function Accordeon() {

    const [ouvrirA, setOuvrirA] = useState(false)
    const [ouvrirB, setOuvrirB] = useState(false)
    const [ouvrirC, setOuvrirC] = useState(false)
    const [ouvrirD, setOuvrirD] = useState(false)
    const [ouvrirE, setOuvrirE] = useState(false)
    const [ouvrirF, setOuvrirF] = useState(false)

    return (
        <div className={accordeon.contientAccordeon}>
            <p className={accordeon.pOnVousDitTout}>On vous dit tout</p>

            <div className={accordeon.accordeon}>
                {/* TabIndex(0) pour que l'élément soit focusable */}
                <div onClick={() => setOuvrirA(!ouvrirA)} className={accordeon.teteAccordeon} tabIndex={0}>
                    <p className={accordeon.nomsChapitres}>D'où viennent nos soies ?</p>
                    <div className={accordeon.plusMoins}>{ouvrirA ? "-" : "+"}</div>
                </div>
                {ouvrirA && (
                    <div className={accordeon.corpsAccordeon}>
                        <p className={accordeon.pAccordeon}>{<>Toutes nos soies proviennent de chenilles du bombyx du mûrier et sont élevées à proximité de champs de mûres.<br /> (Origine : Asie, 80% en provenance de la Chine).</>}</p>
                    </div>
                )}
            </div>

            <div className={accordeon.accordeon}>
                <div onClick={() => setOuvrirB(!ouvrirB)} className={accordeon.teteAccordeon} tabIndex={0}>
                    <p className={accordeon.nomsChapitres}>Quel budget faut-il prévoir ?</p>
                    <div className={accordeon.plusMoins}>{ouvrirB ? "-" : "+"}</div>
                </div>
                {ouvrirB && (
                    <div className={accordeon.corpsAccordeon}>
                        <p className={accordeon.pAccordeon}>{<>Nos prix varient en fonction des modes de tissages pratiqués. Un investissement supplémentaire est à prévoir pour une cravate sur-mesure.<br /> Celui-ci se calcule par rapport au temps consacré à sa confection.
                            En moyenne, une cravate sur-mesure a un tarif global entre 250 et 400 euros.</>}</p>
                    </div>
                )}
            </div>

            <div className={accordeon.accordeon}>
                <div onClick={() => setOuvrirC(!ouvrirC)} className={accordeon.teteAccordeon} tabIndex={0}>
                    <p className={accordeon.nomsChapitres}>Quel est le délai de fabrication ?</p>
                    <div className={accordeon.plusMoins}>{ouvrirC ? "-" : "+"}</div>
                </div>
                {ouvrirC && (
                    <div className={accordeon.corpsAccordeon}>
                        <p className={accordeon.pAccordeon}>Il faut compter 2 mois de délais pour la réalisation d'une cravate sur-mesure, et 2 semaines supplémentaires en cas de retouches éventuelles.</p>
                    </div>
                )}
            </div>

            <div className={accordeon.accordeon}>
                <div onClick={() => setOuvrirD(!ouvrirD)} className={accordeon.teteAccordeon} tabIndex={0}>
                    <p className={accordeon.nomsChapitres}>Quelles sont nos limites en sur-mesure ?</p>
                    <div className={accordeon.plusMoins}>{ouvrirD ? "-" : "+"}</div>
                </div>
                {ouvrirD && (
                    <div className={accordeon.corpsAccordeon}>
                        <p className={accordeon.pAccordeon}>Nous n'en avons pas à proprement parler. Nos limites sont les vôtres. Néanmoins nous n'acceptons pas les demandent trop marginales et pouvant offenser autrui.</p>
                    </div>
                )}
            </div>

            <div className={accordeon.accordeon}>
                <div onClick={() => setOuvrirE(!ouvrirE)} className={accordeon.teteAccordeon} tabIndex={0}>
                    <p className={accordeon.nomsChapitres}>Un rendez-vous est-il obligatoire ?</p>
                    <div className={accordeon.plusMoins}>{ouvrirE ? "-" : "+"}</div>
                </div>
                {ouvrirE && (
                    <div className={accordeon.corpsAccordeon}>
                        <p className={accordeon.pAccordeon}>Oui, un rendez-vous minimum est obligatoire. Il est la certitude que nous répondrons pleinement à vos attentes. Vous pourrez à cette occasion nous poser toutes vos questions, et nous de même.</p>
                    </div>
                )}
            </div>

            <div className={accordeon.accordeon}>
                <div onClick={() => setOuvrirF(!ouvrirF)} className={accordeon.teteAccordeon} tabIndex={0}>
                    <p className={accordeon.nomsChapitres}>Quelle est notre politique de retour ?</p>
                    <div className={accordeon.plusMoins}>{ouvrirF ? "-" : "+"}</div>
                </div>
                {ouvrirF && (
                    <div className={accordeon.corpsAccordeon}>
                        <p className={accordeon.pAccordeon}>{<>En sur-mesure, il n'y en a pas. La prise de rendez-vous est nécessaire et conçue pour éviter ce désagrément.<br />Pour le prêt-à-porter, vous disposez d'un délai d'une semaine pour nous retourner le ou les articles à compter de leur réception.</>}</p>
                    </div>
                )}
            </div>

        </div>
    )
}
