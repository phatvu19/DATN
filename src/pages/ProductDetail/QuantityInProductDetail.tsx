import { useEffect } from "react"

const QuantityInProductDetail = ({ product, variant, onQuantity }: any) => {
    if (!Array.isArray(product) || product.length === 0) {
        return <div></div>
    }
    let quantity: any = undefined
    product?.forEach((item: any) => {
        if (item?.id == variant) {
            quantity = item.quantity
        }
    })
    useEffect(() => {
        onQuantity(quantity)
    }, [variant])
    const quantitypro = product.find((item: any) => item.quantity > 0).quantity
    return (
        <>
            {!variant ? (
                <>
                    Còn
                    <p className="ml-2 mr-2 font-bold">{quantitypro}</p>
                    sản phẩm
                </>
            ) : (
                <>
                    Còn <p className="ml-2 mr-2 font-bold"> {quantity} </p> sản phẩm
                </>
            )}
        </>
    )
}

export default QuantityInProductDetail
