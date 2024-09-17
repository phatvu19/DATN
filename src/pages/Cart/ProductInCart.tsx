import { ClearOutlined, LoadingOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import formatNumber from "../../utilities/FormatTotal"
import { toast } from "react-toastify"
import { getProductById } from "@/api/services/ProductService"
import { GetSaleId, getAllSale, getAllSaleProduct } from "@/api/services/Sale"
import { Skeleton, Spin } from "antd"

const ProductInCart = ({ data, index, quantity, onCart }: any) => {
    console.log(quantity)

    const [carts, setCarts] = useState([])
    const [displayQuantity, setDisplayQuantity] = useState(quantity.quantity)
    const [check, setcheck] = useState(false)

    useEffect(() => {
        const storedCarts = JSON.parse(localStorage.getItem("cart")!) || []

        setCarts(storedCarts)
    }, [])
    const handleDecrease = (id: any) => {
        let updatedCarts: any = [...carts]
        const index = updatedCarts.findIndex((item: any) => item.variant_id == id)
        if (index !== -1) {
            if (updatedCarts[index].quantity > 1) {
                updatedCarts[index].quantity--
            } else {
                const check = confirm("Bạn có muốn xóa?")
                if (check == true) {
                    updatedCarts = updatedCarts.filter(
                        (item: any) => item.variant_id !== id,
                    )
                    window.location.href = "/cart"
                }
            }
            setDisplayQuantity(updatedCarts[index].quantity)
            localStorage.setItem("cart", JSON.stringify(updatedCarts))
            setcheck(true)
            onCart(id)
            setTimeout(() => {
                window.location.reload()
            }, 100)
        } else {
            return
        }
    }

    const handleIncrease = (id: any) => {
        const updatedCarts: any = [...carts];
        const index = updatedCarts.findIndex((item: any) => item.variant_id === id);
    
        if (index !== -1) {
            // Check if incrementing would exceed the maximum quantity
            if (updatedCarts[index].quantity + 1 > quantity?.quantitymax) {
                toast.error("Vượt quá số lượng!");
                return;
            }
    
            // If not, increment the quantity and update the cart
            updatedCarts[index].quantity++;
            setDisplayQuantity(updatedCarts[index].quantity);
            localStorage.setItem("cart", JSON.stringify(updatedCarts));
            setcheck(true);
            onCart(id);
    
            // Reload the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } else {
            // Handle the case where the item is not found in the cart
            return;
        }
    };
    
    const HandleRemove = (productToRemove: any) => {
        console.log(productToRemove)
        const check = confirm("Bạn có muốn xóa?")
        if (check == true) {
            const carts = JSON.parse(localStorage.getItem("cart")!) || []
            const updatedCart = carts.filter(
                (item: any) => item.variant_id !== productToRemove,
            )
            console.log(JSON.stringify(updatedCart))
            localStorage.setItem("cart", JSON.stringify(updatedCart))
            toast.success("Bạn đã xóa sản phẩm đó khỏi giỏ hàng!")
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }
    const [sales, setsale] = useState<any>([])
    const [loading, setLoading] = useState<any>(true)
    useEffect(() => {
        const fetchSale = async () => {
            const sale: any = await GetSaleId(quantity?.sale_id)
            setsale(sale?.name)
            setLoading(false)
        }

        fetchSale()
    }, [])
    const totalPrice = (data?.price * sales) / 100
    const sumtotal = sales
        ? (data?.price - totalPrice) * displayQuantity
        : data?.price * displayQuantity
    return (
        <>
            {loading ? (
                <tr>
                    <td colSpan={7} className="flex items-center justify-center">
                        <Skeleton />
                    </td>
                </tr>
            ) : (
                <>
                    <tr ng-repeat="item in cart" className="relative pb-20 border border-gray-3">
                        <td className="pt-5 font-normal">{index + 1}</td>
                        <td className="pt-5 font-normal">
                            <img src={quantity?.image} width="90px" />
                        </td>
                        <td className="pl-8 pr-8 pt-0 font-normal">
                            <p
                                style={{
                                    fontWeight: "500",
                                    paddingBottom: "7px",
                                    fontSize: "16px",
                                }}
                            >
                                {quantity?.name_product?.length >= 20 ? <>{quantity?.name_product?.slice(0, 20)}...</> : quantity?.name_product}
                            </p>
                            <p style={{ fontSize: "14px" }}>
                                Kích thước: {data?.atribute[1].value}
                                <br />
                                Màu sắc: {data?.atribute[0].value}
                            </p>
                        </td>
                        <td className="pl-5 pr-5 font-normal">
                            {sales ? (
                                <span className="text-sl p-2 line-through">
                                    {formatNumber(data?.price)}đ
                                </span>
                            ) : (
                                ""
                            )}
                            {sales ? (
                                <span className="font-500 text-red-500">
                                    {formatNumber(data?.price - totalPrice)}đ
                                </span>
                            ) : (
                                <>{formatNumber(data?.price)}đ</>
                            )}
                        </td>
                        <td className="pl-4 pr-4 font-normal">
                            <div className="flex items-center">
                                <button
                                    className="h-8 w-8 cursor-pointer select-none rounded border px-2 py-1 text-center text-gray-700 hover:bg-gray-200 focus:outline-none"
                                    onClick={() => handleDecrease(quantity?.variant_id)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="w-15 h-8 cursor-pointer select-none rounded border px-2 py-1 text-center text-gray-700 hover:bg-gray-200 focus:outline-none "
                                    min="1"
                                    max="9"
                                    value={displayQuantity}
                                />
                                <button
                                    className="h-8 w-8 cursor-pointer select-none rounded border px-2 py-1 text-center text-gray-700 hover:bg-gray-200 focus:outline-none"
                                    onClick={() => handleIncrease(quantity?.variant_id)}
                                >
                                    +
                                </button>
                            </div>
                        </td>
                        <td className="pl-4 pr-4 font-bold">
                            {formatNumber(sumtotal)}đ
                        </td>
                        <td className="pl-4">
                            <ClearOutlined
                                className="bg-white p-2 text-red-500"
                                onClick={() => HandleRemove(quantity?.variant_id)}
                            />
                        </td>
                    </tr>

                </>
            )}
        </>
    )
}

export default ProductInCart
