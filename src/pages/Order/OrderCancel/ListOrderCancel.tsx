import { Pagination, Spin } from "antd"
import { useEffect, useState } from "react"

import { LoadingOutlined } from "@ant-design/icons"
import { GetBillCancelWithUser, getBillCancel } from "@/api/services/Bill"
import NameListOrderCancel from "./NameListOrderCancel"

const ListOrderCancel = ({ data }: any) => {
    const [bill, setbill] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const user: any = localStorage.getItem("user")
    const users = JSON.parse(user) || []
    const fetchBills = async () => {
        try {
            const allBills: any = await GetBillCancelWithUser(users?.data?.id)
            setbill(allBills)
        } catch {
        } finally {
            setLoading(false)
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
    const onChange = (key: string) => {
        console.log(key)
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
