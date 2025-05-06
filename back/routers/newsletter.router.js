import express from "express"
import { Token } from "../middlewares/auth.js";
import { creationAbonne, allAbonnes, abonneID, updateAbonne, deleteAbonne } from "../controllers/newsletter.controller.js"

const router = express.Router();

router.post("/creation", creationAbonne);
router.get("/all", Token, allAbonnes);
router.get("/obtenir/:id", Token, abonneID);
router.put("/update/:id", Token, updateAbonne);
router.delete("/delete/:id", Token, deleteAbonne);

export default router