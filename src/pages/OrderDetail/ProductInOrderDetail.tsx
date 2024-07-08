import formatNumber from "@/utilities/FormatTotal"
const ProductInOrderDetail = ({ data }: any) => {
    const parts = data?.attribute
        ? data?.attribute?.split(";").map((part: any) => part.trim())
        : ""
    const [color, size] = parts
    return (
        <>
            <tr>
                <td className="w-2/5">
                    <div className="m-2 flex">
                        <img src={data?.image} className="w-24" />
                        <div className="m-2">
                            <p className="mb-2 text-sm font-bold">
                                {data?.product_name}
                            </p>
                            <span className="text-sm ">
                                Kích thước:
                                <span className="font-bold">{size}</span>
                            </span>
                            <br />
                            <span className="text-sm">
                                Màu sắc:
                                <span className="font-bold">{color}</span>
                            </span>
                        </div>
                    </div>
                </td>
                <td>{formatNumber(data?.price)} đ</td>
                <td>x{data?.quantity}</td>
                <td>
                    <p className="font-bold">
                        {formatNumber(data?.price * data?.quantity)} đ
                    </p>
                </td>
            </tr>
        </>
    )
}

export default ProductInOrderDetail
