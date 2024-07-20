const QuantityInProductDetail = ({ product, variant }: any) => {
    if (!Array.isArray(product) || product.length === 0) {
        return <div></div>
    }
    let quantity: any = undefined
    product?.forEach((item: any) => {
        if (item?.id == variant) {
            quantity = item.quantity
        }
    })

    return (
        <>
            {!variant ? (
                <>
                    Còn<p className="ml-2 font-bold mr-2"> {product[0]?.quantity} </p>  sản phẩm
                </>
            ) : (
                <>
                        Còn <p className="ml-2 font-bold mr-2"> {quantity} </p>  sản phẩm
                </>
            )}
        </>
    )
}

export default QuantityInProductDetail
