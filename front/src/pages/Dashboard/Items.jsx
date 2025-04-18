import { useState } from 'react'
import { toast } from 'react-toastify'
import items from "./css/items.module.css"
import BoutiqueDashboard from './BoutiqueDashboard'

// EXTERNALISATION
import axiosInstance from '../../utils/axiosInstance'
import { URL } from '../../utils/constantes'
import { RGXR, ONINPUT, PATTERN } from '../../utils/regex'
import { ERROR } from '../../utils/error'

const AjoutItem = () => {

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
    // Si le champ qu’on est en train de modifier est une image, je vais le ranger dans un objet à part (picture) dans mon state.
    if (name.startsWith("img")) { // On vérifie que la chaîne de caractère commence bien par "img"
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

    if (URL.ITEM_CREATION) {
      try {
        const response = await axiosInstance.post(URL.ITEM_CREATION, item)
          console.log(response)
          toast.success("Item créé avec succès.", { autoClose: 1000 })
      } catch (error) {
        console.error("Echec de la création de l'item : ", error.message)
        toast.error("Echec de la création de l'item", { autoClose: 3000 })
      }
    } else {
      toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })
    }
  }

  return (
    <div className={items.conteneurPrincipal}>
      <h1 className={items.h1}>Ajouter un produit</h1>
      <div className={items.div1}>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name"> Nom du produit * :</label>
          <input
            className={items.inputItem}
            id='name'
            type="text"
            name='name'
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
          <br />
          <label htmlFor="width"> Largeur * :</label>
          <input
            className={items.inputItem}
            id='width'
            type="text"
            name='width'
            // step=".1"
            required
            onChange={handleChange}
            onBlur={formulaire}
            minLength={1}
            maxLength={6}
            pattern={PATTERN.ITEM_WIDTH}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.I_WIDTH, '')
            }} />
          {error.width && <span className={items.spanError}>{error.width}</span>}

          <br />
          <label htmlFor="color"> Couleur * :</label>
          <input
            className={items.inputItem}
            id='color'
            type="text"
            name='color'
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
          <br />
          <label htmlFor="content"> Autre(s) couleur(s) * :</label>
          <input
            className={items.inputItem}
            id='content'
            type="text"
            name='content'
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
          <br />
          <label htmlFor="detail"> Motifs * :</label>
          <input
            className={items.inputItem}
            id='detail'
            type="text"
            name='detail'
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
          <br />
          <label htmlFor="category"> Collection * :</label>
          <input
            className={items.inputItem}
            id='category'
            type="text"
            name='category'
            required
            onChange={handleChange}
            onBlur={formulaire}
            minLength={4}
            maxLength={4}
            pattern={PATTERN.ITEM_CATEGORY}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.I_CATEGORY, '')
            }} />
          {error.category && <span className={items.spanError}>{error.category}</span>}
          <br />
          <label htmlFor="stock"> Stock * :</label>
          <input
            className={items.inputItem}
            id='stock'
            type="text"
            name='stock'
            required
            onChange={handleChange}
            onBlur={formulaire}
            minLength={1}
            maxLength={6}
            pattern={PATTERN.ITEM_STOCK}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.I_STOCK, '')
            }} />
          {error.stock && <span className={items.spanError}>{error.stock}</span>}
          <br />
          <label htmlFor="price"> Prix * :</label>
          <input
            className={items.inputItem}
            id='price'
            type="text"
            name='price'
            required
            onChange={handleChange}
            onBlur={formulaire}
            minLength={1}
            maxLength={7}
            pattern={PATTERN.ITEM_PRICE}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.I_PRICE, '')
            }} />
          {error.price && <span className={items.spanError}>{error.price}</span>}
          <br />

          {images.map((imgName, index) => (
            <div key={index}>
              <label
                htmlFor={`image${index}`}>
                {index === 0 ? "Image principale : " : `Image ${index + 1} :`}
              </label>
              <input
                className={items.inputItem}
                id={`image${index}`}
                type="text"
                name={imgName}
                placeholder={`Image ${imgName.slice(-1)}`}
                onChange={handleChange}
                onBlur={formulaire}
                minLength={1}
                maxLength={200}
                pattern={PATTERN.ITEM_IMAGE}
              />
              <br />
            </div>
          ))}
          <div className={items.divBtnAjouter}>
            <button className={items.boutonItem}>Ajouter</button>
          </div>
        </form>
      </div>
      <BoutiqueDashboard />
    </div>
  )
}

export default AjoutItem;
