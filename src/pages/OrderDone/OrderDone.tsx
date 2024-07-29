import { getBillDetail } from "@/api/services/Bill"
import { Button, Result } from "antd"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const OrderDone = () => {
    const { id }: any = useParams()
    const [color, setcolor] = useState<any>()
    const [status, setstatus] = useState<any>()
    const [bill, setBill] = useState<any>()
    const fetchOrder = async () => {
        const user = JSON.parse(localStorage.getItem("user")!) || []
        const data = {
            id: id,
            token: user?.token,
        }
        const data1: any = await getBillDetail(data)
        setBill(data1)
    }
    useEffect(() => {
        fetchOrder()
    }, [])

    useEffect(() => {
        if (bill?.status == "Pending") {
            setcolor("warning")
            setstatus("Chờ xác nhận")
        } else if (bill?.status == "Confirm") {
            setcolor("warning")
            setstatus("Chờ giao hàng")
        } else if (bill?.status == "Paid") {
            setcolor("warning")
            setstatus("Chờ lấy hàng")
        } else if (bill?.status == "Shiping") {
            setcolor("warning")
            setstatus("Đang giao hàng")
        } else if (bill?.status == "Done") {
            setcolor("success")
            setstatus("Hoàn thành")
        } else if (bill?.status == "Cancel") {
            setcolor("error")
            setstatus("Hủy hàng")
        }
    }, [bill])
    return (
        <>
            <div className=" mb-10 ml-40 mr-40 mt-10 bg-gray-100">
                <div className="row d-flex cart align-items-center justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="row g-0">
                                <Result
                                    status={color}
                                    //   status={status}
                                    title={status}
                                    extra={[
                                        <Link to="/">
                                            <Button type="primary" key="console">
                                                Trang chủ
                                            </Button>
                                        </Link>,
                                        <Link to={`/orders/${id}`}>
                                            <Button key="buy">
                                                Xem chi tiết đơn hàng
                                            </Button>
                                        </Link>,
                                    ]}
                                />
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDone
