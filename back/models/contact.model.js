import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    motif: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    content: { type: String, required: true },
    verification: { type: Boolean, required: true, default: false },
    statut: {
        type: String,
        required: false,
        enum: ["En cours", "Traité"],
        default: "En cours"
    },
    preference: { type: String, required: false },
    date: { type: Date, default: Date.now }
})

export default mongoose.model("Contact", contactSchema);