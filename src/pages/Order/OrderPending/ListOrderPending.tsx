import { GetBillPendingWithUser } from "@/api/services/Bill"
import { Pagination } from "antd"
import { useEffect, useState } from "react"
import NameListOrderPending from "./NameListOrderPending"

const ListOrderPending = () => {
    const [bill, setbill] = useState<any>()
    const [check1, setcheck] = useState<any>()
    const user: any = localStorage.getItem("user")
    const users = JSON.parse(user) || []
    const fetchBills = async () => {
        try {
            const allBills: any = await GetBillPendingWithUser(users?.data?.id)
            setbill(allBills)
        } catch {
        } finally {
        }
    }
    console.log(bill)

    useEffect(() => {
        fetchBills()
    }, [check1])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = bill?.data?.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (page: any) => {
        setCurrentPage(page)
    }
    const check = (key: any) => {
        setcheck(key)
    }
    return (
        <>
            {currentItems?.map((data: any) => (
                <NameListOrderPending key={data.id} data={data} onCheck={check} />
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

export default ListOrderPending
