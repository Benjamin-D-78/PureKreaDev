import jwt from "jsonwebtoken"
import {env} from "../config/index.js"
import { newError } from "./error.js"

// Vérification du Token
export const Token = (req, res, next) => {
    // access_token est la clé de mon token, qui n'est pas accessible depuis mon code JS.
    const token = req.cookies.access_token;
    console.log("Token : ", token);

    if (!token) return next(newError(401, "Accès refusé."))

    // La signature du token correspond-t-elle bien à ce qu'il y a dans le env.token (fichier .env)
    jwt.verify(token, env.TOKEN, (err, user) => {
        if(err) {
            return next(newError(403, "Token non valide."))
        }
    req.user = user;
    next();

})}