import { AuthResponse, LoginSuccessInfo } from "@/@types/auth"
import httpRequest from "@/api/axios-instance"
import { toast } from "react-toastify"

const login = async (
    email: string,
    password: string,
): Promise<LoginSuccessInfo | null> => {
    try {
        const response: any = await httpRequest.post<AuthResponse>("/login", {
            email,
            password,
        })

        if (response.data.data) {
            // toast.success("Đăng nhập thành công!")
            return response.data.data
        } else {
            return null
        }
    } catch (error) {

        return null
    }
}

const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
) => {
    try {
        const response = await httpRequest.post("/register", {
            name,
            email,
            password,
            confirmPassword,
        })
        if (response.data) {
            toast.success("Đăng ký thành công!")
            return true
        } else {
            toast.error("Đăng ký thất bại!")
            return false
        }
    } catch (error) {
        toast.error("Đăng ký thất bại!")
        return false
    }
}

export { login, register }
