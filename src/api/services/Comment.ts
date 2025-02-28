import { Variant } from "@/@types/product"
import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"

const getAllComment = async (): Promise<Variant[]> => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("posts")
        return response.data?.data
    } catch (error) {
        return []
    }
}
const AddComment = async (data1: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            `posts`,
            data1,
            {
                headers: {
                    Authorization: `Bearer ${data1?.token}`,
                },
            },
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetAllComment = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`posts`)
        return response?.data?.data?.categories
    } catch (error) {
        return []
    }
}
const DeleteComment = async (id: any, token: any) => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.delete(`posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
        return response?.data?.data
    } catch (error) {
        return []
    }
}
export { getAllComment, AddComment, GetAllComment, DeleteComment }
