import { useState } from 'react'
import modalcgv from "./modalcgv.module.css"

const ModalCGV = () => {

    const [modal, setModal] = useState(false)

    const activeModal = () => {
        setModal(!modal)
    }

    return (
        <div>
            <span
                className={modalcgv.span}
                onClick={activeModal}>Conditions Générales de Ventes (CGV)
            </span>

            {modal && (
                <div className={modalcgv.conteneurPrincipal}>
                    <div className={modalcgv.contientModal}>
                        <div className={modalcgv.modalCGV}>
                            <h1 className={modalcgv.titreH1}>Conditions générales de Ventes (CGV)</h1>

                            <div className={modalcgv.divPreambule}>
                                <p><b>PureKréa</b></p>
                                <p>Société SARL au capital de  euros ;</p>
                                <p>Siège social 15 rue de Paris 75001 PARIS ;</p>
                                <p>N° de téléphone  ; Adresse du courrier électronique desmonet.pro@laposte.net;</p>
                                <p>RCS (ou Répertoire des métiers) de  n° ;</p>
                                <p>TVA Intra-communautaire n°;</p>
                                <p>Le responsable de la publication personne physique est Benjamin DESMONET;</p>
                                <p>Les présentes CGV ont été générées gratuitement par la société de communication <a href="http://kinic.fr" target="_blank" rel="noreferrer">Kinic</a></p>
                                <p>Date de dernière mise à jour 09/01/2025</p>
                            </div>


                            <div className={modalcgv.divA1}>
                                <p className={modalcgv.titre}>Article 1 - Objet</p>

                                <p>Les présentes conditions régissent les ventes par la société PureKréa 15 rue de Paris 75001 PARIS de Cravates.</p>
                            </div>

                            <div className={modalcgv.divA2}>
                                <p className={modalcgv.titre}>Article 2 - Prix</p>

                                <p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.</p>

                                <p>En cas de commande vers un pays autre que la France métropolitaine vous êtes l'importateur du ou des produits concernés. Des droits de douane ou autres taxes locales ou droits d'importation ou taxes d'état sont susceptibles d'être exigibles. Ces droits et sommes ne relèvent pas du ressort de la société <b>PureKréa</b>. Ils seront à votre charge et relèvent de votre entière responsabilité, tant en termes de déclarations que de paiements aux autorités et organismes compétents de votre pays. Nous vous conseillons de vous renseigner sur ces aspects auprès de vos autorités locales.</p>

                                <p>Toutes les commandes quelle que soit leur origine sont payables en euros.</p>

                                <p>La société <b>PureKréa</b> se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande et sous réserve de disponibilité.</p>

                                <p>Les produits demeurent la propriété de la société <b>PureKréa</b> jusqu'au paiement complet du prix.</p>

                                <p>Attention : dès que vous prenez possession physiquement des produits commandés, les risques de perte ou d'endommagement des produits vous sont transférés.</p>
                            </div>

                            <div className={modalcgv.divA3}>
                                <p className={modalcgv.titre}>Article 3 - Commandes</p>

                                <p><b>Vous pouvez passer commande : </b></p>

                                <p>Sur Internet : <a href="/">PureKréa</a></p>

                                <p>Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.</p>

                                <p>La société <b>PureKréa</b> se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit, et plus particulièrement en cas de problème d'approvisionnement, ou en cas de difficulté concernant la commande reçue.</p>
                            </div>

                            <div className={modalcgv.divA4}>
                                <p className={modalcgv.titre}>Article 4 - Validation de votre commande</p>

                                <p>Toute commande figurant sur le site Internet <a href="/">PureKréa</a> suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.</p>

                                <p>L'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction.</p>

                                <p>Vous déclarez en avoir parfaite connaissance.</p>

                                <p>La confirmation de commande vaudra signature et acceptation des opérations effectuées.</p>

                                <p>Un récapitulatif des informations de votre commande et des présentes Conditions Générales, vous sera communiqué en format PDF via l'adresse e-mail de confirmation de votre commande.</p>
                            </div>

                            <div className={modalcgv.divA5}>
                                <p className={modalcgv.titre}>Article 5 - Paiement</p>

                                <p>Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué.</p>

                                <p>Le règlement de vos achats s'effectue par carte bancaire grâce au système sécurisé.</p>

                                <p>Le débit de la carte n'est effectué qu'au moment de l'expédition de la commande. En cas de livraisons fractionnées, seuls les produits expédiés sont débités.</p>
                            </div>

                            <div className={modalcgv.divA6}>
                                <p className={modalcgv.titre}>Article 6 - Rétractation</p>

                                <p>Conformément aux dispositions de l'article L.121-21 du Code de la Consommation, vous disposez d'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité.</p>

                                <p>Les retours sont à effectuer dans leur état d'origine et complets (emballage, accessoires, notice). Dans ce cadre, votre responsabilité est engagée. Tout dommage subi par le produit à cette occasion peut être de nature à faire échec au droit de rétractation.</p>

                                <p>Les frais de retour sont Gratuit.</p>

                                <p>En cas d'exercice du droit de rétractation, la société <b>PureKréa</b> procédera au remboursement des sommes versées, dans un délai de 14 jours suivant la notification de votre demande et via le même moyen de paiement que celui utilisé lors de la commande.</p>

                                <p><b>EXCEPTIONS AU DROIT DE RETRACTATION</b></p>

                                <p>Conformément aux dispositions de l'article L.121-21-8 du Code de la Consommation, le droit de rétractation ne s'applique pas à :</p>

                                <div className={modalcgv.divA62}>
                                    <p>La fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</p>

                                    <p>La fourniture de biens ou de services dont le prix dépend de fluctuations sur le marché financier échappant au contrôle du professionnel et susceptibles de se produire pendant le délai de rétractation.</p>

                                    <p>La fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés.</p>

                                    <p>La fourniture de biens susceptibles de se détériorer ou de se périmer rapidement.</p>

                                    <p>La fourniture de biens qui ont été descellés par le consommateur après la livraison et qui ne peuvent être renvoyés pour des raisons d'hygiène ou de protection de la santé.</p>

                                    <p>La fourniture de biens qui, après avoir été livrés et de par leur nature, sont mélangés de manière indissociable avec d'autres articles ;</p>

                                    <p>La fourniture de boissons alcoolisées dont la livraison est différée au-delà de trente jours et dont la valeur convenue à la conclusion du contrat dépend de fluctuations sur le marché échappant au contrôle du professionnel.</p>

                                    <p>La fourniture d'enregistrements audio ou vidéo ou de logiciels informatiques lorsqu'ils ont été descellés par le consommateur après la livraison.</p>

                                    <p>La fourniture d'un journal, d'un périodique ou d'un magazine, sauf pour les contrats d'abonnement à ces publications.</p>

                                    <p>Les transactions conclues lors d'une enchère publique.</p>

                                    <p>La fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</p>
                                </div>
                            </div>

                            <div className={modalcgv.divA7}>
                                <p className={modalcgv.titre}>Article 7- Disponibilité</p>

                                <p>Nos produits sont proposés tant qu'ils sont visibles sur le site <a href="/">PureKréa</a> et dans la limite des stocks disponibles. Pour les produits non stockés, nos offres sont valables sous réserve de disponibilité chez nos fournisseurs.</p>

                                <p>En cas d'indisponibilité de produit après passation de votre commande, nous vous en informerons par mail. Votre commande sera automatiquement annulée et aucun débit bancaire ne sera effectué.</p>

                                <p>En outre, le site Internet <a href="/">PureKréa</a> n'a pas vocation à vendre ses produits en quantités importantes. Par conséquent la société <b>PureKréa</b> se réserve le droit de refuser les commandes de 1 articles identiques.</p>
                            </div>

                            <div className={modalcgv.divA8}>
                                <p className={modalcgv.titre}>Article 8 - Livraison</p>

                                <p>Les produits sont livrés à l'adresse de livraison indiquée au cours du processus de commande, dans le délai indiqué sur la page de validation de la commande.</p>

                                <p>En cas de retard d'expédition, un mail vous sera adressé pour vous informer d'une éventuelle conséquence sur le délai de livraison qui vous a été indiqué.</p>

                                <p>Conformément aux dispositions légales, en cas de retard de livraison, vous bénéficiez de la possibilité d'annuler la commande dans les conditions et modalités définies à l'article L 138-2 du Code de la Consommation. Si entre temps vous recevez le produit nous procéderons à son remboursement et aux frais d'acheminement dans les conditions de l'article L 138-3 du Code de la Consommation.</p>

                                <p>En cas de livraisons par une transporteur, la société <b>PureKréa</b> ne peut être tenue pour responsable de retard de livraison dû exclusivement à une indisponibilité du client après plusieurs propositions de rendez-vous.</p>
                            </div>

                            <div className={modalcgv.divA9}>
                                <p className={modalcgv.titre}>Article 9 - Garantie</p>

                                <p>Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil. En cas de non-conformité d'un produit vendu, il pourra être retourné, échangé ou remboursé.</p>

                                <p>Toutes les réclamations, demandes d'échange ou de remboursement doivent s'effectuer par Mail dans le délai de 30 jours de la livraison.</p>

                                <p>Les produits doivent nous être retournés dans l'état dans lequel vous les avez reçus avec l'ensemble des éléments (accessoires, emballage, notice...). Les frais d'envoi vous seront remboursés sur la base du tarif facturé et les frais de retour vous seront remboursés sur présentation des justificatifs.</p>

                                <p>Les dispositions de cet Article ne vous empêchent pas de bénéficier du droit de rétractation prévu à l'article 6.</p>
                            </div>

                            <div className={modalcgv.divA10}>
                                <p className={modalcgv.titre}>Article 10 - Responsabilité</p>

                                <p>Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de la société <b>PureKréa</b> ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il vous appartient de vérifier auprès des autorités locales les possibilités d'importation ou d'utilisation des produits ou services que vous envisagez de commander.</p>

                                <p>Par ailleurs, la société <b>PureKréa</b> ne saurait être tenue pour responsable des dommages résultant d'une mauvaise utilisation du produit acheté.</p>

                                <p>Enfin la responsabilité de la société <b>PureKréa</b> ne saurait être engagée pour tous les inconvénients ou dommages inhérents à l'utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.</p>
                            </div>

                            <div className={modalcgv.divA11}>
                                <p className={modalcgv.titre}>Article 11 - Droit applicable en cas de litiges</p>

                                <p>La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.</p>
                            </div>

                            <div className={modalcgv.divA12}>
                                <p className={modalcgv.titre}>Article 12 - Propriété intellectuelle</p>

                                <p>Tous les éléments du site <a href="http://www.purekrea.fr">http://www.purekrea.fr</a> sont et restent la propriété intellectuelle et exclusive de la société <b>PureKréa</b>. Nul n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu'ils soient logiciels, visuels ou sonores. Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de la société <b>PureKréa</b>.</p>
                            </div>

                            <div className={modalcgv.divA13}>
                                <p className={modalcgv.titre}>Article 13 - Données personnelles</p>

                                <p>La société <b>PureKréa</b> se réserve le droit de collecter les informations nominatives et les données personnelles vous concernant. Elles sont nécessaires à la gestion de votre commande, ainsi qu'à l'amélioration des services et des informations que nous vous adressons.</p>

                                <p>Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l'exécution des services et commandes pour leur gestion, exécution, traitement et paiement.</p>

                                <p>Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires.</p>

                                <p>Conformément à la loi du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification et d'opposition aux informations nominatives et aux données personnelles vous concernant, directement sur le site Internet.</p>
                            </div>

                            <div className={modalcgv.divA14}>
                                <p className={modalcgv.titre}>Article 14 - Archivage Preuve</p>

                                <p>La société <b>PureKréa</b> archivera les bons de commandes et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l'article 1348 du Code civil.</p>

                                <p>Les registres informatisés de la société <b>PureKréa</b> seront considérés par toutes les parties concernées comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.</p>
                            </div>
                            <div className={modalcgv.contientBtnFermer}>
                                <button
                                    className={modalcgv.btnFermer}
                                    onClick={activeModal}>Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalCGV