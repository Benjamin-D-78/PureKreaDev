import { React, useState } from 'react'

// CSS
import footerCSS from "../Footer/footer.module.css"
import modalcgv from "../ModalCGV/modalcgv.module.css"

const ModalePolitique = () => {

    const [modal, setModal] = useState(false)

    const activeModal = () => {
        setModal(!modal)
    }

    return (
        <div>
            <p className={footerCSS.texteB} onClick={activeModal}>En savoir plus sur les cookies et mentions légales de PureKréa</p>

            {modal && (
                <div className={modalcgv.conteneurPrincipal}>
                    <div className={modalcgv.contientModal}>
                        <div className={modalcgv.modalCGV}>
                            <h1 className={modalcgv.titreH1}>Politique de confidentialité</h1>

                            <div className={modalcgv.divPreambule}>
                                <p><b>PureKréa</b></p>
                                <p>Société SARL au capital de  euros ;</p>
                                <p>Siège social 15 rue de Paris 75001 PARIS ;</p>
                                <p>N° de téléphone  ; Adresse du courrier électronique desmonet.pro@laposte.net;</p>
                                <p>RCS (ou Répertoire des métiers) de  n° ;</p>
                                <p>TVA Intra-communautaire n°;</p>
                                <p>Le responsable de la publication personne physique est Benjamin DESMONET;</p>
                                <p>Les présentes CGV ont été générées gratuitement par la société de communication <a href="http://kinic.fr" target="_blank" rel="noreferrer">Kinic</a></p>
                                <p>Date de dernière mise à jour : 21/02/2025</p>
                            </div>

                            <div className={modalcgv.divA1}>
                                <p className={modalcgv.titre}>Cookies</p>

                                <p>Date de dernière mise à jour : 21/02/2025</p>
                                <p>Chez PureKréa, nous nous engageons à respecter votre vie privée et à protéger vos données personnelles. <br />
                                    Cette politique de confidentialité explique comment nous utilisons les cookies sur notre site web (www.purekrea.com). <br />
                                    En accédant à notre site, vous acceptez l'utilisation des cookies conformément à cette politique.</p>
                                <p><b>1. Qu'est-ce qu'un cookie ?</b></p>
                                <p>Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, smartphone, etc.) lorsque vous visitez un site web. <br />
                                    Il permet de mémoriser vos préférences de navigation et d'améliorer votre expérience en ligne.</p>

                                <p><b>2. Pourquoi utilisons-nous des cookies ?</b></p>
                                <ul>
                                    <li className={modalcgv.li}>Cookies fonctionnels : Ils permettent d’assurer le bon fonctionnement de notre site, de mémoriser vos préférences (comme la langue ou la taille du texte) et d’améliorer la navigation.</li>
                                    <li className={modalcgv.li}>Cookies analytiques : Nous utilisons des cookies pour analyser les statistiques de visite de notre site, améliorer la qualité du contenu et des services que nous proposons.</li>
                                    <li className={modalcgv.li}>Cookies de publicité : Ces cookies peuvent être utilisés pour afficher des publicités pertinentes en fonction de votre comportement de navigation, afin d’améliorer la pertinence de nos annonces.</li>
                                </ul>

                                <p><b>3. Quels types de cookies utilisons-nous ?</b></p>
                                <ul>
                                    <li className={modalcgv.li}>Cookies nécessaires : Ces cookies sont essentiels pour permettre la navigation sur notre site et l’utilisation de ses fonctionnalités. Ils ne peuvent pas être désactivés dans nos systèmes.</li>
                                    <li className={modalcgv.li}>Cookies de performance : Ces cookies nous aident à analyser l’utilisation du site afin d’en améliorer les performances. Par exemple, ils nous permettent de savoir quelles pages sont les plus visitées.</li>
                                    <li className={modalcgv.li}>Cookies fonctionnels : Ces cookies permettent de personnaliser l’expérience en ligne en mémorisant vos choix (comme la langue) et d’offrir des fonctionnalités améliorées.</li>
                                    <li className={modalcgv.li}>Cookies de ciblage/publicité : Ces cookies sont utilisés pour diffuser des publicités personnalisées et suivre l’efficacité de nos campagnes publicitaires.</li>
                                </ul>

                                <p><b>4. Comment gérer les cookies ?</b></p>
                                <p>Vous avez la possibilité de gérer les cookies en modifiant les paramètres de votre navigateur. Vous pouvez accepter ou refuser les cookies, ou être averti avant qu’un cookie ne soit stocké. Toutefois, la désactivation de certains cookies peut affecter votre expérience utilisateur sur notre site.</p>
                                <ul>
                                    <li className={modalcgv.li}>Pour Chrome : Paramètres - Confidentialité et sécurité - Cookies et autres données de site.
                                    </li>
                                    <li className={modalcgv.li}>Pour Firefox : Paramètres - Vie privée et sécurité - Cookies et données de site.
                                    </li>
                                    <li className={modalcgv.li}>Pour Safari : Préférences - Confidentialité - Cookies et données de sites web.
                                    </li>
                                    <li className={modalcgv.li}>Pour Edge : Paramètres - Confidentialité, recherche et services - Cookies et données de site.
                                    </li>
                                </ul>

                                <p><b>5. Cookies tiers</b></p>
                                <p>Certains cookies sont installés par des services tiers, comme Google Analytics ou des plateformes publicitaires. Ces cookies sont utilisés pour analyser l’audience de notre site ou pour vous fournir des publicités ciblées. Nous n'avons pas accès à ces cookies et vous devez consulter la politique de confidentialité de ces services tiers pour plus d’informations.</p>

                                <p><b>6. Conservation des cookies</b></p>
                                <p>Les cookies peuvent être stockés pour une durée variable, selon leur type. Les cookies nécessaires sont conservés pendant la durée de votre session, tandis que les cookies analytiques et publicitaires peuvent être stockés pendant une période plus longue, jusqu’à 13 mois.</p>

                                <p><b>7. Modifications de la politique de cookies</b></p>
                                <p>Nous nous réservons le droit de modifier cette politique de confidentialité sur les cookies à tout moment. Toute modification sera publiée sur cette page avec la date de la dernière mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé des éventuels changements.</p>

                                <p><b>8. Contact</b></p>
                                <p>Si vous avez des questions concernant notre politique de confidentialité ou l'utilisation des cookies, n'hésitez pas à nous contacter à l’adresse suivante :
                                    Email : desmonet.pro@laposte.net</p>

                                <p className={modalcgv.titre}>ARTICLE 1 – CAPACITÉ</p>
                                <p>Le Client déclare être âgé d’au moins 18 ans et avoir la capacité juridique ou être titulaire d’une autorisation parentale lui permettant d’effectuer une commande sur le site web.</p>

                                <p className={modalcgv.titre}>ARTICLE 2 – PRIX</p>
                                <p>
                                    2.1 – Les prix des produits sont indiqués en euros toutes taxes comprises hors participation au frais de port. <br />
                                    2.2 – Toutes les commandes, quelles que soient leurs origines sont payables en euros. <br />
                                    2.3 – PureKréa se réserve le droit de modifier ses prix à tout moment. Les produits seront facturés sur la base de tarifs en vigueur au moment de la confirmation de la commande par PureKréa tel que prévu à l’article 3-2 des présentes conditions générales de vente
                                </p>

                                <p className={modalcgv.titre}>ARTICLE 3 – COMMANDE</p>
                                <p>
                                    3.1 – Le Client déclare avoir pris connaissance et avoir accepté les présentes conditions générales de ventes avant la passation de la commande. <br />
                                    3.2 – La commande doit être saisie sur le site : purekrea.com <br />
                                    3.3 – Les Parties prennent réciproquement acte du fait que les produits présentés sur le site Internet purekrea.com peuvent ne plus être disponible ou en vente au moment de la commande. <br />
                                    3.4 – Lors de l’enregistrement de ses informations personnelles dans la rubrique « mon compte », le client doit s’assurer de l’exactitude et de l’exhaustivité des données obligatoires fournies. Toute modification ultérieure doit être mentionnée le plus rapidement possible. <br />
                                    3.5 – PureKréa se réserve le droit de suspendre ou de clôturer le compte d’un client qui contreviendrait aux dispositions des conditions générales de ventes. Toute personne dont le compte aurait été suspendu ou clôturé ne pourra ultérieurement commander sur le site de PureKréa sans son autorisation préalable.</p>

                                <p className={modalcgv.titre}>ARTICLE 4 – VALIDATION DE LA COMMANDE
                                </p>
                                <p>
                                    4.1 – Un courrier électronique de confirmation constituant l’acceptation de la commande par PureKréa et récapitulant le contenu de la commande (produits, prix , quantité…) sera adressé au Client par PureKréa. <br />
                                    4.2 – Le contrat de vente par Internet sera conclu au moment où le Client, après avoir eu la possibilité de vérifier le détail de sa commande (contenu et prix total) et d’en rectifier le cas échéant la teneur, confirmera celle-ci à PureKréa par son acceptation définitive qui sera considérée comme effective après validation par le Client du paiement en ligne. <br />
                                    4.3 – Toute commande confirmée par le paiement en ligne vaut conclusion du contrat de vente et corrélativement acceptation des prix, description et quantité des produits ainsi que des clauses contenues dans les présentes conditions générales de vente. <br />
                                    4.4 – Les données enregistrées et conservées par PureKréa constituent la preuve de l’ensemble des transactions passées entre les Parties.</p>

                                <p className={modalcgv.titre}>ARTICLE 5 – LIVRAISON</p>
                                <p>5.1 – PureKréa s’efforce d’assurer ses livraisons dans les 10 jours ouvrables pour la France à compter de la réception de la commande et du règlement. <br />
                                    5.2 – PureKréa s’engage à informer le client de tout retard prévisible de livraison. <br />
                                    5.3 – Les produits sont livrés à l’adresse de livraison indiquée lors de la commande des produits. <br />
                                    5.4 – La propriété des marchandises et les risques y afférant sont transférés au Client au moment de la livraison c’est-à-dire dès l’instant où le Client prend possession de celles-ci. <br />
                                    5.5 – Les réserves que peut émettre le Client lors de la livraison ne seront recevables que dans la mesure où elles dénonceront une non conformité de la livraison avec les quantités de produits mentionnées dans la commande. <br />
                                    5.6 – Toute réserve portant sur la quantité des produits livrés doit être notifiée au transporteur lors de la livraison du produit. Une copie de cette notification émanant du transporteur doit être adressée par le Client à PureKréa (par courrier électronique) au plus tard 12 heures après que ces réserves aient été faites. <br />
                                    5.7 – Dans l’hypothèse de non-conformité des produits livrés par rapport à la commande, le Client devra adresser à PureKréa une lettre ou un courrier électronique de contestation. PureKréa procédera, selon le cas, à l’échange du ou des produits. La demande doit être effectuée dans les sept (7) jours ouvrés suivant la livraison des produits. Toute réclamation formulée hors de ce délai ne pourra être acceptée. Les produits doivent être renvoyés à PureKréa dans l’état dans lequel le client les a reçus. Les frais d’expédition seront à la charge du client. <br />
                                    5.8- Les frais de ports offerts, en cas d’expédition s’entendent pour une expédition sur la France métropolitaine. En cas de demande d’expédition à l’étranger, un devis de frais d’expédition sera adressé au client, selon la destination souhaitée.</p>

                                <p className={modalcgv.titre}>ARTICLE 6 – PAIEMENT</p>
                                <p>6.1 – Paiement par carte bancaire. <br />
                                    6.1.1 – Le client peut régler en ligne par carte bancaire ses achats via le module de paiement sécurisé. Le numéro de la carte bancaire, la date d’expiration ainsi que le cryptogramme visuel sont cryptés et transmis via le protocole sécurisé SSL au système de paiement en ligne de la CM-CIC p@iement sans que PureKréa ou des tiers ne puissent y avoir accès. Ces mêmes informations ne seront réutilisées qu’en cas d’éventuels retours, afin d’effectuer les remboursements correspondants. <br />
                                    6.1.2 – Le montant de la commande effectuée sur Internet est débité du compte du client au moment de la validation du paiement. <br />
                                    6.1.3 – Les données enregistrées et conservées par PureKréa constituent la preuve de la commande et de l’ensemble des transactions passées. Les données enregistrées par le système de paiement constituent la preuve des transactions financières. <br />
                                    6.1.4 – Les factures sont disponibles sur simple demande par mail à dans l'espace personnel du client ou sur simple demande par mail. <br />
                                    6.2 – Paiement par chèque bancaire ou postal. <br />
                                    6.2.1 – Le chèque doit être libellé en euros et établi à l’ordre de PureKréa. Le chèque devra être envoyé à l’adresse suivante : PureKréa – Place d'Armes – 78000 VERSAILLES. <br />
                                    6.2.3 – L’encaissement du chèque est effectué dès réception du chèque. <br />
                                    6.2.4 – Les factures sont émises lors de la livraison de la commande.</p>

                                <p className={modalcgv.titre}>ARTICLE 7 – DROIT DE RÉTRACTATION
                                </p>
                                <p>7.1 – Le client dispose d’un délai de sept jours francs à compter de la réception de la commande pour résilier le contrat de vente des produits conclu lors de la validation de la commande (article 3). Dans l’hypothèse ou les produits auraient été livres au client, celui- ci devra les restituer à PureKréa, sans avoir à justifier de motifs ni à payer de pénalités, mais devra payer le transport.</p>

                                <p className={modalcgv.titre}>ARTICLE 8 – GARANTIE / RESPONSABILITÉ</p>
                                <p>8.1 – Les produits sont conformes à la législation française. <br />
                                    8.2 – La responsabilité de PureKréa ne pourra être engagée en cas de retard de livraison, de grève (y compris dans les transports) ou de force majeure et, plus généralement, pour tout événement ne lui étant pas exclusivement et directement imputable. <br />
                                    8.3 – Les photographies illustrant les produits sur le site purekrea.com ne sont pas contractuelles. <br />
                                    8.4 – Le client accède, utilise et navigue sur le site purekrea.com à ses risques et périls. <br />
                                    8.5 – La société PureKréa n’a, pour toutes les étapes d’accès au site, qu’une obligation de moyens. La responsabilité de PureKréa ne saurait être engagé pour tout les inconvénients ou dommages inhérents à l’utilisation du réseau Internet, notamment une rupture du service, une intrusion extérieure, la présence de virus informatiques, ou de tout fait qualifié de force majeure, conformément à la jurisprudence. <br />
                                    8.6 – Le Client reconnaît et accepte , que, dans toutes la mesure admise par la réglementation applicable, PureKréa ne pourra être tenu responsable des dommages directs, indirects, fortuits, ou de la réparation d’un préjudice moral, de coûts, de pertes, de la diminution du chiffre d’affaires ou des bénéfices ou des passifs de quelques nature que ce soit (même si la réalisation d’un tel préjudice était connue ou aurait pu être prévue par PureKréa ), pouvant survenir de l’utilisation ou au contraire de l’impossibilité d’utiliser le site ou son contenu.</p>

                                <p className={modalcgv.titre}>ARTICLE 9 – REMBOURSEMENT
                                </p>
                                <p>9.1 – Les remboursements des produits dans les hypothèses visées à l’article 7.2 seront effectués dans un délai inférieur ou égal à 30 jours après la réception des produits par PureKréa. Le remboursement s’effectuera dans la même forme que celle utilisée par le Client pour réglée sa commande : par crédit sur le compte bancaire du client ou par chèque bancaire adressé au nom du Client par voie postale à l’adresse de facturation. <br />
                                    9.2 – En dehors du cas exposé dans l’article 7.1 du présent contrat, aucun renvoi contre remboursement ne sera accepté quel qu’en soit le motif.</p>

                                <p className={modalcgv.titre}>ARTICLE 10 – SERVICE CLIENTÈLE
                                </p>
                                <p>10.1 – Pour toute information ou question, le service Clientèle est à la disposition du client aux adresses suivantes : desmonet.pro@laposte.net ou Service Clientèle PureKréa, Place d'Armes - 78000 VERSAILLES.</p>

                                <p className={modalcgv.titre}>ARTICLE 11 – DROIT APPLICABLE – LITIGES
                                </p>
                                <p>11.1 – Le présent contrat est soumit au droit français et à la Convention de Vienne sur les contrats de vente internationale de marchandises. Tous les litiges relatifs à la relation commerciale existant entre les parties sont soumis à la compétence exclusive des juridictions françaises.</p>

                                <p className={modalcgv.titre}>ARTICLE 12 – DONNES PERSONNELLES
                                </p>
                                <p>12.1 – PureKréa s’engage à protéger les données personnelles communiquées par le Client. Toutes les données personnelles collectées par PureKréar sont traitées avec la plus stricte confidentialité, et font l’objet d’une déclaration à la Commission Nationale Informatique et Liberté (CNIL) conformément aux dispositions de la loi Informatique et Liberté de 1978.</p> <br />
                            </div>

                            <hr />

                            <div>
                                <h2 className={modalcgv.titreH1}>Conditions Générales d'Utilisation</h2>
                                <div className={modalcgv.divA1}>
                                    <p>
                                        Date de dernière mise à jour : 21/02/2025 <br />

                                        Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site web PureKréa, accessible à l'adresse purekrea.com. En accédant et en utilisant ce site, vous acceptez expressément les présentes CGU. Si vous n’acceptez pas ces conditions, nous vous prions de ne pas utiliser notre site.
                                    </p>
                                    <p className={modalcgv.titre}>1. Présentation du site
                                    </p>
                                    <p>Le site PureKréa est une plateforme en ligne proposant proposant des gammes de cravates en prêt-à-porter, avec la possibilité de vous les concevoir en sur-mesure.</p>

                                    <p className={modalcgv.titre}>2. Accès au site</p>
                                    <p>
                                        L'accès au site est réservé aux utilisateurs disposant d'une connexion internet. PureKréa ne pourra être tenu responsable de tout problème d'accès ou de dysfonctionnement lié à votre matériel informatique ou à votre fournisseur d'accès à internet. <br />
                                        Nous nous réservons le droit, à tout moment, de suspendre ou interrompre l'accès au site pour des raisons techniques, de maintenance, ou pour toute autre raison que nous jugerions nécessaire.</p>

                                    <p className={modalcgv.titre}>3. Comportement de l'utilisateur
                                    </p>
                                    <p>L'utilisateur s'engage à utiliser le site de manière responsable et conformément aux lois et règlements en vigueur. Il est interdit de : <br />
                                        <ul>
                                            <li className={modalcgv.li}>Utiliser le site pour des fins illégales ou frauduleuses ;
                                            </li>
                                            <li className={modalcgv.li}>Perturber ou interférer avec le bon fonctionnement du site ;
                                            </li>
                                            <li className={modalcgv.li}>Accéder sans autorisation aux systèmes ou données de PureKréa.
                                            </li>
                                        </ul>
                                        Tout comportement violant ces conditions pourra entraîner des sanctions, notamment la suspension de l'accès au site, sans préjudice des autres recours légaux.
                                    </p>

                                    <p className={modalcgv.titre}>4. Propriété intellectuelle</p>
                                    <p>Le contenu du site, y compris les textes, images, logos, graphiques, vidéos, et autres éléments, est protégé par les droits d’auteur et autres droits de propriété intellectuelle. Aucune partie du contenu du site ne peut être reproduite, distribuée, modifiée ou exploitée de quelque manière que ce soit sans l'accord préalable écrit de PureKréa.</p>

                                    <p className={modalcgv.titre}>5. Collecte et traitement des données personnelles
                                    </p>
                                    <p>La collecte et le traitement des données personnelles sur le site sont régis par notre Politique de Confidentialité, accessible ci-dessus. En utilisant notre site, vous consentez au traitement de vos données conformément à cette politique.</p>

                                    <p className={modalcgv.titre}>6. Liens vers des sites tiers</p>
                                    <p>Le site peut contenir des liens vers des sites externes. Ces liens sont fournis à titre informatif et ne signifient pas que PureKréa approuve ces sites ou leur contenu. Nous ne sommes pas responsables du contenu, de la sécurité ou de la politique de confidentialité de ces sites tiers.</p>

                                    <p className={modalcgv.titre}>7. Responsabilité
                                    </p>
                                    <p>
                                        Le site est fourni "tel quel" et PureKréa ne garantit en aucun cas l'exactitude, la fiabilité ou la disponibilité continue de ses services. Nous nous efforçons de fournir des informations exactes, mais ne pouvons être tenus responsables des erreurs, omissions ou dommages pouvant résulter de l’utilisation du site. <br />
                                        PureKréa ne pourra être tenu responsable des dommages directs ou indirects résultant de l’utilisation du site, y compris les pertes de données ou de profits.</p>

                                    <p className={modalcgv.titre}>8. Modifications des CGU
                                    </p>
                                    <p>PureKréa se réserve le droit de modifier ces Conditions Générales d'Utilisation à tout moment. Les modifications seront publiées sur cette page, avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page afin de prendre connaissance des éventuelles modifications.</p>

                                    <p className={modalcgv.titre}>9. Droit applicable et litiges
                                    </p>
                                    <p>Les présentes Conditions Générales d'Utilisation sont soumises au droit français. En cas de litige, les parties s'efforceront de résoudre le conflit à l'amiable. À défaut, le litige sera soumis aux juridictions compétentes.</p>

                                    <p className={modalcgv.titre}>10. Contact
                                    </p>
                                    <p>
                                        Pour toute question concernant ces Conditions Générales d'Utilisation, vous pouvez nous contacter à l'adresse suivante :
                                        Email : desmonet.pro@laposte.net <br />
                                        Adresse : Place d'Armes - 78600 VERSAILLES
                                    </p>
                                </div>
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

export default ModalePolitique