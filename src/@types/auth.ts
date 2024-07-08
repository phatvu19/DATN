import { User } from "./user"

export interface LoginSuccessInfo {
    role: number
    accessToken: string
    refreshToken?: string
    expiresIn?: number
}

export interface AuthResponse {
    success: boolean
    message?: string
    user?: User
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
}

export interface AuthState {
    accessToken: string | null
    loading: boolean
    user: User | null
    error: string | null
    success: boolean
}

export interface RegisterSuccessInfo {
    message: string
    user: User
}

export interface RegisterResponse {
    success: boolean
    message?: string
    user?: User
}

export interface RegisterState {
    loading: boolean
    user: User | null
    error: string | null
    success: boolean
}
