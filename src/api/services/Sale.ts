import { Product } from "@/@types/product"
import httpRequest from "@/api/axios-instance"
import { toast } from "react-toastify"

const getAllSale = async (): Promise<Product[]> => {
    try {
        const response: any = await httpRequest.get("/sales")
        return response.data?.data?.sales ?? []
    } catch (error) {
        return []
    }
}
const getAllSaleProduct = async (id: any): Promise<Product[]> => {
    try {
        const response: any = await httpRequest.get(`/sale-product/${id}`)
        return response.data?.data?.sales ?? []
    } catch (error) {
        return []
    }
}

export { getAllSale, getAllSaleProduct }
