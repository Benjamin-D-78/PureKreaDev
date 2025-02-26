import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: true},
    isVerified: {type: Boolean, default: false},
    adress: {type: String, required: false},
    postal: {type: String, required: false},
    town: {type: String, required: false},
    phone: {type: String, required: false}, 
    role: {type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},  {timestamps: {createdAT: true}
})

userSchema.plugin(mongooseUniqueValidator) // Vérifie que les champs déclarés comme unique le sont bien dans la BDD
export default mongoose.model("User", userSchema)