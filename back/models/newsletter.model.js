import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator'

const newsletterSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    statut: {
        type: String,
        required: false,
        enum: ["Abonné", "Désabonné"],
        default: "Abonné"
    },
    date: { type: Date, default: Date.now }
})

newsletterSchema.plugin(mongooseUniqueValidator) // Vérifie que les champs déclarés comme unique le sont bien dans la BDD
export default mongoose.model("Newsletter", newsletterSchema);