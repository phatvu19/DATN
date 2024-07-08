import Footer from "@/layouts/un-auth/Components/Footer/Footer"
import Header from "@/layouts/un-auth/Components/Header/Header"
import { Outlet } from "react-router-dom"

function UnAuthLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default UnAuthLayout
