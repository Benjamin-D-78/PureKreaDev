import express from "express"
import { Token } from "../middlewares/auth.js";
import { creationMessage, allMessage, messageID, updateMessage, deleteMessage } from "../controllers/contact.controller.js"

const router = express.Router();

router.post("/creation", creationMessage);
router.get("/all", Token, allMessage);
router.get("/obtenir/:id", Token, messageID);
router.put("/update/:id", Token, updateMessage);
router.delete("/delete/:id", Token, deleteMessage);

export default router