import express from "express";
import { Token } from "../middlewares/auth.js";
import {paiementStripe} from "../controllers/stripe.controller.js"

const router = express.Router();

router.post("/chargement", Token, paiementStripe);

export default router;