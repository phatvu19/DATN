const SizeInProductDetail = ({
    data,
    product,
    idSize,
    onSize,
    value,
    index,
    color,
    onActive,
    active,
}: any) => {
    if (!Array.isArray(product) || product.length === 0) {
        return <div></div>
    }
    const HandleClick = (values: any) => {
        onActive(values)
        onSize(value[index]?.variant, values, values)
    }
    const filteredSizes = value
        ? value
              .filter((data1: any) => data1?.color === data1?.color)
              .map((data2: any) => data2?.size)
        : []
    // console.log(value[index]?.variant)

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
