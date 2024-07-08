import { AuthState } from "@/@types/auth"
import { createSlice } from "@reduxjs/toolkit"

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    accessToken: null,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setSuccess(state, action) {
            state.success = action.payload
        },
        setAccessToken(state, action) {
            state.accessToken = action.payload
        },
        removeAccessToken(state) {
            state.accessToken = null
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clear: () => initialState,
    },
})
export const authActions = authSlice.actions

export const { reducer: authReducer } = authSlice
