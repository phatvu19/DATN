import httpRequest from "@/api/axios-instance"
import axios, { AxiosResponse } from "axios"

const Vnpay = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await axios.post(
            "http://localhost:8080/api/vnpay",
            data,
        )
        const createdProduct = response
        return createdProduct
    } catch (error) {
        return undefined
    }
}

export { Vnpay }
