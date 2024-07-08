import AuthLayout from "@/layouts/auth/auth-layout"
import UnAuthLayout from "@/layouts/un-auth/un-auth-layout"
import { AuthRouter } from "@/routes/auth-router"
import { UnAuthRouter } from "@/routes/un-auth-router"

export const RootUnAuthRouter = [
    {
        path: "/",
        element: <UnAuthLayout />,
        children: [...UnAuthRouter],
    },
]

export const RootAuthRouter = [
    {
        path: "/admin",
        element: <AuthLayout />,
        children: [...AuthRouter],
    },
]
