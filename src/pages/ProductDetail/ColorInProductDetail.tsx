import { useState } from "react"

const ColorInProductDetail = ({
    data,
    onColor,
    product,
    onSize,
    selectedColor,
}: any) => {
    console.log(product);
    console.log(data);
    
    
    const [click, setclick] = useState(null)
    if (!Array.isArray(product) || product.length === 0) {
        return <div></div>
    }

    let foundValue = undefined
    let idvarians:any = undefined
    let id_attribute_value: any = undefined
    const idAttributeValues: any = []
    product?.forEach((item:any) => {
        const foundObj = item.attribute_values[0]
        if (foundObj?.id == data?.id) {
            // console.log(foundObj.id , data?.id);
            
            foundValue = foundObj.value
            idvarians = item?.id
            // console.log(idvarians);
            id_attribute_value = foundObj.id
            idAttributeValues.push({
                color: foundObj.value,
                size: item.attribute_values[1].value,
                variant: item.id,
            })
        }
    })
// console.log(idvarians);

    const HandleClick = (id: any) => {
        if (click == data?.id) {
            setclick(null)
        } else {
            setclick(id)
        }
        onColor(data?.value)
        onSize(idvarians, id_attribute_value, idAttributeValues)
    }

    return (
        <>
            {foundValue ? (
                <>
                    <button
                        className={` m-1 mx-1 h-8 w-8 rounded-full   ${selectedColor == idvarians ? "border-4 border-gray-200" : " border-gray-200"}   `}
                        onClick={() => HandleClick(data?.id)}
                        disabled={foundValue ? false : true}
                        key={data?.id}
                        style={{ backgroundColor: `${data?.value}` }}
                    ></button>
                </>
            ) : (
                ""
            )}
        </>
    )
}

export default ColorInProductDetail
