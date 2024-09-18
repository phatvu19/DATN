import { User } from "@/@types/user"
import httpRequest from "@/api/axios-instance"

const getAllUser = async () => {
    try {
        const response = await httpRequest.get("/users")
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (user: User): Promise<User> => {
    const response = await httpRequest.post("/users", user)
    return response.data
}
const getUser = async (id: string) => {
    try {
        const response = await httpRequest.get(`/users/${id}`)
        return response.data.data.data
    } catch (error) {

        throw error // Re-throw the error to handle it in the component if needed
    }
}

const updateUser = async (id: number, data: any) => {
    try {
        const response = await httpRequest.put(`/users/${id}`, data)
        return response.data
    } catch (error) {

        throw error
    }
}
const deleteUser = async (id: number) => {
    try {
        const response = await httpRequest.delete(`/users/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export { createUser, deleteUser, getAllUser, getUser, updateUser }
