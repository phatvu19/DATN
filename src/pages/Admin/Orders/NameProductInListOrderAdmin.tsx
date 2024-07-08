import {
    addHistoryBills,
    getAllBillDetail,
    getBillsDetail,
    updateCancel,
    updateConfirm,
} from "@/api/services/Bill"
import { useEffect, useState } from "react"
import formatNumber from "@/utilities/FormatTotal"
import { Skeleton, Tag } from "antd"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const NameProductInListOrderAdmin = ({ data }: any) => {
    const [billdetail, setBillDetail] = useState<any>()
    const [check, setcheck] = useState<any>(false)
    const [loading, setloading] = useState<any>(true)
    const fetchBillDetail = async () => {
        try {
            const data1: any = await getBillsDetail(data?.id)
            setBillDetail(data1)
        } catch (error) {
            console.error("Error fetching bill details:", error)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchBillDetail()
    }, [])
    // const billsProduct = billdetail?.find((item: any) => item?.bill_id == data?.id)
    const [color, setcolor] = useState<any>()
    const [status, setstatus] = useState<any>()

    useEffect(() => {
        if (data?.status == "Pending") {
            setcolor("warning")
            setstatus("Chờ xác nhận")
            setcheck(true)
        } else if (data?.status == "Confirm") {
            setcolor("processing")
            setstatus("Chờ giao hàng")
        } else if (data?.status == "Paid") {
            setcolor("brown")
            setstatus("Chờ xác nhận")
            setcheck(true)
        } else if (data?.status == "Shiping") {
            setcolor("purple")
            setstatus("Đang giao hàng")
        } else if (data?.status == "Done") {
            setcolor("green")
            setstatus("Hoàn thành")
        } else if (data?.status == "Cancel") {
            setcolor("error")
            setstatus("Hủy hàng")
        }
    }, [data])
    const HandleCancel = async (id: any) => {
        let input: any = ""
        while (input.trim() === "") {
            input = window.prompt("Lý do hủy đơn hàng:")
            if (input === null) {
                return
            }
            if (input.trim() !== "") {
                const data = {
                    bill_id: billdetail?.id,
                    user_id: billdetail?.user_id,
                    description: `Admin xác nhận hủy đơn hàng; Lý do: ${input}`,
                }
                await updateCancel(id).then(async () => {
                    await addHistoryBills(data).then(() => {
                        toast.success("Bạn đã hủy đơn hàng")
                        setcolor("error")
                        setstatus("Hủy hàng")
                        setcheck(false)
                    })
                })
                return
            } else {
                alert("Vui lòng nhập lý do hủy đơn hàng.")
            }
        }
    }
    const HandleConfirm = async (id: any) => {
        const check = confirm("Bạn chắc chắn muốn xác nhận đơn hàng này?")
        if (check == true) {
            const data = {
                bill_id: billdetail?.id,
                user_id: billdetail?.user_id,
                description: `Admin xác nhận đơn hàng`,
            }
            await updateConfirm(id).then(async () => {
                await addHistoryBills(data).then(() => {
                    toast.success("Bạn đã xác nhận đơn hàng")
                    setcolor("processing")
                    setstatus("Chờ giao hàng")
                    setcheck(false)
                })
            })
        }
    }
    const parts = billdetail?.Recipient_address
        ? billdetail?.Recipient_address?.split(";").map((part: any) => part.trim())
        : ""
    const [name, descbill, address] = parts
    const total: any = Number(billdetail?.total_amount)
    return (
        <>
            {loading ? (
                <>
                    <tr>
                        <td colSpan={9}>
                            <div className="mt-5 flex h-24 items-center justify-center">
                                <Skeleton active />
                            </div>
                        </td>
                    </tr>
                </>
            ) : (
                <>
                    <tr
                        className="items-center justify-center p-2"
                        key={billdetail?.id}
                    >
                        <td className="p-2 text-center font-normal">
                            {billdetail?.id}
                        </td>
                        <td className="p-2 text-center font-normal">
                            {billdetail?.bill_details[0]
                                ? billdetail?.bill_details[0]?.product_name
                                : ""}
                        </td>
                        <td className="w-1/9 flex items-center justify-center p-2">
                            <img
                                className="h-26 w-20"
                                src={
                                    billdetail?.bill_details[0]
                                        ? billdetail?.bill_details[0]?.image
                                        : ""
                                }
                                alt=""
                            />
                        </td>
                        <td
                            className="p-2 text-center font-normal"
                            style={{ width: "20%" }}
                        >
                            <span className="font-bold">Đ/c</span>: {address}
                            <br />
                            <span className="font-bold">Sđt</span>:{" "}
                            {billdetail?.Recipient_phone}
                        </td>
                        <td
                            className="p-2 text-center font-normal "
                            style={{ width: "10%" }}
                        >
                            {formatNumber(total + 30000)} đ
                        </td>
                        <td className="p-2 text-center font-normal">
                            {billdetail?.created_at.substring(0, 19)}
                        </td>
                        <td className="p-2 text-center font-normal">
                            {billdetail?.pay}
                        </td>
                        <td className="p-2 text-center font-normal">
                            <Tag color={color}>{status}</Tag>
                        </td>
                        <td className="p-2 font-normal" style={{ width: "10%" }}>
                            {check ? (
                                <>
                                    <button
                                        className="mb-1 w-24 rounded bg-red-500 p-1 text-white"
                                        onClick={() => HandleCancel(billdetail?.id)}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="mb-1 w-24 rounded bg-blue-500 p-1 text-white"
                                        onClick={() => HandleConfirm(billdetail?.id)}
                                    >
                                        Xác nhận
                                    </button>
                                    <Link to={`/quan-ly-orders/${billdetail?.id}`}>
                                        <button className="w-24 rounded border border-gray-300 bg-white p-1 text-black ">
                                            Chi tiết
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={`/quan-ly-orders/${billdetail?.id}`}>
                                        <button className="w-24 rounded border border-gray-300 bg-white p-1 text-black ">
                                            Chi tiết
                                        </button>
                                    </Link>
                                </>
                            )}
                        </td>
                    </tr>
                </>
            )}
        </>
    )
}

export default NameProductInListOrderAdmin
