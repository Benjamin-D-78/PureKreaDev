import { React, useState, useEffect } from "react";
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import axios from "axios"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../utils/Constantes";

// ICONES
import supprimer from "../../images/Icones/supprimer.png"
import modifier from "../../images/Icones/modifier.png"


const Items = () => {

    const [items, setItems] = useState([])
    const [error, setError] = useState(null)


    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`${URL.ITEM_DELETE}/${id}`);

            if (response.status === 200) {
                console.log(response.data)
                toast.success("Item supprimé avec succès.", { autoClose: 1000 });
                setItems((prevItems) => prevItems.filter((item) => item._id !== id));
            } // On met à jour le state local en retirant de la liste l'item supprimé.
        } catch (error) {
            console.log("Erreur lors de la suppression de l'item", error);
            toast.error("Erreur lors de la suppression de l'item", { autoClose: 3000 })

        }
    };


    const depart = async () => {
        try {
            const response = await axios.get(URL.ITEM_ALL);
            setItems(response.data);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => { depart() }, []);

    if (error) return <> <p>{error}</p> </>;

    return (
        <div>
            <h1 className={boutique_dashboard.h1}>Liste des items</h1>

            <table className={boutique_dashboard.tableItem}>
                <thead>
                    <tr className={boutique_dashboard.enteteItem}>
                        <th>Nom</th>
                        <th className={boutique_dashboard.thCache}>Largeur</th>
                        <th className={boutique_dashboard.thCache}>Couleur</th>
                        <th className={boutique_dashboard.thCache}>Autre(s)</th>
                        <th className={boutique_dashboard.thCache}>Motifs</th>
                        <th className={boutique_dashboard.thCache}>Collection</th>
                        <th>Stock</th>
                        <th>Prix</th>
                        <th>Images</th>
                        <th className={boutique_dashboard.thButton}><button className={boutique_dashboard.refreshItems} onClick={depart}>Raffraîchir</button></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td className={boutique_dashboard.autresTD}>{item.name}</td>
                            <td className={boutique_dashboard.autresTDcache}>{item.width}cm</td>
                            <td className={boutique_dashboard.autresTDcache}>{item.color}</td>
                            <td className={boutique_dashboard.autresTDcache}>{item.content}</td>
                            <td className={boutique_dashboard.autresTDcache}>{item.detail}</td>
                            <td className={boutique_dashboard.autresTDcache}>{item.category}</td>
                            <td className={boutique_dashboard.autresTD}>{item.stock}</td>
                            <td className={boutique_dashboard.autresTD}>{item.price}€</td>
                            <td className={boutique_dashboard.imagesTD}>
                                <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={item.picture.img} alt={item.name} /></div>

                                {item.picture.img2 && <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={item.picture.img2} alt={`${item.name} 2`} /></div>}

                                {item.picture.img3 && <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={item.picture.img3} alt={`${item.name} 3`} /></div>}

                            </td>
                            <td className={boutique_dashboard.boutonsTD}>
                                <div className={boutique_dashboard.contientIMG}>
                                    <Link to={{ pathname: `/dashboard/update/item/${item._id}` }}><img src={modifier} alt="Icone de modification" /></Link>
                                    <img onClick={() => deleteItem(item._id)} src={supprimer} alt="Icone de suppresion" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Items;