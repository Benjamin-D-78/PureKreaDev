import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import items from "./css/items.module.css"

// EXTERNALISATION
import { URL } from '../../utils/constantes'
import { RGXR, ONINPUT, PATTERN } from '../../utils/regex'
import axiosInstance from '../../utils/axiosInstance'
import { ERROR } from '../../utils/error'

const UpdateItems = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth);

    const images = ["img", "img2"]
    const [item, setItem] = useState({
        name: "",
        width: "",
        color: "",
        content: "",
        detail: "",
        category: "",
        stock: "",
        price: "",
        picture: {
            img: "",
            img2: "",
        },
        status: true,
    })

    const [error, setError] = useState({
        name: "",
        width: "",
        color: "",
        content: "",
        detail: "",
        category: "",
        stock: "",
        price: "",
        picture: {
            img: "",
            img2: ""
        },
    })

    useEffect(() => {
        const itemById = async () => {
            if (auth && auth.role === "admin") {
                if (URL.ITEM_BY_ID) {
                    try {
                        const response = await axiosInstance.get(`${URL.ITEM_BY_ID}/${id}`)
                        // console.log(response.data)
                        setItem(response.data)
                    } catch (error) {
                        console.error("Erreur lors de la recherche de l'item.", error.message)
                    }
                }
            };
        }
        itemById();
    }, [auth, id])
    

    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        if (item.name) {
            const nameRegexr = RGXR.ITEM_NAME;
            if (!nameRegexr.test(item.name) || item.name.length < 2 || item.name.length > 30) {
                messageError.name = ERROR.I_NAME
                isValid = false;
            }
        }

        if (item.width) {
            const widthRegexr = RGXR.ITEM_WIDTH;
            if (!widthRegexr.test(item.width) || item.width.length < 1 || item.width.length > 6) {
                messageError.width = ERROR.I_WIDTH
                isValid = false;
            }
        }

        if (item.color) {
            const colorRegexr = RGXR.ITEM_COLOR;
            if (!colorRegexr.test(item.color) || item.color.length < 2 || item.color.length > 30) {
                messageError.color = ERROR.I_COLOR
                isValid = false;
            }
        }

        if (item.content) {
            const contentRegexr = RGXR.ITEM_CONTENT;
            if (!contentRegexr.test(item.content) || item.content.length < 2 || item.content.length > 60) {
                messageError.content = ERROR.I_CONTENT
                isValid = false;
            }
        }

        if (item.detail) {
            const detailRegexr = RGXR.ITEM_DETAIL;
            if (!detailRegexr.test(item.detail) || item.detail.length < 2 || item.detail.length > 60) {
                messageError.detail = ERROR.I_DETAILS
                isValid = false;
            }
        }

        if (item.category) {
            const categoryRegexr = RGXR.ITEM_CATEGORY;
            if (!categoryRegexr.test(item.category) || item.category.length < 1 || item.category.length > 4) {
                messageError.category = ERROR.I_CATEGORY
                isValid = false;
            }
        }

        if (item.stock) {
            const stockRegexr = RGXR.ITEM_STOCK;
            if (!stockRegexr.test(item.stock) || item.stock.length < 1 || item.stock.length > 6) {
                messageError.stock = ERROR.I_STOCK
                isValid = false;
            }
        }

        if (item.price) {
            const priceRegexr = RGXR.ITEM_PRICE;
            if (!priceRegexr.test(item.price) || item.price.length < 1 || item.price.length > 7) {
                messageError.price = ERROR.I_PRICE
                isValid = false;
            }
        }

        if (item.picture) {
            const imageRegexr = RGXR.ITEM_IMAGE;
            if (!imageRegexr.test(item.picture.img) || item.picture.img.length < 1 || item.picture.img.length > 200) {
                isValid = false;
            }
        }

        if (item.picture) {
            const imageRegexr = RGXR.ITEM_IMAGE;
            if (!imageRegexr.test(item.picture.img2) || item.picture.img2.length < 1 || item.picture.img2.length > 200) {
                isValid = false;
            }
        }

        setError(messageError);
        return isValid;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith("img")) { // On vérifie que la chaîne de caractère commence bien par "img" grpace à "startsWith"
            setItem(prev => ({
                ...prev, // Garde toutes les propriétés précédentes
                picture: { ...prev.picture, [name]: value }
            }));
        } else {
            setItem(prev => ({ ...prev, [name]: value }))
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (item.name === "" || item.width === "" || item.color === "" || item.content === "" || item.detail === "" || item.category === "" || item.stock === "" || item.price === "") {
            toast.error("Tous les champs sont obligatoire.", { autoClose: 3000 })
            return;
        }

        if (!formulaire()) return;

        if (URL.ITEM_UPDATE) {
            try {
                const response = await axiosInstance.put(`${URL.ITEM_UPDATE}/${id}`, item);
                console.log(response)
                // if (response.status === 200) {
                navigate("/dashboard/items")
                toast.success("Item mis à jour avec succès.", { autoClose: 1000 })
                // }
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'item : ", error);
                toast.error("Erreur lors de la mise à jour de l'item.", { autoClose: 3000 })
            }
        } else {
            toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })
        }
    };


    return (
        <div>
            <h1 className={items.h1}>Modifier un item</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className={items.div1}>
                    <label htmlFor="name">Nom de l'item :</label>
                    <input
                        className={items.inputItem}
                        id="name"
                        type="text"
                        name="name"
                        value={item.name}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={2}
                        maxLength={30}
                        pattern={PATTERN.ITEM_NAME}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_NAME, '')
                        }}
                    />
                    {error.name && <span className={items.spanError}>{error.name}</span>}

                    <label htmlFor="width">Largeur :</label>
                    <input
                        className={items.inputItem}
                        id="width"
                        type="text"
                        name="width"
                        value={item.width}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={1}
                        maxLength={6}
                        // min={1}
                        // max={100}
                        // step="0.1"
                        pattern={PATTERN.ITEM_WIDTH}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_WIDTH, '')
                        }}
                    />
                    {error.width && <span className={items.spanError}>{error.width}</span>}

                    <label htmlFor="color">Couleur :</label>
                    <input
                        className={items.inputItem}
                        id="color"
                        type="text"
                        name="color"
                        value={item.color}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={2}
                        maxLength={30}
                        pattern={PATTERN.ITEM_COLOR}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_COLOR, '')
                        }}
                    />
                    {error.color && <span className={items.spanError}>{error.color}</span>}

                    <label htmlFor="content">Autre(s) couleur(s) :</label>
                    <input
                        className={items.inputItem}
                        id="content"
                        type="text"
                        name="content"
                        value={item.content}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={2}
                        maxLength={60}
                        pattern={PATTERN.ITEM_CONTENT}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_CONTENT, '')
                        }}
                    />
                    {error.content && <span className={items.spanError}>{error.content}</span>}

                    <label htmlFor="detail">Motifs :</label>
                    <input
                        className={items.inputItem}
                        id="detail"
                        type="text"
                        name="detail"
                        value={item.detail}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={2}
                        maxLength={60}
                        pattern={PATTERN.ITEM_DETAIL}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_DETAILS, '')
                        }}
                    />
                    {error.detail && <span className={items.spanError}>{error.detail}</span>}

                    <label htmlFor="category">Collection :</label>
                    <input
                        className={items.inputItem}
                        id="category"
                        type="text"
                        name="category"
                        value={item.category}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={4}
                        maxLength={4}
                        pattern={PATTERN.ITEM_CATEGORY}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_CATEGORY, '')
                        }}
                    />
                    {error.category && <span className={items.spanError}>{error.category}</span>}

                    <label htmlFor="stock">Stock :</label>
                    <input
                        className={items.inputItem}
                        id="stock"
                        type="text"
                        name="stock"
                        value={item.stock}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={1}
                        maxLength={6}
                        // max={999}
                        pattern={PATTERN.ITEM_STOCK}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_STOCK, '')
                        }}
                    />
                    {error.stock && <span className={items.spanError}>{error.stock}</span>}

                    <label htmlFor="price">Prix :</label>
                    <input
                        className={items.inputItem}
                        id="price"
                        type="text"
                        name="price"
                        value={item.price}
                        required
                        onChange={handleChange}
                        onBlur={formulaire}
                        minLength={1}
                        maxLength={7}
                        // max={9999}
                        // step="0.1"
                        pattern={PATTERN.ITEM_PRICE}
                        onInput={(event) => {
                            event.target.value = event.target.value.replace(ONINPUT.I_PRICE, '')
                        }}
                    />
                    {error.price && <span className={items.spanError}>{error.price}</span>}

                    {images?.map((imgName, index) => (
                        <div key={index}>
                            <label htmlFor={`image${index}`}>
                                {index === 0 ? 'Image principale : ' : `Image ${index + 1}`}
                            </label>
                            <input
                                className={items.inputItem}
                                id={`image${index}`}
                                type="text"
                                name={imgName}
                                onChange={handleChange}
                                value={item.picture[imgName] ? item.picture[imgName] : ""}
                                onBlur={formulaire}
                                minLength={1}
                                maxLength={200}
                                pattern={PATTERN.ITEM_IMAGE}
                            />
                        </div>
                    ))}

                    {/* <label htmlFor="status">En ligne : </label>
                        <input
                            className={items.checkItem}
                            id="status"
                            type="checkbox"
                            name="status"
                            checked={item.status}
                            onChange={(event) =>
                                setItem((prev) => ({ ...prev, status: event.target.checked }))
                            }
                        /> */}
                    <div className={items.divBtnAjouter}>
                        <button className={items.boutonItemUP}>Mettre à jour l'item</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateItems