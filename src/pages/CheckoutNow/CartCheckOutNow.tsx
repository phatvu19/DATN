import { getCartOrder } from "@/api/services/Order"
import { useEffect, useState } from "react"
import ProductInCartCheckOutNow from "./ProductInCartCheckOutNow"

const CartInCheckOutNow = ({ data }: any) => {
    const [carts, setCarts] = useState([])
    const handleCartUpdate = async () => {
        const storedCarts = JSON.parse(localStorage.getItem("cartnow")!) || []
        setCarts(storedCarts)
        const data = { data: storedCarts }
        const allCart: any = await getCartOrder(data)
        console.log(allCart)
        let total = 0
        let totalQuantity = 0
        let hasSaleId1 = false
        storedCarts.forEach((item: any) => {
            totalQuantity += item.quantity
            if (item.sale_id === 1) {
                hasSaleId1 = true
            }
        })
        console.log(hasSaleId1)

        storedCarts.forEach((item: any, index: any) => {
            total += allCart?.data[index]?.price * item.quantity
            console.log(false)
        })
        console.log(total)
    }
    useEffect(() => {
        handleCartUpdate()
    }, [])

    return (
        <>
            <div className="mt-5 bg-white p-5">
                <h5 className="text-xl font-bold">
                    Giỏ hàng
                    <span className="text-xs text-red-600">
                        ({carts.length}) sản phẩm
                    </span>
                </h5>
                <table className=" table-striped mt-5 table w-full">
                    <thead className="bg-gray-100">
                        <th className="pb-4 pt-4">STT</th>
                        <th className="pb-4 pt-4 text-sm">Ảnh</th>
                        <th className="pb-4 pt-4 text-sm">Sản Phẩm</th>
                        <th className="pb-4 pt-4 text-sm">Giá</th>
                        <th className="pb-4 pt-4 text-sm">Số Lượng</th>
                        <th className="pb-4 pt-4 text-sm">Tổng Tiền</th>
                    </thead>

                    <tbody>
                        <hr className="my-1 w-full border-t border-dashed border-white " />
                        {data?.data?.map((data: any, index: any) => {
                            return (
                                <>
                                    <ProductInCartCheckOutNow
                                        data={data}
                                        index={index}
                                        key={data?.id}
                                        quantity={carts[index]}
                                    />
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CartInCheckOutNow
