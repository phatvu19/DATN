import { GetSaleId } from "@/api/services/Sale"
import { useEffect, useState } from "react"
import formatNumber from "../../utilities/FormatTotal"

const ProductInCartCheckOut = ({ data, index, quantity }: any) => {
    const [sales, setsale] = useState<any>([])
    useEffect(() => {
        const fetchSale = async () => {
            const allsale: any = await GetSaleId(quantity?.sale_id)
            setsale(allsale?.name)
        }

        fetchSale()
    }, [])
    const totalPrice = (data?.price * sales) / 100
    return (
        <>
            <tr className="bg-gray-100">
                <td className="mt-5 text-center align-middle">{index + 1}</td>
                <td className="mt-5 flex items-center justify-center">
                    <img src={quantity?.image} className="w-20" />
                </td>
                <td className="ml-10 mr-10 mt-10 w-60 whitespace-normal text-center align-middle">
                    <h6>
                        <a href="#" className="text-sl font-bold">
                            {quantity?.name_product.length >= 25 ? (
                                <>{quantity?.name_product?.slice(0, 25)}</>
                            ) : (
                                quantity?.name_product
                            )}
                        </a>
                    </h6>
                    <p className="mt-2">
                        Kích thước:{" "}
                        <span className="font-bold">{data?.atribute[1].value}</span>
                        <br />
                        Màu sắc:{" "}
                        <span className="font-bold">{data?.atribute[0].value}</span>
                    </p>
                </td>
                <td className="mt-5 text-center align-middle font-bold text-red-500">
                    {sales ? (
                        <span className="text-sl p-2 font-normal text-black line-through">
                            {formatNumber(data?.price)}đ
                        </span>
                    ) : (
                        ""
                    )}
                    {sales
                        ? formatNumber(data?.price - totalPrice)
                        : formatNumber(data?.price)}{" "}
                    đ{/* {formatNumber(data?.price)} đ */}
                </td>
                <td className="mt-5 pl-9 text-center align-middle">
                    {quantity?.quantity}
                </td>
                <td className="mt-5 text-center align-middle font-bold">
                    {sales
                        ? formatNumber(
                              (data?.price - totalPrice) * quantity?.quantity,
                          )
                        : formatNumber(data?.price * quantity?.quantity)}
                    đ
                </td>
            </tr>
            <hr className="my-1 w-full border-t border-dashed border-white " />
        </>
    )
}

export default ProductInCartCheckOut
