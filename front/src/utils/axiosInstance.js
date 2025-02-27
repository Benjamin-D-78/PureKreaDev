import axios from "axios"

// constSi tu es en local tu utilise cette URL, si tu es en ligne tu utilise l'autre URL
const API_URL = process.env.NODE_ENV === "development" ? "https://pure-krea-dev.vercel.app" : "http://localhost:8000" // On met l'URL sur back
// console.log(API_URL)

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json",}
})

export default axiosInstance;