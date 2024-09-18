import { Pagination } from "antd"
import { useEffect, useState } from "react"

import { GetBillCancelWithUser } from "@/api/services/Bill"
import NameListOrderCancel from "./NameListOrderCancel"

const ListOrderCancel = ({ data }: any) => {
    const [bill, setbill] = useState<any>()
    const user: any = localStorage.getItem("user")
    const users = JSON.parse(user) || []
    const fetchBills = async () => {
        try {
            const allBills: any = await GetBillCancelWithUser(users?.data?.id)
            setbill(allBills)
        } catch {
        } finally {
        }
    }

    useEffect(() => {
        fetchBills()
    }, [data])
    console.log(bill)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = bill?.data?.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (page: any) => {
        setCurrentPage(page)
    }
    return (
        <>
            {currentItems?.map((data: any) => (
                <NameListOrderCancel key={data.id} data={data} />
            ))}

            <div className="mt-5 flex items-center justify-center">
                <Pagination
                    current={currentPage}
                    total={bill?.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default ListOrderCancel
