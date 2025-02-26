import { React, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
import { URL } from '../../utils/Constantes';
import { RGXR, PATTERN } from '../../utils/Regixr';

// CSS
import items from "../Dashboard/css/items.module.css"

function UpdateUsers() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ancienMDP, setAncienMDP] = useState("");
  const [newMDP, setNewMDP] = useState("");
  const [repeteMDP, setRepeteMDP] = useState("");

  const [utilisateur, setUtilisateur] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    postal: "",
    town: "",
    role: "",
  });

  const [error, setError] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    adress: "",
    postal: "",
    town: ""
  })

  useEffect(() => {
    const userById = async () => {
      if (URL.USER_BY_ID) {
        try {
          const response = await axios.get(`${URL.USER_BY_ID}/${id}`, { withCredentials: true });
          setUtilisateur({
            firstname: response.data.firstname || "",
            lastname: response.data.lastname || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            adress: response.data.adress || "",
            postal: response.data.postal || "",
            town: response.data.town || "",
            role: response.data.role || "",
          });
        } catch (error) {
          console.error("Erreur lors de la recherche de l'utilisateur.", error.message);
        }
      }
    };
    userById();
  }, [id]);



  const formulaire = () => {
    const messageError = {};
    let isValid = true;

    if (utilisateur.lastname) {
      const lastnameRegexr = RGXR.NOM;
      if (!lastnameRegexr.test(utilisateur.lastname) || utilisateur.lastname.length < 2 || utilisateur.lastname.length > 30) {
        messageError.lastname = "Entre 2 et 30 caractères attendus."
        isValid = false;
      }
    }

    if (utilisateur.firstname) {
      const firstnameRegexr = RGXR.PRENOM;
      if (!firstnameRegexr.test(utilisateur.firstname) || utilisateur.firstname.length < 2 || utilisateur.firstname.length > 30) {
        messageError.firstname = "Entre 2 et 30 caractères attendus."
        isValid = false;
      }
    }

    if (utilisateur.email) {
      const emailRegexr = RGXR.EMAIL;
      if (!emailRegexr.test(utilisateur.email) || utilisateur.email.length < 8 || utilisateur.email.length > 60) {
        messageError.email = "Entre 8 et 60 caractères attendus."
        isValid = false;
      }
    }

    if (utilisateur.phone) {
      const phoneRegexr = RGXR.PHONE;
      if (!phoneRegexr.test(utilisateur.phone) || utilisateur.phone.length < 10 || utilisateur.phone.length > 10) {
        messageError.phone = "10 chiffres attendus."
        isValid = false;
      }
    }

    if (utilisateur.adress) {
      const adressRegexr = RGXR.ADRESS;
      if (!adressRegexr.test(utilisateur.adress) || utilisateur.adress.length < 8 || utilisateur.adress.length > 70) {
        messageError.adress = "Adresse : Entre 8 et 70 caractères attendus."
        isValid = false;
      }
    }

    if (utilisateur.postal) {
      const postalRegexr = RGXR.POSTAL;
      if (!postalRegexr.test(utilisateur.postal) || utilisateur.postal.length < 5 || utilisateur.postal.length > 5) {
        messageError.postal = " Code postal : 5 chiffres attendus."
        isValid = false;
      }
    }

    if (utilisateur.town) {
      const townRegexr = RGXR.TOWN;
      if (!townRegexr.test(utilisateur.town) || utilisateur.town.length < 2 || utilisateur.town.length > 50) {
        messageError.town = "Ville : Entre 2 et 50 caractères attendus."
        isValid = false;
      }
    }

    setError(messageError);
    return isValid;
  }


  const checkInput = (event) => {
    const { name } = event.target;
    formulaire()
  }


  const handleChange = (event) => {
    const { name, value } = event.target
    setUtilisateur(prev => ({ ...prev, [name]: value }))
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formulaire()) return;

    const updateUser = {};

    // if (newMDP && newMDP !== "") {
    //   if (!ancienMDP || ancienMDP === "") {
    //     toast.error("Le mot de passe actuel est requis pour changer de mot de passe.");
    //     return;
    //   }

    //   updateUser.password = newMDP;
    //   updateUser.ancienMDP = ancienMDP;
    // }

    if (utilisateur.lastname !== "") updateUser.lastname = utilisateur.lastname
    if (utilisateur.firstname !== "") updateUser.firstname = utilisateur.firstname
    if (utilisateur.email !== "") updateUser.email = utilisateur.email
    if (utilisateur.phone !== "") updateUser.phone = utilisateur.phone
    if (utilisateur.adress !== "") updateUser.adress = utilisateur.adress
    if (utilisateur.postal !== "") updateUser.postal = utilisateur.postal
    if (utilisateur.town !== "") updateUser.town = utilisateur.town
    if (utilisateur.role !== "") updateUser.role = utilisateur.role

    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth)

    if (auth.role === "admin")
      if (URL.USER_UPDATE) {
        try {
          const response = await axios.put(`${URL.USER_UPDATE}/${id}`, updateUser, { withCredentials: true })
          if (response.status === 200) {
            navigate("/dashboard/utilisateurs")
            toast.success("Informations utilisateur mises à jour avec succès.", { autoClose: 1000 })
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'utilisateur : ", error)
          toast.error("Erreur lors de la mise à jour de l'utilisateur.", { autoClose: 3000 })
        }
      } else {
        toast.error("Veuillez réessayer plus tard.", { autoClose: 3000 })
      }
  }


  return (
    <div>
      <h1 className={items.h1}>Modifier un utilisateur</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className={items.div1}>

          <label htmlFor="firstname">Prénom :</label>
          <input
            className={items.inputItem}
            type="text"
            name='firstname'
            value={utilisateur.firstname}
            onChange={handleChange}
            onBlur={checkInput}
            minLength={2}
            maxLength={30}
            pattern={PATTERN.PRENOM}
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '')
            }}
          />
          {error.firstname && <span className={items.spanError}>{error.firstname}</span>}

          <label htmlFor="lastname">Nom :</label>
          <input
            className={items.inputItem}
            type="text"
            name='lastname'
            value={utilisateur.lastname}
            onChange={handleChange}
            onBlur={checkInput}
            minLength={2}
            maxLength={30}
            pattern={PATTERN.NOM}
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '').toUpperCase();
            }}
          />
          {error.lastname && <span className={items.spanError}>{error.lastname}</span>}

          <label htmlFor="email">E-mail :</label>
          <input
            className={items.inputItem}
            type="text"
            name='email'
            value={utilisateur.email}
            onChange={handleChange}
            onBlur={checkInput}
            minLength={8}
            maxLength={60}
            pattern={PATTERN.EMAIL}
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
            }} />
          {error.email && <span className={items.spanError}>{error.email}</span>}

          <label htmlFor="phone">Téléphone :</label>
          <input
            className={items.inputItem}
            type="text"
            name='phone'
            value={utilisateur.phone}
            onChange={handleChange}
            onBlur={checkInput}
            minLength={10}
            maxLength={10}
            pattern={PATTERN.PHONE}
            onInput={(event) => {
              event.target.value = event.target.value.replace(/\D/g, '')
            }} />
          {error.phone && <span className={items.spanError}>{error.phone}</span>}

          <label htmlFor="adress">Adresse :</label>
          <input
            className={items.inputItem}
            type="text"
            name='adress'
            value={utilisateur.adress}
            onChange={handleChange}
            onBlur={checkInput}
            minLength={8}
            maxLength={70}
            pattern={PATTERN.ADRESS}
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s\-'^¨èéàù]/g, '');
            }} />
          {error.adress && <span className={items.spanError}>{error.adress}</span>}

          <label htmlFor="postal">Code postal :</label>
          <input
            className={items.inputItem}
            type="text"
            name='postal'
            value={utilisateur.postal}
            onChange={handleChange}
            onBlur={checkInput}
            minLength={5}
            maxLength={5}
            pattern={PATTERN.POSTAL}
            onInput={(event) => {
              event.target.value = event.target.value.replace(/\D/g, '')
            }} />
          {error.postal && <span className={items.spanError}>{error.postal}</span>}

          <label htmlFor="town">Ville :</label>
          <input
            className={items.inputItem}
            type="text"
            name='town'
            value={utilisateur.town}
            onChange={handleChange}
            onBlur={checkInput}
            minLength={2}
            maxLength={50}
            pattern={PATTERN.TOWN}
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[^a-zA-Z\s\-'^¨èéàù]/g, '').toUpperCase();;
            }} />
          {error.town && <span className={items.spanError}>{error.town}</span>}

          <label htmlFor="role">Rôle :</label>
          <select
            name="role"
            id="role"
            onChange={handleChange}>
            <option>{utilisateur.role === "user" ? "user" : "admin"}</option>
            <option>{utilisateur.role === "user" ? "admin" : "user"}</option>
          </select>

          <div className={items.divBtnAjouter}>
            <button className={items.boutonItemUP}>Mettre à jour</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateUsers