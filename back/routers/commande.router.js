import express from "express";
import { Token } from "../middlewares/auth.js";
import { creationCommande, allCommandes, commandeID, commandeByUser, upCommande, deleteCommande } from "../controllers/commande.controller.js";

const router = express.Router();

// Route pour créer une commande
router.post("/creation", Token, creationCommande);
router.get("/all", Token, allCommandes);
router.get("/obtenir/:id", Token, commandeID);
router.get("/obtenir/commandes/:id", Token, commandeByUser);
router.put("/update/:id", Token, upCommande);
router.delete("/delete/:id", Token, deleteCommande);

export default router;
