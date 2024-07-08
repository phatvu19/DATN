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

export { getAllVoucher }
