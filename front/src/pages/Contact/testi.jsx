import { useState } from "react";
import { USER_CHAMPS } from "../../utils/champs";

import React from 'react'

const Testi = () => {

    const [user, setUser] = useState({
        prenom: "",
        nom: "",
        email: ""
    })

    const [error, setError] = useState({
        prenom: "",
        nom: "",
        email: ""
    })

const testi = (event) => {
    const {name, value} = event.target
    setUser(prev => ({...prev, [name]: value}))
}

    const formulaire = (champ) => {
        const messageError = { ...error }
        let isValid = true

        if (user[champ] && USER_CHAMPS[champ]) {
            const { regex, minLength, maxLength, min, max, type, errorMessage } = USER_CHAMPS[champ];
            const value = user[champ]

            if (type === "number") {
                const number = Number(value);
                if (!regex.test(value) || number < min || number > max) {
                    messageError[champ] = errorMessage
                    isValid = false
                }
            } else if (!regex.test(value) || value.length < minLength || value.length > maxLength){
                messageError[champ] = errorMessage
            }
        }
        setError(messageError)
        return isValid;
    }

    let formValid = true
    for (const champ in user){
        const isValid = formulaire[champ]
        if (!isValid) formValid = false
    }

    if (!formValid) return


    

    return (
        <div>Testi</div>
    )
}

export default Testi



