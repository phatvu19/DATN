import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"
import { toast } from "react-toastify"
const addOrder = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            "/orders",
            data,
        )
        const createdProduct = response.data?.data
        toast.success("Product created successfully.")
        return createdProduct
    } catch (error) {
        console.error("An error occurred while creating product")
        toast.error("Failed to create product. Please try again later.")
        return undefined
    }
}
const getAllOrder = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get("/orders")
        return response.data?.data?.data ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch products. Please try again later.")
        return []
    }
}
const getOrderDetail = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/orders/${id}`)
        return response.data?.data?.data ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch products. Please try again later.")
        return []
    }
}
const orderDetailWithVariant = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            "/orderDetailWithVariant",
            data,
        )
        const createdProduct = response.data?.data
        toast.success("Product created successfully.")
        return createdProduct
    } catch (error) {
        console.error("An error occurred while creating product")
        toast.error("Failed to create product. Please try again later.")
        return undefined
    }
}
const getCartOrder = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            "/cart",
            data,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}

const getOrderHistory = async (id: number) => {
    try {
        const response = await httpRequest.get(`/bill-stores-with-bill/${id}`)
        return response.data.data
    } catch (error:any) {
        toast.error(error?.response?.data.message)
    }
}
export {
    addOrder,
    getAllOrder,
    getOrderDetail,
    orderDetailWithVariant,
    getCartOrder,
    getOrderHistory,
}
