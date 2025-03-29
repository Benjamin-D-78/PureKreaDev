import cookieParser from "cookie-parser"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { env } from "./config/index.js"

// ROUTAGE
import userRoutes from "./routers/user.router.js"
import itemRoutes from "./routers/item.router.js"
import commandeRoutes from "./routers/commande.router.js"
import paiementRoutes from "./routers/paiement.router.js"
import messageRoutes from "./routers/message.router.js"
import abonneRoutes from "./routers/newsletter.router.js"

// APP EXPRESS
const app = express()

// PORT
const PORT = env.PORT || 8000

// CONNEXION A LA BDD MONGODB
mongoose
    .connect(env.MONGO_URI_LOCAL, {dbName: env.DB_NAME})
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(error => console.log("Echec de la connexion à MongoDB : ", error))

// Configuration des en-têtes de sécurité (Content-Security-Policy)
// ça sert à définir quelles ressources externes (scripts, images, styles, iframes, etc.) un navigateur est autorisé à charger et à exécuter.
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://js.stripe.com https://www.google.com https://www.gstatic.com https://assets.calendly.com; frame-ancestors 'self' https://checkout.stripe.com https://www.google.com https://calendly.com; frame-src 'self' https://calendly.com;");
    next();
});

// MIDDLEWARE D'EXPRESS
app.use(cors({
    origin: "https://pure-krea-benjamind.vercel.app",
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type','Authorization','Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: true,
}));
app.use(express.json());
app.use(cookieParser());

// PREFIXES ROUTES
app.use("/api/user", userRoutes)
app.use("/api/item", itemRoutes)
app.use("/api/commande", commandeRoutes)
app.use("/api/paiement", paiementRoutes)
app.use("/api/contact", messageRoutes)
app.use("/api/abonnement", abonneRoutes)

// SERVER
app.listen(PORT, () => {
    console.log(`Ecoute sur le port : ${PORT}`);
})