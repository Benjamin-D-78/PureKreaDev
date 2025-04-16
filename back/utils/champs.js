import { RGXR } from "./regex.js"
import { ERROR } from "./error.js"

export const USER_CHAMPS = {
    firstname: {
        regex: RGXR.PRENOM,
        minLength: 2,
        maxLength: 30,
        errorMessage: ERROR.U_FIRSTNAME
    },
    lastname: {
        regex: RGXR.NOM,
        minLength: 2,
        maxLength: 30,
        errorMessage: ERROR.U_LASTNAME
    },
    email: {
        regex: RGXR.EMAIL,
        minLength: 8,
        maxLength: 60,
        errorMessage: ERROR.U_EMAIL
    },
    content: {
        regex: RGXR.CONTENT,
        minLength: 2,
        maxLength: 500,
        errorMessage: ERROR.U_CONTENT
    },
    phone: {
        regex: RGXR.PHONE,
        min: 99999999,
        max: 9999999999,
        errorMessage: ERROR.U_PHONE,
        type: "number"
    },
    postal: {
        regex: RGXR.POSTAL,
        min: 999,
        max: 99999,
        errorMessage: ERROR.POSTAL,
        type: "number"
    },

}