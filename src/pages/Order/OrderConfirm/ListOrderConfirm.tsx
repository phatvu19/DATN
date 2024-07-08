import { GetBillConfirmWithUser, getBillconfirm } from "@/api/services/Bill"
import { LoadingOutlined } from "@ant-design/icons"
import { Pagination, Spin } from "antd"
import { useEffect, useState } from "react"
import NameListOrderConfirm from "./NameListOrderConfirm"

const ListOrderConFirm = () => {
    const [bill, setbill] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [check1, setcheck] = useState<boolean>()
    const user: any = localStorage.getItem("user")
    const users = JSON.parse(user) || []
    const fetchBills = async () => {
        try {
            const allBills: any = await GetBillConfirmWithUser(users?.data?.id)
            setbill(allBills)
        } catch {
        } finally {
            setLoading(false)
        }
    }

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
    const onChange = (key: string) => {
        console.log(key)
    }
    const check = (key: any) => {
        setcheck(key)
    }
    return (
        <>
            {currentItems?.map((data: any) => (
                <NameListOrderConfirm key={data.id} data={data} onCheck={check} />
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

export default ListOrderConFirm
