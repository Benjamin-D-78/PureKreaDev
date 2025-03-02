import loading from "./loading.module.css"
import laurier from "../../images/Icones/laurier.jpg"

const Loading = () => {
  return (
    <div className={loading.conteneur}>
        <div lassName={loading.g}>test</div>
        <div lassName={loading.m}><p>En cours de chargement</p></div>
        <div lassName={loading.d}>test</div>
    </div>
  )
}

export default Loading