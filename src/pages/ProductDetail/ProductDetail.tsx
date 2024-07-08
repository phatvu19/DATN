import { useEffect, useState } from "react"
import { Image, List, Rate } from "antd"
import {
    CarryOutOutlined,
    HddOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { getProductById } from "@/api/services/ProductService"
import CategoryInProductDetail from "./CategoryInProductDetail"
import PriceInProductDetail from "./PriceInProductDetail"
import ColorInProductDetail from "./ColorInProductDetail"
import SizeInProductDetail from "./SizeInProductDetail"
import { toast } from "react-toastify"
import QuantityInProductDetail from "./QuantityInProductDetail"
import { getAllAttributeValue } from "@/api/services/AttributeService"
const ProductDetail = () => {
    const { id }: any = useParams()
    const images = [
        "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75",
        "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-020%2F7b91f75bc4684a578b9eb6b1a3fea98f_optimized_original_image.jpg&w=1920&q=75",
        "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17109299569046619.jpg&w=1920&q=75",
    ]
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [selectedColor, setSelectedColor] = useState(null)
    const [quantity, setquantity] = useState(1)
    const [attributeValues, setAttributeValues] = useState<any>({})
    const carts = JSON.parse(localStorage.getItem("cart") || "[]")
    const handleImageClick = (image: string) => {
        setSelectedImage(image)
    }
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
    // console.log(attributeValues);

    const [idColor, setIdcolor] = useState()
    const HandlePrice = (value: any) => {
        setIdcolor(value)
        // console.log(value)
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
        // console.log(idvarian)

        setSizevalue(idvarian)
        setid_attribute_size(idattributevalue)
        setsizevalue(sizeValue)
    }
    const price = (value: any) => {
        setprices(value)
    }
    // console.log(sizevalues)

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
    const [actives, setavtive] = useState()
    const active = (value: any) => {
        setavtive(value)
    }
    return (
        <>
            <div className="flex pl-40 pr-40 pt-5 ">
                <div className="flex w-2/3 ">
                    {/* <List
                        className="h-600 overflow-y-auto"
                        dataSource={images}
                        style={{
                            maxHeight: "500px",
                            overflowX: "hidden",
                            overflowY: "auto",
                            width: "100px",
                            scrollbarColor: "#ffffff #ffffff",
                        }}
                        renderItem={(item) => (
                            <List.Item>
                                <img
                                    className="w-1/2"
                                    src={item}
                                    alt="Thumbnail"
                                    onClick={() => handleImageClick(item)}
                                />
                            </List.Item>
                        )}
                    /> */}
                    <div className="thumbnails ml-10 mr-10">
                        <Image
                            className=""
                            src={product?.image}
                            alt="Selected"
                            style={{
                                width: "100%",
                                maxWidth: "750px",
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
                    <span>SKU: F9UVC020M-015</span>
                    <div className="mt-4 flex">
                        <span>
                            <Rate disabled defaultValue={5} />
                        </span>
                        <p className="ml-2 font-bold">5 sao</p> |
                        <p className="ml-2 font-bold">5 </p>đánh giá |
                        <QuantityInProductDetail
                            product={product?.variants}
                            variant={idsize}
                        />
                    </div>
                    <CategoryInProductDetail data={product?.category} />

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
            <div className=" pb-20 pl-40 pr-40">
                <span className="text-sl font-bold">ĐÁNH GIÁ TỪ NGƯỜI MUA</span>
                <hr className="my-4  w-full border-t border-dashed border-gray-400" />
                <div className="flex">
                    <div style={{ textAlign: "center" }} className="w-1/6">
                        <p style={{ fontSize: "50px", fontWeight: "600" }}>
                            4.8
                            <span style={{ fontSize: "40px", fontWeight: "normal" }}>
                                /
                            </span>
                            <span style={{ fontSize: "30px", fontWeight: "normal" }}>
                                5
                            </span>
                        </p>
                        <Rate disabled defaultValue={5} />
                        <p>5 đánh giá</p>
                    </div>
                    <div className="flex flex-col">
                        <Rate disabled defaultValue={5} />
                        <Rate disabled defaultValue={4} />
                        <Rate disabled defaultValue={3} />
                        <Rate disabled defaultValue={2} />
                        <Rate disabled defaultValue={1} />
                    </div>
                </div>
                <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                <div>
                    <span className="text-sm font-bold">Lọc đánh giá</span>
                    <button className="bg-white-500 m-1 mx-1 ml-5 h-10 w-20 border border-red-500 text-red-500">
                        Tất cả
                    </button>
                    <button className="m-1 mx-1 h-10 w-20 bg-gray-200 ">
                        5 sao
                    </button>
                    <button className="m-1 mx-1 h-10 w-20 bg-gray-200 ">
                        4 sao
                    </button>
                    <button className="m-1 mx-1 h-10 w-20  bg-gray-200 ">
                        3 sao
                    </button>
                    <button className="m-1 mx-1 h-10 w-20  bg-gray-200 ">
                        2 sao
                    </button>
                    <button className="m-1 mx-1 h-10 w-20  bg-gray-200 ">
                        1 sao
                    </button>
                </div>
                <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                <div>
                    <div className="flex">
                        <button className="m-1 mx-1 h-10 w-10 rounded-full bg-black"></button>
                        <div className="ml-2 flex flex-col">
                            <a className="font-bold">liennk89</a>
                            <Rate
                                disabled
                                defaultValue={5}
                                style={{ fontSize: "12px" }}
                            />
                        </div>
                    </div>
                    <div className="ml-14 flex flex-col">
                        <span className="mt-2 text-sm text-gray-400">
                            Màu sắc: Xanh-10, Kích thước: L
                        </span>
                        <span className="mt-4 text-sm">
                            Shop giao hàng nhanh, áo không dày quá mặc lên thoáng, đi
                            đường gió thổi vào mát mát á. 1m62, 58kg, mặc size L vẫn
                            rộng nhé
                        </span>
                        <div className="mt-4 flex">
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-12 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                        </div>
                    </div>

                    <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                </div>
                <div>
                    <div className="flex">
                        <button className="m-1 mx-1 h-10 w-10 rounded-full bg-black"></button>
                        <div className="ml-2 flex flex-col">
                            <a className="font-bold">liennk89</a>
                            <Rate
                                disabled
                                defaultValue={5}
                                style={{ fontSize: "12px" }}
                            />
                        </div>
                    </div>
                    <div className="ml-14 flex flex-col">
                        <span className="mt-2 text-sm text-gray-400">
                            Màu sắc: Xanh-10, Kích thước: L
                        </span>
                        <span className="mt-4 text-sm">
                            Shop giao hàng nhanh, áo không dày quá mặc lên thoáng, đi
                            đường gió thổi vào mát mát á. 1m62, 58kg, mặc size L vẫn
                            rộng nhé
                        </span>
                        <div className="mt-4 flex">
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-12 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                        </div>
                    </div>

                    <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                </div>
                <div>
                    <div className="flex">
                        <button className="m-1 mx-1 h-10 w-10 rounded-full bg-black"></button>
                        <div className="ml-2 flex flex-col">
                            <a className="font-bold">liennk89</a>
                            <Rate
                                disabled
                                defaultValue={5}
                                style={{ fontSize: "12px" }}
                            />
                        </div>
                    </div>
                    <div className="ml-14 flex flex-col">
                        <span className="mt-2 text-sm text-gray-400">
                            Màu sắc: Xanh-10, Kích thước: L
                        </span>
                        <span className="mt-4 text-sm">
                            Shop giao hàng nhanh, áo không dày quá mặc lên thoáng, đi
                            đường gió thổi vào mát mát á. 1m62, 58kg, mặc size L vẫn
                            rộng nhé
                        </span>
                        <div className="mt-4 flex">
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-12 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                        </div>
                    </div>

                    <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                </div>
                <div>
                    <div className="flex">
                        <button className="m-1 mx-1 h-10 w-10 rounded-full bg-black"></button>
                        <div className="ml-2 flex flex-col">
                            <a className="font-bold">liennk89</a>
                            <Rate
                                disabled
                                defaultValue={5}
                                style={{ fontSize: "12px" }}
                            />
                        </div>
                    </div>
                    <div className="ml-14 flex flex-col">
                        <span className="mt-2 text-sm text-gray-400">
                            Màu sắc: Xanh-10, Kích thước: L
                        </span>
                        <span className="mt-4 text-sm">
                            Shop giao hàng nhanh, áo không dày quá mặc lên thoáng, đi
                            đường gió thổi vào mát mát á. 1m62, 58kg, mặc size L vẫn
                            rộng nhé
                        </span>
                        <div className="mt-4 flex">
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-12 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                            <Image
                                src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF9UVC020M-014%2Ffeabdc18be4641d6a438dfc8fd8b1389_optimized_original_image.jpg&w=1920&q=75"
                                className=" h-32 p-2"
                                style={{ width: "120px" }}
                            />
                        </div>
                    </div>

                    <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                </div>
            </div>
            <div className=" pb-20 pl-40 pr-40">
                <span className="font-bold">SẢN PHẨM GỢI Ý</span>
                <div className="block-new-product-item mt-5 grid grid-cols-1 gap-4 md:grid-cols-5">
                    <div className="group relative">
                        <div className="h-100 relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                                src={
                                    "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17162866319763913_512.jpg&w=1920&q=75"
                                }
                                alt=""
                            />
                            <div className="absolute bottom-52 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <ShoppingCartOutlined className="text-xl" />
                                <HeartOutlined className="text-xl" />
                            </div>
                        </div>
                        <div className="pt-3">
                            <h5 className="mb-2 text-xl font-medium leading-tight">
                                Product 1
                            </h5>
                            <p className="text-base">description</p>
                        </div>
                    </div>
                    <div className="group relative">
                        <div className="h-100 relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                                src={
                                    "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17162866319763913_512.jpg&w=1920&q=75"
                                }
                                alt=""
                            />
                            <div className="absolute bottom-52 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <ShoppingCartOutlined className="text-xl" />
                                <HeartOutlined className="text-xl" />
                            </div>
                        </div>
                        <div className="pt-3">
                            <h5 className="mb-2 text-xl font-medium leading-tight">
                                Product 1
                            </h5>
                            <p className="text-base">description</p>
                        </div>
                    </div>
                    <div className="group relative">
                        <div className="h-100 relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                                src={
                                    "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17162866319763913_512.jpg&w=1920&q=75"
                                }
                                alt=""
                            />
                            <div className="absolute bottom-52 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <ShoppingCartOutlined className="text-xl" />
                                <HeartOutlined className="text-xl" />
                            </div>
                        </div>
                        <div className="pt-3">
                            <h5 className="mb-2 text-xl font-medium leading-tight">
                                Product 1
                            </h5>
                            <p className="text-base">description</p>
                        </div>
                    </div>
                    <div className="group relative">
                        <div className="h-100 relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                                src={
                                    "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17162866319763913_512.jpg&w=1920&q=75"
                                }
                                alt=""
                            />
                            <div className="absolute bottom-52 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <ShoppingCartOutlined className="text-xl" />
                                <HeartOutlined className="text-xl" />
                            </div>
                        </div>
                        <div className="pt-3">
                            <h5 className="mb-2 text-xl font-medium leading-tight">
                                Product 1
                            </h5>
                            <p className="text-base">description</p>
                        </div>
                    </div>
                    <div className="group relative">
                        <div className="h-100 relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                                src={
                                    "https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17162866319763913_512.jpg&w=1920&q=75"
                                }
                                alt=""
                            />
                            <div className="absolute bottom-52 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <ShoppingCartOutlined className="text-xl" />
                                <HeartOutlined className="text-xl" />
                            </div>
                        </div>
                        <div className="pt-3">
                            <h5 className="mb-2 text-xl font-medium leading-tight">
                                Product 1
                            </h5>
                            <p className="text-base">description</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail
