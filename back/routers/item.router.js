import express from "express"
import { creationItem, allItems, itemID, upItem, upStock, deleteItem } from "../controllers/item.controller.js"

const router = express.Router();

router.post("/creation", creationItem);
router.get("/all", allItems);
router.get("/obtenir/:id", itemID);
router.put("/update/:id", upItem);
router.put("/update/stock/:id", upStock);
router.delete("/delete/:id", deleteItem);

export default router