import express from "express";
import { Token } from "../middlewares/auth.js";
import { creationCommande, allCommandes, commandeID, commandeByUser, upCommande, deleteCommande } from "../controllers/commande.controller.js";

const router = express.Router();

// Route pour créer une commande
router.post("/creation", creationCommande);
router.get("/all", allCommandes);
router.get("/obtenir/:id", commandeID);
router.get("/obtenir/commandes/:id", Token, commandeByUser);
router.put("/update/:id", upCommande);
router.delete("/delete/:id", deleteCommande);

export default router;
