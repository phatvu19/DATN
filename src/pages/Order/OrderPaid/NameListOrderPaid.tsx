import { getAllBillDetail, getBillsDetail } from "@/api/services/Bill"
import formatNumber from "@/utilities/FormatTotal"
import { Skeleton, Tag } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const NameListOrderPaid = ({ data }: any) => {
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
        if (data?.status == "Paid") {
            setcolor("brown")
            setstatus("Chờ lấy hàng")
        }
    }, [data])
    const total: any = Number(data?.total_amount)
    console.log(billdetail);
    
    return (
        <>
            {loading ? (
                <>
                    <div className="mt-5 flex h-24 items-center justify-center">
                        <Skeleton active />
                    </div>
                </>
            ) : (
                <div key={data?.id} className="mb-5 border border-black">
                    <div className=" flex p-2">
                        <img
                            src={
                                billdetail?.bill_details[0]
                                    ? billdetail?.bill_details[0]?.image
                                    : ""
                            }
                            alt=""
                            className="mr-5 w-1/5"
                        />
                        <div className=" d-flex flex-column">
                            <span className="text-black">
                                {billdetail?.bill_details[0]?.product_name.length > 20 ? (
                                    <>{billdetail?.bill_details[0]?.product_name?.slice(0, 30)}...</>
                                ) : (
                                    <>{billdetail?.bill_details[0]?.product_name}</>
                                )}
                                <p>
                                    <Tag color={color}>{status}</Tag>
                                </p>
                            </span>
                            <br />
                            <span className="text-xl font-normal text-black">
                                {billdetail?.bill_details?.length} sản phẩm
                            </span>
                            <br />
                            <span className="text-xl font-normal text-black">
                                Ngày đặt hàng: {data?.created_at}
                            </span>
                            <br />
                            <span className="text-xl font-normal text-red-600">
                                Thành tiền: {formatNumber(total + 30000)} đ
                            </span>
                        </div>
                        <div className="mt-4 lg:mb-0 lg:ml-auto lg:mr-0 lg:mt-0 ">
                            <Link to={`/orders/${data?.id}`}>
                                <button className="rounded border border-gray-200 bg-red-500 p-1 pl-4 pr-4 text-sm font-normal text-black text-white">
                                    Xem chi tiết
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NameListOrderPaid
