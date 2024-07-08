import { Variant } from "@/@types/product"
import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"
import { toast } from "react-toastify"

const getAllVariant = async (): Promise<Variant[]> => {
    try {
        const response: AxiosResponse<{ data: { variants: Variant[] } }> =
            await httpRequest.get("variants")

        return response.data?.data?.variants
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch products. Please try again later.")
        return []
    }
}

export { getAllVariant }
