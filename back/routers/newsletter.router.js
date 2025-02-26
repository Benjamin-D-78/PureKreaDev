import express from "express"
import { creationAbonne, allAbonnes, abonneID, updateAbonne, deleteAbonne } from "../controllers/newsletter.controller.js"

const router = express.Router();

router.post("/creation", creationAbonne);
router.get("/all", allAbonnes);
router.get("/obtenir/:id", abonneID);
router.put("/update/:id", updateAbonne);
router.delete("/delete/:id", deleteAbonne);

export default router