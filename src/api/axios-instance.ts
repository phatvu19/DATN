import { StorageFunc } from "@/utilities/local-storage/storage-func"
import axios, { AxiosRequestConfig } from "axios"

const requestConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_ENDPOINT_URL || "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
}

const httpRequest = axios.create(requestConfig)

httpRequest.interceptors.request.use(
    (config) => {
        const token = StorageFunc.getAccessToken()
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        return config
    },
    async (error) => {
        return Promise.reject(error)
    },
)

export default httpRequest
