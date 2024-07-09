import { useState, useEffect } from "react"
import "moment/locale/vi" // Import the Vietnamese locale
import { Pagination, Spin, Input, Select, DatePicker } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import NameProductInListOrderAdmin from "./NameProductInListOrderAdmin"
import ListOrderConFirm from "./OrderConFirm/ListOrderConFirm"
import ListOrderPending from "./OrderPending/ListOrderPending"
import ListOrderSiping from "./OrderShiping/ListOrderSiping"
import ListOrderCancel from "./OrderCancel/ListOrderCancel"
import ListOrderPaid from "./OrderPaid/ListOrderPaid"
import ListOrderDones from "./OrderDone/ListOrderDone"
import { getAllBill } from "@/api/services/Bill" // Adjust the import path as per your project structure

const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker

const ListOrderAdmin = () => {
    const [bill, setBill] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [filterStatus, setFilterStatus] = useState<string>("")

    const fetchBills = async () => {
        try {
            const allBills: any = await getAllBill()
            setBill(allBills)
        } catch (error) {
            console.error("Error fetching bills:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBills()
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = bill?.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleSearch = (value: string) => {
        // Implement search logic here
        console.log("Searching for:", value)
    }

    const handleFilterChange = (value: string) => {
        // Implement filter change logic here
        console.log("Filter status:", value)
        setFilterStatus(value)
    }

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <Search
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    onSearch={handleSearch}
                    className="w-1/3"
                />
                <div className="flex space-x-4">
                    <Select
                        placeholder="Chọn trạng thái"
                        onChange={handleFilterChange}
                        className="w-1/3"
                        value={filterStatus}
                    >
                        <Option value="">Tất cả đơn hàng</Option>
                        <Option value="paid">Đã thanh toán</Option>
                        <Option value="pending">Chờ thanh toán</Option>
                        <Option value="confirmed">Đã xác nhận</Option>
                        <Option value="shipping">Đang giao</Option>
                        <Option value="delivered">Đã giao</Option>
                        <Option value="cancelled">Đã hủy</Option>
                    </Select>
                    <RangePicker
                        onChange={(dates: any) => handleFilterChange(dates)}
                        className="w-72"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex h-24 items-center justify-center">
                    <Spin
                        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                    />
                </div>
            ) : (
                <>
                    {filterStatus === "" && (
                        <table className="w-full border border-gray-300 bg-gray-100 text-sm text-black">
                            <thead className="text-center align-middle">
                                <tr>
                                    <th className="p-2">ID</th>
                                    {/* <th className="p-2">Tên sản phẩm</th>
                                    <th className="p-2">Ảnh</th> */}
                                    <th className="p-2">Địa chỉ/Sđt</th>
                                    <th className="p-2">Giá</th>
                                    <th className="p-2">Ngày</th>
                                    <th className="p-2">Hình thức</th>
                                    <th className="p-2">Trạng thái</th>
                                    <th className="p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {currentItems?.map((data: any) => (
                                    <NameProductInListOrderAdmin
                                        key={data.id}
                                        data={data}
                                    />
                                ))}
                            </tbody>

                        </table>

                    )}
                    {/* <div className="mt-5 flex items-center justify-center">
                        <Pagination
                            current={currentPage}
                            total={bill?.length}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                        />
                    </div> */}
                    {filterStatus === "paid" && <ListOrderPaid />}
                    {filterStatus === "pending" && <ListOrderPending />}
                    {filterStatus === "confirmed" && <ListOrderConFirm />}
                    {filterStatus === "shipping" && <ListOrderSiping />}
                    {filterStatus === "delivered" && <ListOrderDones />}
                    {filterStatus === "cancelled" && <ListOrderCancel />}
                </>
            )}
        </>
    )
}

export default ListOrderAdmin
