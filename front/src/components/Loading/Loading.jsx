import loading from "./loading.module.css"
import laurier from "../../images/Icones/laurier.jpg"

const Loading = () => {
  return (
    <div className={loading.conteneur}>
        <div lassName={loading.g}></div>
        <div lassName={loading.m}><img src={laurier} alt="Laurier" /></div>
        <div lassName={loading.d}></div>
    </div>
  )
}

export default Loading