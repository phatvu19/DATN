import { Product } from "@/@types/product"
import httpRequest from "@/api/axios-instance"

const AddSale = async (data: any): Promise<Product[]> => {
    try {
        const response: any = await httpRequest.post(`/sales`, data)
        return response.data
    } catch (error) {
        return []
    }
}
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
        const response: any = await httpRequest.get(`get-by-sale/${id}`)
        return response.data?.data ?? []
    } catch (error) {
        return []
    }
}
const updateSale = async (data: any): Promise<Product[]> => {
    try {
        const response: any = await httpRequest.put(
            `/update-sale-in-product/${data?.id}`,
            data?.sale_id,
        )
        return response.data?.data?.sales ?? []
    } catch (error) {
        return []
    }
}
const ProductSale = async (): Promise<Product[]> => {
    try {
        const response: any = await httpRequest.get(`get-by-sale`)
        return response.data?.data ?? []
    } catch (error) {
        return []
    }
}
const GetSaleId = async (id: any): Promise<Product[]> => {
    try {
        const response: any = await httpRequest.get(`sales/${id}`)
        return response.data?.data ?? []
    } catch (error) {
        return []
    }
}
export { getAllSale, getAllSaleProduct, updateSale, AddSale, ProductSale, GetSaleId }
