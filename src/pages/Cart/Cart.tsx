import { getCartOrder } from "@/api/services/Order"
import { getAllSale } from "@/api/services/Sale"
import formatNumber from "@/utilities/FormatTotal"
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons"
import { Button, Spin } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import cart1 from "../../assets/images/icons/icon-bag-2.svg"
import cart2 from "../../assets/images/icons/icon-bag-3.svg"
import cart from "../../assets/images/icons/icon-bag.svg"
import ProductInCart from "./ProductInCart"

const Cart = () => {
    const [carts, setCarts] = useState<any>([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [cartt, setcart] = useState<any>()
    const [check, setcheck] = useState<any>(0)
    const handleCartUpdate = async () => {
        const storedCarts = JSON.parse(localStorage.getItem("cart")!) || []
        setCarts(storedCarts)
        const data = { data: storedCarts }
        const allCart: any = await getCartOrder(data)
        setcart(allCart)
    }
    const carttt = (cart: any) => {
        setcheck(cart)
    }
    console.log(cartt)

    const [loading, setloading] = useState(true)
    const calculateTotalClick = async () => {
        let total = 0

        const promises = cartt?.data?.map(async (product: any, index: any) => {
            const cartItem: any = carts.find(
                (item: any) => item.variant_id === product.variant_id,
            )
            const cartSale_id: any = carts[index]?.sale_id

            const allSale = await getAllSale()
            const sale: any = allSale?.find(
                (data1: any) => data1?.id == cartSale_id,
            )?.name
            const totalSale: any = (product.price * sale) / 100
            if (cartItem) {
                const price = cartSale_id ? product.price - totalSale : product.price
                const quantity = parseInt(cartItem.quantity, 10)
                if (!isNaN(price) && !isNaN(quantity)) {
                    total += price * quantity
                    console.log(total)
                }
            }
            setloading(false)
        })
        await Promise.all(promises)
        setTotalPrice(total)
    }

    useEffect(() => {
        handleCartUpdate()
    }, [check])
    useEffect(() => {
        if (cartt) {
            calculateTotalClick()
        }
    }, [cartt])
    return (
        <>
            <main className="mb-28 flex flex-wrap justify-around pl-36 pr-36 ">
                <div className="mb-10 mt-20 flex items-center justify-center">
                    <div className="flex items-center">
                        <img src={cart} className="img-fluid" />
                        <span className="text-danger ml-2 text-xl font-bold">
                            Giỏ Hàng
                        </span>
                    </div>
                    <hr className="my-4 ml-2 mr-2 w-20 border-t border-dashed border-gray-400" />

                    <div className="flex items-center">
                        <img src={cart1} className="img-fluid" />
                        <span className="ml-2 text-xl  font-light">Đặt Hàng</span>
                    </div>

                    <hr className="my-4 ml-2 mr-2 w-20 border-t border-dashed border-gray-400" />

                    <div className="flex items-center">
                        <img src={cart2} className="img-fluid" />
                        <span className="ml-2 text-xl  font-light">
                            Hoàn Thành Đơn Hàng
                        </span>
                    </div>
                </div>
                <div className="cart-main container mt-5">
                    <div className="row flex p-0">
                        <div className="col-xl-8 col-sm-12 table-responsive w-3/4">
                            <div className="bg-gray-100 p-4">
                                {carts?.length <= 0 ? (
                                    <>
                                        <div>
                                            <h5 className="mt-5 flex items-center justify-center text-xl font-bold">
                                                Giỏ Hàng Trống !
                                            </h5>
                                            <Link to={"/products"}>
                                                <button
                                                    className={`btn mb-10 mt-10 flex w-full  items-center justify-center rounded bg-red-500 p-2 pl-10 pr-10 text-white`}
                                                >
                                                    Tiếp tục mua sắm
                                                </button>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <table className="font-bold ">
                                        <thead>
                                            <th className="font-bold">STT</th>
                                            <th className="font-bold">Ảnh</th>
                                            <th className="font-bold">Sản Phẩm</th>
                                            <th className="font-bold">Giá</th>
                                            <th className="font-bold">Số Lượng</th>
                                            <th className="font-bold">Thành Tiền</th>
                                        </thead>
                                        <tbody className="00 pt-20">
                                            {cartt?.data?.map(
                                                (data: any, index: any) => {
                                                    return (
                                                        <>
                                                            <ProductInCart
                                                                data={data}
                                                                key={data?.id}
                                                                index={index}
                                                                quantity={
                                                                    carts[index]
                                                                }
                                                                onCart={carttt}
                                                            />
                                                        </>
                                                    )
                                                },
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                        <div className="ml-5 w-1/4 bg-gray-100 p-4">
                            <div className="">
                                <h5
                                    className="pb-6 font-bold"
                                    style={{ fontSize: 25 }}
                                >
                                    ĐƠN HÀNG
                                </h5>

                                <div className="custom-dash d-flex flex-column gap-2 pb-3">
                                    <small className="fw-bold fs-6">
                                        Quý Khách Vui Lòng Nhập Mã Phiếu Giảm Giá Ở
                                        Bước Kế Tiếp
                                    </small>
                                </div>
                                <div className="custom-dash d-flex flex-column gap-2 pb-3">
                                    <div className="align-items-center justify-content-between flex">
                                        <h5 className="text-danger mb-0 font-bold">
                                            Tổng giá trị đơn hàng
                                        </h5>
                                        <h5
                                            className="text-danger fw-bold mb-0 ml-auto font-bold text-red-500"
                                            style={{ fontSize: 20 }}
                                            ng-if="totalPrice"
                                        >
                                            {formatNumber(totalPrice)}đ
                                        </h5>
                                    </div>
                                    <hr className="mb-2 mt-4  border-t border-dotted border-gray-400 " />
                                </div>

                                <div className="flex items-center justify-center ">
                                    {loading ? (
                                        <>
                                            <Button
                                                className={`btn w-full ${cartt?.length <= 0 ? "bg-gray-500" : "bg-gray-400"} flex items-center  justify-center rounded p-2 pl-10 pr-10 text-white`}
                                                disabled={
                                                    cartt?.length <= 0 ? true : false
                                                }
                                            >
                                                <Spin
                                                    indicator={
                                                        <LoadingOutlined
                                                            style={{ fontSize: 16 }}
                                                            spin
                                                        />
                                                    }
                                                />
                                            </Button>
                                        </>
                                    ) : (
                                        <Link to={"/checkout"}>
                                            <Button
                                                className={`btn w-full ${cartt?.length <= 0 ? "bg-gray-500" : "bg-red-500"} flex items-center  justify-center rounded p-2 pl-10 pr-10 text-white`}
                                                disabled={
                                                    cartt?.length <= 0 ? true : false
                                                }
                                            >
                                                Tiếp Tục Thanh Toán{" "}
                                                <ArrowRightOutlined />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Cart
