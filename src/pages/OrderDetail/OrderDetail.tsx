import {
    addHistoryBills,
    getAllBillDetail,
    getBillDetail,
    updateCancel,
    updateDone
} from "@/api/services/Bill"
import formatNumber from "@/utilities/FormatTotal"
import { CarOutlined, LeftOutlined } from "@ant-design/icons"
import { Tag } from "antd"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ProductInOrderDetail from "./ProductInOrderDetail"

const OrderDetail = () => {
    const { id } = useParams()
    const [bill, setBill] = useState<any>()
    const [billdetail, setBillDetail] = useState<any>()
    const [totalPrice, setTotalPrice] = useState(0)
    const [color, setcolor] = useState<any>()
    const [status, setstatus] = useState<any>()

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
    }, [status])
    const fetchBillDetail = async () => {
        const user: any = JSON.parse(localStorage.getItem("user")!) || []
        const data: any = await getAllBillDetail(user?.token)
        setBillDetail(data)
    }
    useEffect(() => {
        fetchBillDetail()
    }, [])
    console.log(billdetail)

    const ProductInbill = billdetail?.filter((data: any) => data?.bill_id == id)
    useEffect(() => {
        const totalPrice: any = calculateTotalClick()
        setTotalPrice(totalPrice)
    }, [ProductInbill])

    const calculateTotalClick = () => {
        let total = 0
        if (ProductInbill) {
            ProductInbill.forEach((product: any) => {
                const price = parseFloat(product.price)
                const quantity = parseInt(product.quantity, 10)
                if (!isNaN(price) && !isNaN(quantity)) {
                    total += price * quantity
                }
            })
            return total
        }
    }

    useEffect(() => {
        if (bill?.status == "Pending") {
            setcolor("warning")
            setstatus("Chờ xác nhận")
        } else if (bill?.status == "Confirm") {
            setcolor("processing")
            setstatus("Chờ giao hàng")
        } else if (bill?.status == "Paid") {
            setcolor("brown")
            setstatus("Chờ lấy hàng")
        } else if (bill?.status == "Shipping") {
            setcolor("purple")
            setstatus("Đang giao hàng")
        } else if (bill?.status == "Done") {
            setcolor("green")
            setstatus("Hoàn thành")
        } else if (bill?.status == "Cancel") {
            setcolor("error")
            setstatus("Hủy hàng")
        }
    }, [bill])
    const HandleCancel = async (id: any) => {
        const check = confirm("Bạn có chắc chắn hủy đơn hàng?")
        if (check == true) {
            await updateCancel(id)
                .then(async (data: any) => {
                    console.log(data)
                    if (data) {
                        await addHistoryBills(data).then(() => {
                            toast.success("Bạn đã hủy đơn hàng")
                            setcolor("error")
                            setstatus("Hủy hàng")
                        })
                    } else {
                        toast.error("Không thể hủy!")
                    }
                    return
                })
                .catch((e: any) => {
                    console.log(e)
                })
        }
    }
    const HandleConfirm = async (id: any) => {
        const check = confirm("Bạn có chắc chắn đã nhận được hàng?")
        if (check == true) {
            const data = {
                bill_id: bill?.id,
                user_id: bill?.user_id,
                description: "Khách hàng xác nhận đã nhận hàng",
            }
            await updateDone(id).then(async () => {
                await addHistoryBills(data).then(() => {
                    toast.success("Thành công")
                    setcolor("processing")
                    setstatus("Chờ giao hàng")
                })
            })
        }
    }
    const parts = bill?.Recipient_address
        ? bill?.Recipient_address?.split(";").map((part: any) => part.trim())
        : ""
    const [name, descbill, address] = parts
    console.log(ProductInbill)

    return (
        <>
            <div className=" bg-White mb-10 ml-60 mr-60 mt-10 border border-gray-300 p-10">
                <div className="w-full">
                    <div>
                        <Link to="/orders">
                            <button>
                                <LeftOutlined /> Quay lại
                            </button>
                        </Link>
                    </div>
                    <div className="mt-10 flex">
                        <span className="text-2xl font-bold">
                            CHI TIẾT ĐƠN HÀNG #{bill?.id}
                        </span>
                        <Tag
                            color={color}
                            className="ml-auto mt-1 text-sm font-bold"
                        >
                            {status}
                        </Tag>
                    </div>
                    <div className="mt-5 flex w-full">
                        <div className="mr-2 w-1/3 ">
                            <span className="text-sl font-bold">
                                Địa chỉ người nhận
                            </span>
                            <div
                                className="mt-2 bg-gray-100 p-5"
                                style={{ minHeight: "200px" }}
                            >
                                <span className="font-bold">
                                    {name != "undefined" ? name : ""}
                                </span>
                                <p>Địa chỉ: {address}</p>
                                <p>Điện thoại: {bill?.Recipient_phone}</p>
                            </div>
                        </div>
                        <div className="mr-2 w-1/3">
                            <span className="text-sl font-bold">
                                Hình thức giao hàng
                            </span>
                            <div
                                className="mt-2 bg-gray-100 p-5"
                                style={{ minHeight: "200px" }}
                            >
                                <span className="font-bold">
                                    {name != "undefined" ? name : ""}
                                </span>
                                <p className="mb-2">
                                    <CarOutlined />
                                    Giao hàng tại nhà
                                </p>
                                {descbill ? (
                                    <span className="">
                                        Ghi chú đơn hàng: {descbill}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="mr-2 w-1/3 ">
                            <span className="text-sl font-bold">
                                Hình thức thanh toán
                            </span>
                            <div
                                className="mt-2 bg-gray-100 p-5"
                                style={{ minHeight: "200px" }}
                            >
                                <span className="">
                                    Hình thức thanh toán đơn hàng ({bill?.pay})
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 mt-4">
                        <span className="text-xl font-bold">THÔNG TIN ĐƠN HÀNG</span>
                        <span text-sm className="text-red-500">
                            ({ProductInbill?.length} sản phẩm)
                        </span>
                    </div>
                    <div className="w-full">
                        <table className="mb-10 w-full bg-gray-100">
                            <thead>
                                <th className="p-2">Tên Hàng</th>
                                <th className="p-2">Giá</th>
                                <th className="p-2">Số Lượng</th>
                                <th className="p-2">Tạm Tính</th>
                            </thead>
                            <tbody className="bg-white text-center align-middle">
                                {ProductInbill?.map((data: any) => {
                                    return (
                                        <>
                                            <ProductInOrderDetail data={data} />
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>

                        <hr className="my-4 ml-2 mr-2 w-full border-t border-dashed border-gray-400" />
                        <div className="flex">
                            <p className="text-sm">Tổng cộng</p>
                            <p className="mb-2 ml-auto text-xl font-bold text-red-500">
                                {formatNumber(totalPrice)} đ
                            </p>
                        </div>
                        <div className="flex">
                            <p className="text-sm">Giảm giá</p>
                            <p className="mb-2 ml-auto text-xl font-bold text-red-500">
                                -
                                {formatNumber(
                                    totalPrice - Number(bill?.total_amount),
                                )}{" "}
                                đ
                            </p>
                        </div>
                        <div className="flex">
                            <p className="text-sm">Giao hàng</p>
                            <p className="mb-2 ml-auto text-xl font-bold text-red-500">
                                +{formatNumber(30000)} đ
                            </p>
                        </div>
                        <div className="flex">
                            <p className="text-xl">Thành tiền</p>
                            <p className="mb-20 ml-auto text-3xl font-bold text-red-500">
                                {formatNumber(Number(bill?.total_amount) + 30000)} đ
                            </p>
                        </div>
                    </div>
                </div>
                {bill?.status == "Pending" ? (
                    <button
                        className="rounded bg-red-500 p-2 pl-5 pr-5 text-white"
                        onClick={() => HandleCancel(bill?.id)}
                    >
                        Hủy đơn hàng{" "}
                    </button>
                ) : (
                    <button
                        className="rounded bg-gray-300 p-2 pl-5 pr-5 text-white"
                        disabled
                    >
                        Hủy đơn hàng{" "}
                    </button>
                )}
                {bill?.status == "Shiping" ? (
                    <button
                        className="ml-5 rounded bg-green-500 p-2 pl-5 pr-5 text-white"
                        onClick={() => HandleConfirm(bill?.id)}
                    >
                        Đã nhận được hàng
                    </button>
                ) : (
                    <button className="ml-5 rounded bg-gray-300 p-2 pl-5 pr-5 text-white">
                        Đã nhận được hàng
                    </button>
                )}
            </div>
        </>
    )
}

export default OrderDetail
