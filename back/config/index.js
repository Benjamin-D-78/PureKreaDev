import dotenv from "dotenv"
dotenv.config()

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL,
    DB_NAME: process.env.DB_NAME,
    TOKEN: process.env.TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    STRIPE_SECRET_TEST: process.env.STRIPE_SECRET_TEST
}