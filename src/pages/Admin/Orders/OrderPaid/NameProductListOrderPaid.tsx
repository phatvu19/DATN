import {
    addHistoryBills,
    getAllBillDetail,
    getBillsDetail,
    updateCancel,
    updateConfirm,
    updateShiping,
} from "@/api/services/Bill"
import formatNumber from "@/utilities/FormatTotal"
import { LoadingOutlined } from "@ant-design/icons"
import { Skeleton, Spin, Tag } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const NameProductListOrderPaid = ({ data, onCheck }: any) => {
    const user = JSON.parse(localStorage.getItem('user')!)
    // const billsProduct = billdetail?.find((item: any) => item?.bill_id == data?.id)
    const [color, setcolor] = useState<any>()
    const [status, setstatus] = useState<any>()
    useEffect(() => {
        if (data?.status == "Paid") {
            setcolor("brown")
            setstatus("Chờ lấy hàng")
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
                const data1 = {
                    bill_id: data?.id,
                    user_id: user?.data?.id,
                    description: `Admin xác nhận hủy đơn hàng; Lý do: ${input}`,
                }
                await updateCancel(id).then(async () => {
                    await addHistoryBills(data1).then(() => {
                        toast.success("Bạn đã hủy đơn hàng")
                        setcolor("error")
                        setstatus("Hủy hàng")
                        onCheck(data?.id)
                    })
                })
                return
            } else {
                alert("Vui lòng nhập lý do hủy đơn hàng.")
            }
        }
    }
    const HandleConfirm = async (id: any) => {
        const check = confirm("Bạn chắc chắn muốn giao đơn hàng này?")
        if (check == true) {
            const data1 = {
                bill_id: data?.id,
                user_id: data?.user_id,
                description: `Admin xác nhận đơn hàng đang giao`,
            }
            await updateShiping(id).then(async () => {
                await addHistoryBills(data1).then(() => {
                    toast.success("Bạn đã chuyển sang đang giao hàng!")
                    setcolor("processing")
                    setstatus("Chờ giao hàng")
                    onCheck(data?.id)
                })
            })
        }
    }
    const total: any = Number(data?.total_amount)
    return (
        <>
            <tr className="items-center justify-center p-2 h-36 border border-gray-300" key={data?.id}>
                <td className="p-2 text-center font-normal">{data?.id}</td>
                <td
                    className="p-2 text-center font-normal"
                    style={{ width: "20%" }}
                >
                    <span className="font-bold">Đ/c</span>:{" "}
                    {data?.Recipient_address}
                    <br />
                    <span className="font-bold">Sđt</span>:{" "}
                    {data?.Recipient_phone}
                </td>
                <td
                    className="p-2 text-center font-normal "
                    style={{ width: "10%" }}
                >
                    {formatNumber(total + 30000)} đ
                </td>
                <td className="p-2 text-center font-normal">
                    {data?.created_at.substring(0, 19)}
                </td>
                <td className="p-2 text-center font-normal">  {data?.pay}</td>
                <td className="p-2 text-center font-normal">
                    <Tag color={color}>{status}</Tag>
                </td>
                <td className="p-2 font-normal" style={{ width: "10%" }}>
                    {/* <button
                        className="mb-1 w-24 rounded bg-red-500 p-1 text-white"
                        onClick={() => HandleCancel(data?.id)}
                    >
                        Hủy
                    </button> */}
                    <button
                        className="mb-1 w-24 rounded bg-blue-500 p-1 text-white"
                        onClick={() => HandleConfirm(data?.id)}
                    >
                        Giao hàng
                    </button>
                    <Link to={`/admin/quan-ly-orders/${data?.id}`}>
                        <button className="w-24 rounded border border-gray-300 bg-white p-1 text-black ">
                            Chi tiết
                        </button>
                    </Link>
                </td>
            </tr>
        </>
    )
}
export default NameProductListOrderPaid
