import React, { useState } from 'react'

const Testi = () => {

    const [user, setUser] = useState({
        prenom: "",
        nom: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div>
            <p>{user.prenom}</p>
            <p>{user.nom}</p>

            <input
                onChange={handleChange}
                type="text"
                name='prenom'/>
            <input
                onChange={handleChange}
                type="text"
                name='nom'/>
        </div>
    )
}

export default Testi