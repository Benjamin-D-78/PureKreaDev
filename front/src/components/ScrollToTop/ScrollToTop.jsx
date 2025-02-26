import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0) // Coordonnées X et Y à 0 (on retourne en haut de page)
    }, [location])

  return null // Ce composant ne retourne rien et agit seulement sur l'effet
}

export default ScrollToTop