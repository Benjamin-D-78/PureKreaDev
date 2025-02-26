import Item from "../models/item.model.js";
import { RGXR } from "../utils/regex.js";

// CREATION ITEM
export const creationItem = async (req, res) => {
    try {
        const nameRegexr = RGXR.ITEM_NAME;
        if (!nameRegexr.test(req.body.name) || req.body.name.length < 2 || req.body.name.length > 30) {
            return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
        }
        const widthRegexr = RGXR.ITEM_WIDTH;
        if (!widthRegexr.test(req.body.width) || req.body.width.length < 1 || req.body.width.length > 6) {
            return res.status(400).json({ Message: "Entre 1 et 6 caractères attendus." });
        }
        const colorRegexr = RGXR.ITEM_COLOR;
        if (!colorRegexr.test(req.body.color) || req.body.color.length < 2 || req.body.color.length > 30) {
            return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
        }
        const contentRegexr = RGXR.ITEM_CONTENT;
        if (!contentRegexr.test(req.body.content) || req.body.content.length < 2 || req.body.content.length > 60) {
            return res.status(400).json({ Message: "Entre 2 et 60 caractères attendus." });
        }
        const detailRegexr = RGXR.ITEM_DETAIL;
        if (!detailRegexr.test(req.body.detail) || req.body.detail.length < 2 || req.body.detail.length > 60) {
            return res.status(400).json({ Message: "Entre 2 et 60 caractères attendus." });
        }
        const categoryRegexr = RGXR.ITEM_CATEGORY;
        if (!categoryRegexr.test(req.body.category) || req.body.category.length !== 4) {
            return res.status(400).json({ Message: "4 chiffres attendus." });
        }
        const stockRegexr = RGXR.ITEM_STOCK;
        if (!stockRegexr.test(req.body.stock) || req.body.stock.length < 1 || req.body.stock.length > 6) {
            return res.status(400).json({ Message: "4 chiffres attendus." });
        }
        const priceRegexr = RGXR.ITEM_PRICE;
        if (!priceRegexr.test(req.body.price) || req.body.price.length < 1 || req.body.price.length > 7) {
            return res.status(400).json({ Message: "Entre 1 et 7 caractères attendus." });
        }
        const imageRegexr = RGXR.ITEM_IMAGE;
        if (!imageRegexr.test(req.body.picture.img) || req.body.picture.img.length < 1 || req.body.picture.img.length > 200) {
            return res.status(400).json({ Message: "Protocole HTTPS, entre 1 et 200 caractères attendus." });
        }
        const imageBRegexr = RGXR.ITEM_IMAGE;
        if (!imageBRegexr.test(req.body.picture.img2) || req.body.picture.img2.length < 1 || req.body.picture.img.length > 200) {
            return res.status(400).json({ Message: "Protocole HTTPS, entre 1 et 200 caractères attendus." });
        }

        const response = await Item.create(req.body);
        res.status(201).json({ Message: "Item créé avec succès.", response });

    } catch (error) {
        console.error(error);
        res.status(500).json({ Message: "Échec lors de création de l'item.", error });
    }
};

// GET ALL ITEMS
export const allItems = async (req, res) => {
    try {
        const response = await Item.find();
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ Message: "Echec de la récupération de tous les items.", error });
    }
};

// ITEM BY ID
export const itemID = async (req, res) => {
    try {
        const response = await Item.findById(req.params.id);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la récupération de l'item.", error })
    }
}

// PUT - UPDATE BY ID
export const upItem = async (req, res) => {
    try {
        if (req.body.name) {
            const nameRegexr = RGXR.ITEM_NAME;
            if (!nameRegexr.test(req.body.name) || req.body.name.length < 2 || req.body.name.length > 30) {
                return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
            }
        }
        if (req.body.width) {
            const widthRegexr = RGXR.ITEM_WIDTH;
            if (!widthRegexr.test(req.body.width) || req.body.width.length < 1 || req.body.width.length > 6) {
                return res.status(400).json({ Message: "Entre 1 et 6 caractères attendus." });
            }
        }
        if (req.body.color) {
            const colorRegexr = RGXR.ITEM_COLOR;
            if (!colorRegexr.test(req.body.color) || req.body.color.length < 2 || req.body.color.length > 30) {
                return res.status(400).json({ Message: "Entre 2 et 30 caractères attendus." });
            }
        }
        if (req.body.content) {
            const contentRegexr = RGXR.ITEM_CONTENT;
            if (!contentRegexr.test(req.body.content) || req.body.content.length < 2 || req.body.content.length > 60) {
                return res.status(400).json({ Message: "Entre 2 et 60 caractères attendus." });
            }
        }
        if (req.body.detail) {
            const detailRegexr = RGXR.ITEM_DETAIL;
            if (!detailRegexr.test(req.body.detail) || req.body.detail.length < 2 || req.body.detail.length > 60) {
                return res.status(400).json({ Message: "Entre 2 et 60 caractères attendus." });
            }
        }
        if (req.body.category) {
            const categoryRegexr = RGXR.ITEM_CATEGORY;
            if (!categoryRegexr.test(req.body.category) || req.body.category < 2000 || req.body.category > 9999) {
                return res.status(400).json({ Message: "4 chiffres attendus." });
            }
        }
        if (req.body.stock) {
            const stockRegexr = RGXR.ITEM_STOCK;
            if (!stockRegexr.test(req.body.stock) || req.body.stock < 1 || req.body.stock > 999) {
                return res.status(400).json({ Message: "Entre 1 et 6 caractères attendus chiffres attendus." });
            }
        }
        if (req.body.price) {
            const priceRegexr = RGXR.ITEM_PRICE;
            if (!priceRegexr.test(req.body.price) || req.body.price < 1 || req.body.price > 999) {
                return res.status(400).json({ Message: "Entre 1 et 7 caractères attendus." });
            }
        }
        if (req.body.picture.img) {
            const imageRegexr = RGXR.ITEM_IMAGE;
            if (!imageRegexr.test(req.body.picture.img) || req.body.picture.img.length < 1 || req.body.picture.img.length > 200) {
                return res.status(400).json({ Message: "Protocole HTTPS, entre 1 et 200 caractères attendus." });
            }
        }
        if (req.body.picture.img2) {
            const imageBRegexr = RGXR.ITEM_IMAGE;
            if (!imageBRegexr.test(req.body.picture.img2) || req.body.picture.img2.length < 1 || req.body.picture.img.length > 200) {
                return res.status(400).json({ Message: "Protocole HTTPS, entre 1 et 200 caractères attendus." });
            }
        }

        const response = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ Message: "Item mis à jour avec succès.", response });

    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la mise à jour de l'item.", error })
    }
}

// DELETE
export const deleteItem = async (req, res) => {
    try {
        const response = await Item.findByIdAndDelete(req.params.id)
        res.status(200).json({ Message: "Item supprimé avec succès.", response })

    } catch (error) {
        res.status(500).json({ Message: "Echec lors de la suppression de l'item/", error })
    }
}