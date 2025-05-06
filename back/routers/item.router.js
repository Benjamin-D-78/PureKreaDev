import express from "express"
import { Token } from "../middlewares/auth.js";
import { creationItem, allItems, itemID, upItem, upStock, deleteItem } from "../controllers/item.controller.js"

const router = express.Router();

router.post("/creation", Token, creationItem);
router.get("/all", allItems);
router.get("/obtenir/:id", itemID);
router.put("/update/:id", Token, upItem);
router.put("/update/stock/:id", Token, upStock);
router.delete("/delete/:id", Token, deleteItem);

export default router