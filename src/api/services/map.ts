import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { toast } from "react-toastify"

const baseUrl = "https://vapi.vnappmob.com/api/province"
const requestConfig: AxiosRequestConfig = {
    baseURL: `${baseUrl}`,
    timeout: import.meta.env.VITE_REQUEST_TIMEOUT || 90 * 1000,
    headers: {
        "Content-Type": "application/json",
    },
}

const httpRequest = axios.create(requestConfig)
const getAllProvince = async () => {
    try {
        const response: any = await httpRequest.get("/")
        return response?.data?.results
    } catch (error) {
        toast.error("Lấy tỉnh thất bại.")
        return []
    }
}
const getAllDistrict = async (id: any) => {
    try {
        const response: any = await httpRequest.get(`/district/${id}`)
        return response?.data?.results
    } catch (error) {
        toast.error("Lấy huyện thất bại.")
        return []
    }
}
const getAllWard = async (id: any) => {
    try {
        const response: any = await httpRequest.get(`/ward/${id}`)
        return response?.data?.results
    } catch (error) {
        toast.error("Lấy xã thất bại.")
        return []
    }
}

export { getAllProvince, getAllDistrict, getAllWard }
