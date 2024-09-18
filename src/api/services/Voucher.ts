import { Variant } from "@/@types/product"
import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"

const getAllVoucher = async (): Promise<Variant[]> => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("voucher")
        return response.data?.data
    } catch (error) {
        return []
    }
}
const addVoucher = async (data:any): Promise<Variant[]> => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.post("voucher",data)
        return response.data?.data
    } catch (error) {
        return []
    }
}
const RemoveVoucher = async (data: any): Promise<Variant[]> => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.delete(`voucher/${data}`)
        return response.data?.data
    } catch (error) {
        return []
    }
}
export { addVoucher, getAllVoucher, RemoveVoucher }
