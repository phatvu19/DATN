const SizeInProductDetail = ({
    data,
    product,
    idSize,
    onSize,
    value,
    index,
    color,
    onActive,
    onQuantity,
    active,
    onSize1,
}: any) => {
    console.log(data)
    console.log(product)
    console.log(idSize)
    console.log(index)
    console.log(color)
    if (!Array.isArray(product) || product.length === 0) {
        return <div></div>
    }
    let foundValue: any = undefined
    let idvarians: any = undefined
    product?.forEach((item: any) => {
        const foundObj = item.attribute_values[1]
        if (foundObj?.id == data?.id) {
            // console.log(foundObj.id , data?.id);

            foundValue = foundObj.value
            idvarians = item?.id
        }
    })
    console.log(idvarians)
    console.log(foundValue)
    const variant = value?.find((data1: any) => data1?.size == data?.value)?.variant
    const HandleClick = (values: any) => {
        onSize1(idvarians)

        onActive(values)
        onSize(variant, values, values)
        onQuantity(values)
    }
    const filteredSizes = value
        ? value
              .filter((data1: any) => data1?.color === data1?.color)
              .map((data2: any) => data2?.size)
        : []

    return (
        <>
            {filteredSizes.includes(data?.value) ? (
                <button
                    className={`m-1 mx-1 h-7 w-16 rounded-full  border ${filteredSizes.includes(data?.value) ? " border border-black" : "border-white-200 text-gray-200"} rounded-lg  ${active == data?.id ? "bg-black text-white" : "text-black"}`}
                    disabled={filteredSizes.includes(data?.value) ? false : true}
                    onClick={() => HandleClick(data.id)}
                >
                    Size {data?.value}
                </button>
            ) : (
                <button
                    className={`m-1 mx-1 h-7 w-16 rounded-full  border ${filteredSizes.includes(data?.value) ? " border border-black" : "border-white-200 text-gray-200"} rounded-lg  ${active == data?.value ? "bg-black text-white" : "text-black"}`}
                    disabled={true}
                >
                    Size {data?.value}
                </button>
            )}
        </>
    )
}

export default SizeInProductDetail
