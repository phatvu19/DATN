import { Attribute, AttributeValue } from "@/@types/product"
import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"
import { toast } from "react-toastify"

const getAllAttribute = async (): Promise<Attribute[]> => {
    try {
        const response: AxiosResponse<{ data: { attributes: Attribute[] } }> =
            await httpRequest.get("attributes")
        return response.data?.data?.attributes ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch products. Please try again later.")
        return []
    }
}

const getAttributeById = async (id: number): Promise<Attribute | undefined> => {
    try {
        const response: any=
            await httpRequest.get(`attributes/${id}`)

        return response?.data?.data?.attribute?.attribute_values
    } catch (error) {
        console.error("An error occurred while fetching Attribute")
        toast.error("Failed to fetch attribute. Please try again later.")
        return undefined
    }
}

const createAttribute = async (
    attribute: Attribute,
): Promise<Attribute | undefined> => {
    try {
        const response: AxiosResponse<{ data: { attributes: Attribute } }> =
            await httpRequest.post("attributes", attribute)

        toast.success("Attribute created successfully.")
        return response.data?.data?.attributes
    } catch (error) {
        console.error("An error occurred while creating the attribute")
        toast.error("Failed to create attribute. Please try again later.")
        return undefined
    }
}

const updateAttribute = async (
    id: number,
    attribute: Attribute,
): Promise<Attribute | undefined> => {
    try {
        const response: AxiosResponse<{ data: { attributes: Attribute } }> =
            await httpRequest.put(`attributes/${id}`, attribute)

        toast.success("Attribute updated successfully.")
        return response.data?.data?.attributes
    } catch (error) {
        console.error("An error occurred while updating the attribute")
        toast.error("Failed to update attribute. Please try again later.")
        return undefined
    }
}

const deleteAttribute = async (id: number): Promise<boolean> => {
    try {
        await httpRequest.delete(`attributes/${id}`)

        toast.success("Attribute deleted successfully.")
        return true
    } catch (error) {
        console.error("An error occurred while deleting the attribute")
        toast.error("Failed to delete attribute. Please try again later.")
        return false
    }
}
const getAllAttributeValue = async (): Promise<AttributeValue[]> => {
    try {
        const response: AxiosResponse<{
            data: { attributeValues: AttributeValue[] }
        }> = await httpRequest.get("attribute-values")
        return response.data?.data?.attributeValues ?? []
    } catch (error) {
        console.error("An error occurred while fetching attribute values")
        toast.error("Failed to fetch attribute values. Please try again later.")
        return []
    }
}
const getAttributeValueById = async (id: string): Promise<AttributeValue | null> => {
    try {
        const response: AxiosResponse<{ data: AttributeValue }> =
            await httpRequest.get(`attribute-values/${id}`)
        return response.data.data
    } catch (error) {
        console.error(`Error fetching attribute value with ID ${id}:`, error)
        toast.error("Failed to fetch attribute value. Please try again later.")
        return null
    }
}

const createAttributeValue = async (
    newValue: AttributeValue,
): Promise<AttributeValue | null> => {
    try {
        const response: AxiosResponse<{ data: AttributeValue }> =
            await httpRequest.post("attribute-values", newValue)
        return response.data.data
    } catch (error) {
        console.error("Error creating attribute value:", error)
        toast.error("Failed to create attribute value. Please try again later.")
        return null
    }
}
const deleteAttributeValue = async (id: any)=> {
    try {
        await httpRequest.delete(`attribute-values/${id}`)
        return true // Return true if deletion is successful
    } catch (error) {
        console.error(`Error deleting attribute value with ID ${id}:`, error)
        toast.error("Failed to delete attribute value. Please try again later.")
        return false // Return false if deletion fails
    }
}
const updateAttributeValue = async (
    id: string,
    updatedValue: AttributeValue,
): Promise<AttributeValue | null> => {
    try {
        const response: AxiosResponse<{ data: AttributeValue }> =
            await httpRequest.put(`attribute-values/${id}`, updatedValue)
        return response.data.data
    } catch (error) {
        console.error(`Error updating attribute value with ID ${id}:`, error)
        toast.error("Failed to update attribute value. Please try again later.")
        return null
    }
}


export {
    createAttribute,
    deleteAttribute,
    getAllAttribute,
    getAttributeById,
    updateAttribute,
    getAllAttributeValue,

    getAttributeValueById,
    createAttributeValue,
    deleteAttributeValue,
    updateAttributeValue,
}
