import { useEffect, useState } from "react"
import { Image, List, Rate } from "antd"
import {
    CarryOutOutlined,
    HddOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { getProductById } from "@/api/services/ProductService"
import CategoryInProductDetail from "./CategoryInProductDetail"
import PriceInProductDetail from "./PriceInProductDetail"
import ColorInProductDetail from "./ColorInProductDetail"
import SizeInProductDetail from "./SizeInProductDetail"
import { toast } from "react-toastify"
import QuantityInProductDetail from "./QuantityInProductDetail"
import { getAllAttributeValue } from "@/api/services/AttributeService"
import Comment from "./Comment"
const ProductDetail = () => {
    const { id }: any = useParams()
    const [selectedColor, setSelectedColor] = useState(null)
    const [quantity, setquantity] = useState(1)
    const [attributeValues, setAttributeValues] = useState<any>({})
    const carts = JSON.parse(localStorage.getItem("cart") || "[]")
    const [product, setProduct] = useState<any>()
    const [sizevalue, setSizevalue] = useState()
    const [prices, setprices] = useState()
    const fetchProducts = async () => {
        const data: any = await getProductById(id)
        setProduct(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    const fetchAttributeValues = async () => {
        const values = await getAllAttributeValue()
        const organizedValues = values.reduce((acc: any, item: any) => {
            if (!acc[item.attribute_id]) {
                acc[item.attribute_id] = []
            }
            acc[item.attribute_id].push(item)
            return acc
        }, {})
        setAttributeValues(organizedValues)
    }
    useEffect(() => {
        fetchAttributeValues()
    }, [])

    const [idColor, setIdcolor] = useState()
    const HandlePrice = (value: any) => {
        setIdcolor(value)
    }
    const [idsize, setIdsize] = useState()
    const [id_attribute_value, setid_attribute_value] = useState()
    const [id_attribute_size, setid_attribute_size] = useState()
    const [value, setvalue] = useState()
    const HandleSize = (
        idvarian: any,
        idattributevalue: any,
        idAttributeValues: any,
    ) => {
        setIdsize(idvarian)
        setSelectedColor(idvarian)
        setid_attribute_value(idattributevalue)
        setvalue(idAttributeValues)
    }
    const [sizevalues, setsizevalue] = useState()
    const sizes = (idvarian: any, idattributevalue: any, sizeValue: any) => {
        setSizevalue(idvarian)
        setid_attribute_size(idattributevalue)
        setsizevalue(sizeValue)
    }
    const price = (value: any) => {
        setprices(value)
    }

    const HandleAddtoCart = async () => {
        const data = {
            image: product?.image,
            variant_id: sizevalue,
            quantity: quantity,
            name_product: product?.name,
            sale_id: product?.sale_id,
            attributes: [
                {
                    attribute_name: 1,
                    attribute_value: id_attribute_value,
                },
                {
                    attribute_name: 2,
                    attribute_value: id_attribute_size,
                },
            ],
        }
        if (quantity <= 0) {
            return toast.error('Hãy chọn số lượng lại!')
        }
        if (idsize == undefined) {
            toast.error("Bạn cần chọn size!")
        } else if (sizevalue == undefined) {
            toast.error("Bạn cần chọn color!")
        } else {
            const existingProductIndex = carts?.findIndex(
                (item: any) =>
                    item.variant_id == idsize &&
                    item?.attributes[0].attribute_value == id_attribute_value &&
                    item?.attributes[1].attribute_value == id_attribute_size,
            )
            if (existingProductIndex !== -1) {
                carts[existingProductIndex].quantity += Number(quantity)
            } else {
                await carts.push(data)
            }
            localStorage.setItem("cart", JSON.stringify(carts))
            toast.success("Bạn đã thêm thành công!")
            // setTimeout(() => {
            //     window.location.reload()
            // }, 500)
        }
    }
    const navigate = useNavigate()
    const cartsnow = JSON.parse(localStorage.getItem("cartnow") || "[]")
    const HandleAddtoCartNow = async () => {

        const data = {
            image: product?.image,
            variant_id: sizevalue,
            quantity: quantity,
            name_product: product?.name,
            sale_id: product?.sale_id,
            attributes: [
                {
                    attribute_name: 1,
                    attribute_value: id_attribute_value,
                },
                {
                    attribute_name: 2,
                    attribute_value: id_attribute_size,
                },
            ],
        }
        if (quantity <= 0) {
            return toast.error('Hãy chọn số lượng lại!')
        }
        if (idsize == undefined) {
            toast.error("Bạn cần chọn size!")
        } else if (sizevalue == undefined) {
            toast.error("Bạn cần chọn color!")
        } else {
            await cartsnow.push(data)
            localStorage.setItem("cartnow", JSON.stringify(cartsnow))
            navigate('/checkoutnow')
            // setTimeout(() => {
            //     window.location.reload()
            // }, 500)
        }
    }
    const [actives, setavtive] = useState()
    const active = (value: any) => {
        setavtive(value)
    }
    const [idSize, setIdSize] = useState()
    const quantity1 = (value: any) => {
        setIdSize(value)
    }
    return (
        <>
            <div className="flex pl-40 pr-40 pt-5 ">
                <div className="flex w-2/3">
                    <div className="thumbnails ml-10 mr-10">
                        <Image
                            className=""
                            src={product?.image}
                            alt="Selected"
                            style={{
                                width: "100%",
                                maxWidth: "700px",
                                maxHeight: "966px",
                            }}
                        />
                    </div>
                </div>
                <div className="w-1.6/3 ">
                    <div className="flex">
                        {product?.sale_id ? (
                            <button className="rounded bg-red-500 pl-2 pr-2 text-white">
                                Sale
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mt-3 text-xl font-bold">{product?.name}</div>
                    <CategoryInProductDetail data={product?.category} />
                    <div className="mt-4 flex">
                        {/* <span>
                            <Rate disabled defaultValue={5} />
                        </span> */}
                        {/* <p className="ml-2 font-bold">5 sao</p> |
                        <p className="ml-2 font-bold">5 </p>đánh giá | */}
                        <QuantityInProductDetail
                            product={product?.variants}
                            variant={idsize}
                            idsize={idSize}
                        />
                    </div>


                    <PriceInProductDetail
                        data={product?.variants}
                        idcolor={idColor}
                        onPrice={price}
                        sale_id={product?.sale_id}
                    />
                    <hr className="my-4  w-full border-t border-dashed border-gray-400" />
                    <span className="text-sm font-bold">MÀU SẮC </span>
                    <div className="mb-2 mt-2 grid grid-cols-8 justify-center ">
                        {attributeValues[1]?.map((data: any) => {
                            return (
                                <>
                                    <ColorInProductDetail
                                        data={data}
                                        key={data?.id}
                                        onColor={HandlePrice}
                                        product={product?.variants}
                                        onSize={HandleSize}
                                        selectedColor={selectedColor}
                                    />
                                </>
                            )
                        })}
                    </div>

                    <span className="text-sm font-bold">KÍCH THƯỚC</span>
                    <div className="mb-2 mt-2 grid grid-cols-5 justify-center">
                        {attributeValues[2]?.map((data: any, index: any) => {
                            return (
                                <>
                                    <SizeInProductDetail
                                        data={data}
                                        key={data?.id}
                                        product={product?.variants}
                                        idSize={idsize}
                                        onSize={sizes}
                                        value={value}
                                        index={index}
                                        color={attributeValues[1][index]}
                                        onActive={active}
                                        active={actives}
                                        onQuantity={quantity1}
                                    />
                                </>
                            )
                        })}
                    </div>
                    <div className="mb-5 mt-6 flex">
                        <span className="text-sm font-bold ">CHỌN SỐ LƯỢNG</span>
                        <div className="ml-auto flex items-center">
                            <input
                                type="number"
                                className="w-15 h-8 cursor-pointer select-none rounded border px-2 py-1 text-center text-gray-700 hover:bg-gray-200 focus:outline-none "
                                min="1"
                                max="9"
                                defaultValue="1"
                                onChange={(e: any) => setquantity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className=" flex">
                        <button
                            className="w-2/4 rounded border  border-red-400 p-2"
                            style={{ color: "red" }}
                            onClick={() => HandleAddtoCart()}
                        >
                            <ShoppingCartOutlined style={{ color: "red" }} /> Thêm
                            giỏ hàng
                        </button>
                        <button
                            className=" ml-2 w-2/4 rounded bg-red-500 p-2"
                            style={{ color: "white" }}
                            onClick={() => HandleAddtoCartNow()}
                        >
                            <CarryOutOutlined style={{ color: "white" }} /> Mua ngay
                        </button>
                    </div>
                    <button
                        className="mt-3 w-full rounded  border border-black p-2"
                        style={{ color: "black" }}
                    >
                        <HddOutlined style={{ color: "black" }} /> Mua tại quầy
                    </button>
                </div>
            </div>
            <div className=" pb-20 pl-80 pr-80 pt-20">
                <span className="text-sl font-bold">MÔ TẢ SẢN PHẨM</span>
                <hr className="my-4  w-full border-t border-dashed border-gray-400" />
                <p>{product?.description}</p>
            </div>
            <Comment data={product?.id} name={product?.name} />

        </>
    )
}

export default ProductDetail
