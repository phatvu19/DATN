import Footer from "@/layouts/un-auth/Components/Footer/Footer"
import Header from "@/layouts/un-auth/Components/Header/Header"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import SearchHearder from "./SearchHearder"

function UnAuthLayout() {
    const [filter, setfilter] = useState<any>()
    const search = (data: any) => {
        setfilter(data)
    }
    return (
        <div className="flex min-h-screen flex-col">
            <Header onSearch={search} />
            <main className="flex-grow">
                {filter ? <SearchHearder data={filter }/> : <Outlet /> }
              
            </main>
            <Footer />
        </div>
    )
}

export default UnAuthLayout
