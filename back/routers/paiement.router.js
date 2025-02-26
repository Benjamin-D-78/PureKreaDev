import express from "express";
import {paiementStripe} from "../controllers/stripe.controller.js"

const router = express.Router();

router.post("/chargement", paiementStripe);

export default router;