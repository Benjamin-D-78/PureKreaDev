import mongoose from "mongoose";

const newsletterSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    statut: {
        type: String,
        required: false,
        enum: ["Abonné", "Désabonné"],
        default: "Abonné"
    },
    date: { type: Date, default: Date.now }
})

export default mongoose.model("Newsletter", newsletterSchema);