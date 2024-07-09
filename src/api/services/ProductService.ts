import { Product } from "@/@types/product"
import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"
import { toast } from "react-toastify"

const getAllProduct = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<{ data: { product: Product[] } }> =
            await httpRequest.get("/products")
        return response.data?.data?.product ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch products. Please try again later.")
        return []
    }
}

const getProductById = async (id: number): Promise<Product | undefined> => {
    try {
        const response = await httpRequest.get(`/products/${id}`)
        return response.data.data.product
    } catch (error) {
        return undefined
    }
}

const createProduct = async (product: Product) => {

    try {
        const response = await httpRequest.post("/products", product, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        toast.success("Product created successfully.")
        return response.data
    } catch (error) {
        console.error("An error occurred while creating product:", error)
        toast.error("Failed to create product. Please try again later.")
        throw error // Throwing error để component gọi hàm này có thể xử lý tiếp
    }
}

const updateProduct = async (
    id: number,
    product: Product,
): Promise<Product | undefined> => {
    try {
        const response: AxiosResponse<{ data: Product }> = await httpRequest.put (
            `/products/${id}`,
            product,
        )
        const updatedProduct = response.data?.data
        toast.success("Product updated successfully.")
        return updatedProduct
    } catch (error) {
        console.error(`An error occurred while updating product with ID ${id}`)
        toast.error(
            `Failed to update product with ID ${id}. Please try again later.`,
        )
        throw error
    }
}

const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        await httpRequest.delete(`/products/${id}`)
        toast.success("Product deleted successfully.")
        return true
    } catch (error) {
        toast.error(
            `Failed to delete product with ID ${id}. Please try again later.`,
        )
        return false
    }
}
const GetProductBuy3 = async () => {
    try {
        const response = await httpRequest.get(`/sale-product/1`)
        return response?.data?.data?.sales
    } catch (error) {
        return undefined
    }
}
const GetProduct50Persion = async () => {
    try {
        const response = await httpRequest.get(`/sale-product/2`)
        return response?.data?.data?.sales
    } catch (error) {
        return undefined
    }
}
const GetProductBuy1Free1 = async () => {
    try {
        const response = await httpRequest.get(`/sale-product/3`)
        return response?.data?.data?.sales
    } catch (error) {
        return undefined
    }
}
const GetProductBuyMax = async () => {
    try {
        const response = await httpRequest.get(`/sale-product/4`)
        return response?.data?.data?.sales
    } catch (error) {
        return undefined
    }
}
const filterProduct = async (data: any) => {
    try {
        const response = await httpRequest.get(
            `/filter?minPrice=${data?.minprice}&maxPrice=${data?.maxprice}&color=${data?.color}&category_id=${data?.category_id}`,
        )
        return response?.data?.data?.original
    } catch (error) {
        return undefined
    }
}
export {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    GetProductBuy3,
    GetProduct50Persion,
    GetProductBuy1Free1,
    GetProductBuyMax,
    filterProduct,
}
