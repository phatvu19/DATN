import { User } from "@/@types/user"
import httpRequest from "@/api/axios-instance"

const getAllUser = async () => {
    const response = await httpRequest.get("/users")
    return response.data.data
}

const createUser = async (user: User): Promise<User> => {
    const response = await httpRequest.post("/users", user)
    return response.data
}

const getUser = async (id: string) => {
    const response = await httpRequest.get(`/users/${id}`)
    return response.data.data.data
}

const updateUser = async (id: number, data: any) => {
    const response = await httpRequest.put(`/users/${id}`, data)
    return response.data
}

const deleteUser = async (id: number) => {
    const response = await httpRequest.delete(`/users/${id}`)
    return response.data
}

export { createUser, deleteUser, getAllUser, getUser, updateUser }
