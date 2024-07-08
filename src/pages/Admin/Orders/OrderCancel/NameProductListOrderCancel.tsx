import { getAllBillDetail, getBillsDetail } from "@/api/services/Bill"
import formatNumber from "@/utilities/FormatTotal"
import { Skeleton, Tag } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const NameProductListOrderCancel = ({ data, data1 }: any) => {
    const [billdetail, setBillDetail] = useState<any>()
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
        if (data?.status == "Cancel") {
            setcolor("error")
            setstatus("Hủy hàng")
        }
    }, [data])
    const total: any = Number(billdetail?.total_amount)
    console.log(billdetail)

    return (
        <>
            {loading ? (
                <>
                    <tr className="mt-2">
                        <td colSpan={9}>
                            <div className="mt-5 flex h-24 items-center justify-center">
                                <Skeleton active />
                            </div>
                        </td>
                    </tr>
                </>
            ) : (
                <>
                    {" "}
                    <tr className="items-center justify-center p-2" key={data?.id}>
                        <td className="p-2 text-center font-normal">{data?.id}</td>
                        <td className="p-2 text-center font-normal">
                            src=
                            {billdetail?.bill_details[0]
                                ? billdetail?.bill_details[0].product_name
                                : ""}
                        </td>
                        <td className="w-1/9 flex items-center justify-center p-2">
                            <img
                                className="h-26 w-20"
                                src={
                                    billdetail?.bill_details[0]
                                        ? billdetail?.bill_details[0].image
                                        : ""
                                }
                                alt=""
                            />
                        </td>
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
                        <td className="p-2 text-center font-normal">COD</td>
                        <td className="p-2 text-center font-normal">
                            <Tag color={color}>{status}</Tag>
                        </td>
                        <td className="p-2 font-normal" style={{ width: "10%" }}>
                            <Link to={`/quan-ly-orders/${data?.id}`}>
                                <button className="w-24 rounded border border-gray-300 bg-white p-1 text-black ">
                                    Chi tiết
                                </button>
                            </Link>
                        </td>
                    </tr>
                </>
            )}
        </>
    )
}

export default NameProductListOrderCancel
