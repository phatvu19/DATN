import { getAllSale } from "@/api/services/Sale"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import formatNumber from "../../utilities/FormatTotal"

const PriceInProductDetail = ({
    data,
    idcolor,
    onPrice,
    sale_id,
    quantity,
}: any) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <div></div>
    }
    const data1 = data[0]
    const priceProduct = data?.find((data) =>
        data?.attribute_values?.find((data3: any) => data3?.value === idcolor),
    )?.price

    useEffect(() => {
        if (priceProduct !== undefined) {
            onPrice(priceProduct)
        }
    }, [priceProduct, onPrice])
    const [sales, setsale] = useState<any>([])
    useEffect(() => {
        const fetchSale = async () => {
            const allsale: any = await getAllSale()
            setsale(allsale)
        }

        fetchSale()
    }, [])
    const sale = sales?.find((data1: any) => data1?.id == sale_id)?.name
    const totalPrice = (data1?.price * sale) / 100
    const totalPrice1 = (priceProduct * sale) / 100
    return (
        <>
            <div className="mt-5 flex ">
                <p className="text-xl font-bold  text-red-500">
                    {idcolor ? (
                        <>
                            {sale
                                ? formatNumber(priceProduct - totalPrice1)
                                : formatNumber(priceProduct)}{" "}
                            đ
                        </>
                    ) : (
                        <>
                            {sale
                                ? formatNumber(data1?.price - totalPrice)
                                : formatNumber(data1?.price)}{" "}
                            đ
                        </>
                    )}
                </p>
                {sale ? (
                    <>
                        {" "}
                        <p className="text-xm ml-2 mt-1 text-gray-400 line-through">
                            {idcolor
                                ? formatNumber(priceProduct)
                                : formatNumber(data1?.price)}{" "}
                            đ
                        </p>
                    </>
                ) : (
                    <></>
                )}
                {quantity == 0 ? (
                    <p className="ml-auto mt-1 font-bold">
                        Hết Hàng
                        <CloseCircleOutlined
                            className="text-white-500 bg-red-500 "
                            style={{ color: "white ", borderRadius: "50%" }}
                        />
                    </p>
                ) : (
                    <p className="ml-auto mt-1 font-bold">
                        Còn Hàng
                        <CheckCircleOutlined
                            className="text-white-500 bg-green-600 "
                            style={{ color: "white ", borderRadius: "50%" }}
                        />
                    </p>
                )}
            </div>
            {/* <span className="text-sm text-red-600">Giảm 53%</span> */}
        </>
    )
}

export default PriceInProductDetail
