export const ApiConstants = {
    // auth
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/refresh",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/post-forgot-password",
    RESET_PASSWORD: "/auth/post-reset-password",
    LOGOUT: "/auth/logout",

    USER: "/users",
    USER_DETAIL: "/get-user",
    USER_ACTIVITY: "/activity",
} as const
