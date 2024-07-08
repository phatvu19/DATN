import { Category } from "@/@types/category"
import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"
import { toast } from "react-toastify"

const getAllCategory = async (): Promise<Category[]> => {
    try {
        const response: AxiosResponse<{ data: { categories: Category[] } }> =
            await httpRequest.get("/categories")
        return response.data?.data?.categories
    } catch (error) {
        console.error("An error occurred while fetching categories")

        toast.error("Failed to fetch categories. Please try again later.")
        return []
    }
}

const getCategoryById = async (id: number): Promise<Category> => {
    try {
        const response: AxiosResponse<{ data: { category: Category } }> =
            await httpRequest.get(`/categories/${id}`)
        return response.data.data.category
    } catch (error) {
        console.error("An error occurred while fetching category")
        throw new Error("Failed to fetch category. Please try again later.")
    }
}

const getCategoryBySlug = async (slug: string): Promise<Category> => {
    try {
        const response: AxiosResponse<{ data: { category: Category } }> =
            await httpRequest.get(`/categories/${slug}`)
        return response.data.data.category
    } catch (error) {
        console.error("An error occurred while fetching category")
        throw new Error("Failed to fetch category. Please try again later.")
    }
}

const deleteCategory = async (id: number): Promise<Category | undefined> => {
    try {
        const response: AxiosResponse<{ data: { category: Category } }> =
            await httpRequest.delete(`/categories/${id}`)
        return response.data.data.category
    } catch (error) {
        console.error(error)
    }
}
const createCategory = async (category: Category): Promise<Category | undefined> => {
    try {
        const response: AxiosResponse<{ data: { category: Category } }> =
            await httpRequest.post(`/categories`, category)
        return response.data.data.category
    } catch (error) {
        console.error(error)
    }
}
const updateCategory = async (id: number, category: Category): Promise<Category> => {
    try {
        const response: AxiosResponse<{ data: { category: Category } }> =
            await httpRequest.put(`/categories/${id}`, category)
        return response.data.data.category
    } catch (error) {
        console.error("There was an error updating the category!", error)
        throw error
    }
}

export {
    createCategory,
    deleteCategory,
    getAllCategory,
    getCategoryById,
    getCategoryBySlug,
    updateCategory,
}
