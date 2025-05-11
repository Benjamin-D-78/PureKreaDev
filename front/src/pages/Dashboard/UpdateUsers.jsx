import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

// EXTERNALISATION
import axiosInstance from '../../utils/axiosInstance';
import { URL } from '../../utils/constantes';
import { RGXR, ONINPUT, PATTERN } from '../../utils/regex';
import { ERROR } from '../../utils/error';

// CSS
import items from "../Dashboard/css/items.module.css"

function UpdateUsers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext)


  // const [ancienMDP, setAncienMDP] = useState("");
  // const [newMDP, setNewMDP] = useState("");
  // const [repeteMDP, setRepeteMDP] = useState("");

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
      if (auth && auth.role === "admin") {
        if (URL.USER_BY_ID) {
          try {
            const response = await axiosInstance.get(`${URL.USER_BY_ID}/${id}`, { withCredentials: true });
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
    }
    userById();
  }, [auth, id]);



  const formulaire = () => {
    const messageError = {};
    let isValid = true;

    if (utilisateur.lastname) {
      const lastnameRegexr = RGXR.NOM;
      if (!lastnameRegexr.test(utilisateur.lastname) || utilisateur.lastname.length < 2 || utilisateur.lastname.length > 30) {
        messageError.lastname = ERROR.U_LASTNAME
        isValid = false;
      }
    }

    if (utilisateur.firstname) {
      const firstnameRegexr = RGXR.PRENOM;
      if (!firstnameRegexr.test(utilisateur.firstname) || utilisateur.firstname.length < 2 || utilisateur.firstname.length > 30) {
        messageError.firstname = ERROR.U_FIRSTNAME
        isValid = false;
      }
    }

    if (utilisateur.email) {
      const emailRegexr = RGXR.EMAIL;
      if (!emailRegexr.test(utilisateur.email) || utilisateur.email.length < 8 || utilisateur.email.length > 60) {
        messageError.email = ERROR.U_EMAIL
        isValid = false;
      }
    }

    if (utilisateur.phone) {
      const phoneRegexr = RGXR.PHONE;
      if (!phoneRegexr.test(utilisateur.phone) || utilisateur.phone.length < 10 || utilisateur.phone.length > 10) {
        messageError.phone = ERROR.U_PHONE
        isValid = false;
      }
    }

    if (utilisateur.adress) {
      const adressRegexr = RGXR.ADRESS;
      if (!adressRegexr.test(utilisateur.adress) || utilisateur.adress.length < 8 || utilisateur.adress.length > 70) {
        messageError.adress = ERROR.U_ADRESS
        isValid = false;
      }
    }

    if (utilisateur.postal) {
      const postalRegexr = RGXR.POSTAL;
      if (!postalRegexr.test(utilisateur.postal) || utilisateur.postal.length < 5 || utilisateur.postal.length > 5) {
        messageError.postal = ERROR.U_POSTAL
        isValid = false;
      }
    }

    if (utilisateur.town) {
      const townRegexr = RGXR.TOWN;
      if (!townRegexr.test(utilisateur.town) || utilisateur.town.length < 2 || utilisateur.town.length > 50) {
        messageError.town = ERROR.U_TOWN
        isValid = false;
      }
    }

    setError(messageError);
    return isValid;
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
    const auth = userAuth && JSON.parse(userAuth) // On convertit les données (chaîne de caractères) en objet JS.

    if (auth.role === "admin")
      if (URL.USER_UPDATE) {
        try {
          const response = await axiosInstance.put(`${URL.USER_UPDATE}/${id}`, updateUser, { withCredentials: true })
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
            onBlur={formulaire}
            minLength={2}
            maxLength={30}
            pattern={PATTERN.PRENOM}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.U_PRENOM, '')
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
            onBlur={formulaire}
            minLength={2}
            maxLength={30}
            pattern={PATTERN.NOM}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.U_NOM, '').toUpperCase();
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
            onBlur={formulaire}
            minLength={8}
            maxLength={60}
            pattern={PATTERN.EMAIL}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.U_EMAIL, '').toLowerCase();
            }} />
          {error.email && <span className={items.spanError}>{error.email}</span>}

          <label htmlFor="phone">Téléphone :</label>
          <input
            className={items.inputItem}
            type="text"
            name='phone'
            value={utilisateur.phone}
            onChange={handleChange}
            onBlur={formulaire}
            minLength={10}
            maxLength={10}
            pattern={PATTERN.PHONE}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.U_PHONE, '')
            }} />
          {error.phone && <span className={items.spanError}>{error.phone}</span>}

          <label htmlFor="adress">Adresse :</label>
          <input
            className={items.inputItem}
            type="text"
            name='adress'
            value={utilisateur.adress}
            onChange={handleChange}
            onBlur={formulaire}
            minLength={8}
            maxLength={70}
            pattern={PATTERN.ADRESS}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.U_ADRESS, '');
            }} />
          {error.adress && <span className={items.spanError}>{error.adress}</span>}

          <label htmlFor="postal">Code postal :</label>
          <input
            className={items.inputItem}
            type="text"
            name='postal'
            value={utilisateur.postal}
            onChange={handleChange}
            onBlur={formulaire}
            minLength={5}
            maxLength={5}
            pattern={PATTERN.POSTAL}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.U_POSTAL, '')
            }} />
          {error.postal && <span className={items.spanError}>{error.postal}</span>}

          <label htmlFor="town">Ville :</label>
          <input
            className={items.inputItem}
            type="text"
            name='town'
            value={utilisateur.town}
            onChange={handleChange}
            onBlur={formulaire}
            minLength={2}
            maxLength={50}
            pattern={PATTERN.TOWN}
            onInput={(event) => {
              event.target.value = event.target.value.replace(ONINPUT.U_TOWN, '').toUpperCase();;
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