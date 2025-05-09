import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gauche from "../../images/Icones/gauche.png";
import droite from "../../images/Icones/droite.png";
import caroussel from "./petitcaroussel.module.css";
import { URL } from '../../utils/constantes';
import axiosInstance from '../../utils/axiosInstance';

const PetitCaroussel = () => {

    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [slide, setSlide] = useState(0);

    const slideSuivante = () => {
        setSlide(slide === images.length - 1 ? 0 : slide + 1)
    }

    const slidePrecedente = () => {
        setSlide(slide === 0 ? images.length - 1 : slide - 1)
    }

    useEffect(() => {
        const pictures = async () => {
            if (URL.ITEM_ALL) {
                try {
                    const response = await axiosInstance.get(URL.ITEM_ALL)
                    // console.log("Réponse de l'API:", response.data);
                    if (Array.isArray(response.data)) {
                        setImages(response.data);
                    }
                    setLoading(false)
                } catch (error) {
                    setError("Problème lors de la récupération des articles", error.message)
                    setLoading(false)
                }
            }
        }
        pictures()
    }, [])

    if (loading) return;


    return (
        <div>
            <div className={caroussel.contientCaroussel}>
                <div className={caroussel.caroussel}>
                    <div className={caroussel.contientGauche}>
                        <img
                            onClick={slidePrecedente}
                            className={caroussel.gauche}
                            src={gauche}
                            alt="Flèche gauche" />
                    </div>

                    <div>
                        <span className={caroussel.spanBoutique}>Boutique</span>
                        {images?.map((image, index) => (
                            <Link key={image._id} to={{ pathname: `/details/${image._id}` }}>
                                <img
                                    className={slide === index ? caroussel.slide : `${caroussel.slide} ${caroussel.slideCachee}`}
                                    src={image.picture.img}
                                    alt={image.name}
                                    key={image._id} />
                            </Link>
                        ))}
                    </div>
                    <div className={caroussel.contientDroite}>
                        <img
                            onClick={slideSuivante}
                            className={caroussel.droite}
                            src={droite}
                            alt="Flèche droite" />
                    </div>
                    <span className={caroussel.contientIndicateur}>
                        {images.map((image) => {
                            return (
                                <button
                                    key={image._id}
                                    onClick={() => setSlide(images.indexOf(image))} // indexOf permet de trouver l'index de l'image actuelle
                                    className={slide === images.indexOf(image) ? caroussel.indicateur : `${caroussel.indicateur} ${caroussel.indicateurInactif}`}>
                                </button>
                            )
                        })}
                    </span>

                </div>
            </div>
        </div>
    )
}

export default PetitCaroussel