import { Spin, Tabs, TabsProps } from "antd"
import { useEffect, useState } from "react"
import AllOrderInListOrder from "./AllOrderInListOrder"
import { GetBillWithUser } from "@/api/services/Bill"
import { LoadingOutlined } from "@ant-design/icons"
import ListOrderPending from "./OrderPending/ListOrderPending"
import ListOrderConFirm from "./OrderConfirm/ListOrderConfirm"
import ListOrderSiping from "./OrderShiping/ListOrderShiping"
import ListOrderDones from "./OrderDone/ListOrderDone"
import ListOrderCancel from "./OrderCancel/ListOrderCancel"
import ListOrderPaid from './OrderPaid/ListOrderPaid';

const ListOrder = () => {
    const [bills, setBill] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const users = JSON.parse(localStorage.getItem("user")!)
    const [check, setcheck] = useState<any>()
    const fetchOrders = async () => {
        try {
            const data: any = await GetBillWithUser(users?.data?.id || "")
            setBill(data)
        } catch {
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchOrders()
    }, [check])
    const check1 = (value: any) => {
        setcheck(value)
    }
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Tất cả đơn hàng",
            children: (
                <>
                    {loading ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 48 }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <AllOrderInListOrder data={bills} onCheck1={check1} />
                        </>
                    )}
                </>
            ),
        },
        {
            key: "2",
            label: "Chờ xác nhận",
            children: (
                <>
                    {loading ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 48 }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ListOrderPending />
                        </>
                    )}
                </>
            ),
        },
        {
            key: "3",
            label: "Chờ lấy hàng",
            children: (
                <>
                    {loading ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 48 }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ListOrderPaid />
                        </>
                    )}
                </>
            ),
        },
        {
            key: "4",
            label: "Đã xác nhận",
            children: (
                <>
                    {loading ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 48 }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ListOrderConFirm />
                        </>
                    )}
                </>
            ),
        },
        {
            key: "5",
            label: "Đang giao",
            children: (
                <>
                    {loading ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 48 }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ListOrderSiping />
                        </>
                    )}
                </>
            ),
        },
        {
            key: "6",
            label: "Đã giao",
            children: (
                <>
                    {loading ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 48 }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ListOrderDones />
                        </>
                    )}
                </>
            ),
        },
        {
            key: "7",
            label: "Đã hủy",
            children: (
                <>
                    {loading ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 48 }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ListOrderCancel />
                        </>
                    )}
                </>
            ),
        },
    ]
    const onChange = (key: string) => {
        console.log(key)
    }

    return (
        <>
            <div className="bg-gray-100 p-5 pl-32 pr-32">
                <div className="bg-white p-5 pl-32 pr-32">
                    <span className="text-2xl font-bold">Tất cả đơn hàng</span>
                    <hr className="my-4 w-full border-t border-dashed border-gray-500" />
                    <div>
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                            className="text-2xl font-bold text-red-500"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListOrder
