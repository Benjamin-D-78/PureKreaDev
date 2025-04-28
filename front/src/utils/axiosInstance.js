import axios from "axios"

const API_URL = "https://pure-krea-dev.vercel.app"
// console.log(API_URL)

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json",}
})

export default axiosInstance;