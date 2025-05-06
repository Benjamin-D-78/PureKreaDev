import express from "express";
import { Token } from "../middlewares/auth.js";
import { verifyEmail, mdpOublie, resetPassword, mdpModifie } from "../controllers/user.controller.js";
import { inscription, connexion, allUsers, userID, upUser, deleteUser, renvoieEmail } from "../controllers/user.controller.js";

const router = express.Router()

router.post("/inscription", inscription)
router.post("/connexion", connexion)
router.get("/all", Token, allUsers)
router.get("/obtenir/:id", Token, userID)
router.put("/update/:id", Token, upUser)
router.put("/verification/:token", verifyEmail)
router.get("/verificationmdp/:token", resetPassword)
router.post("/reset", mdpOublie)
router.post("/modificationmdp/:token", mdpModifie)
router.post("/verification/bis", renvoieEmail)
router.delete("/delete/:id", Token, deleteUser)

export default router