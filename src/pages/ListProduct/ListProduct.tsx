import { Category } from "@/@types/category"
import { Product } from "@/@types/product"
import { getAllCategory } from "@/api/services/CategoryService"
import { filterProduct, getAllProduct } from "@/api/services/ProductService"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Checkbox, Input, Result } from "antd"
import { useEffect, useState } from "react"
import ProductInListProduct from "./ProductInListProduct"

const ListProduct = () => {
    const [isDivVisible, setIsDivVisible] = useState(false)
    const [isCategory, setIsCategory] = useState(false)
    const [isSubject, setIsSubject] = useState(false)
    const handleIconClick = () => {
        setIsDivVisible(!isDivVisible)
    }
    const handleIcon1Click = () => {
        setIsCategory(!isCategory)
    }
    const handleIcon2Click = () => {
        setIsSubject(!isSubject)
    }
    const [category, setCategory] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategory = async () => {
            const allCategory: Category[] = await getAllCategory()
            setCategory(allCategory)
        }

        fetchCategory()
    }, [])
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts: Product[] = await getAllProduct()
            setProducts(allProducts)
        }

        fetchProducts()
    }, [])
    const [visibleCount, setVisibleCount] = useState(10)
    const loadMore = () => {
        setVisibleCount((prevCount: number) => prevCount + 10)
    }
    const displayedProducts = products?.slice(0, visibleCount)
    const [lowPrice, setLowPrice] = useState<any>(0)
    const [highPrice, setHighPrice] = useState<any>(0)
    const [color, setcolor] = useState<any>("")
    const [checkcolor, setcheckcolor] = useState<any>(false)
    const [filter, setfilter] = useState(false)
    const [product, setproduct] = useState<any>([])
    const [selectedButton, setSelectedButton] = useState(null)

    const handleButtonClick = (index: any, color: any) => {
        setSelectedButton(index)
        setcolor(color)
    }
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCheckboxChange = (categoryId: any) => {
        setSelectedCategory(categoryId)
    }

    const callApi = async () => {
        const product = await filterProduct({
            minprice: lowPrice ? lowPrice : "",
            maxprice: highPrice ? highPrice : "",
            color: color ? color : "",
            category_id: selectedCategory ? selectedCategory : "",
        })
        setproduct(product)
        setfilter(true)
    }

    useEffect(() => {
        callApi()
    }, [highPrice, lowPrice, color, selectedCategory])
    console.log(filter)

    const buttonColors = [
        { class: "bg-black", color: "black" },
        { class: "bg-red-500", color: "red" },
        { class: "bg-green-400", color: "green" },
        { class: "bg-blue-400", color: "blue" },
        { class: "bg-yellow-400", color: "yellow" },
        { class: "bg-gray-400", color: "gray" },
        { class: "bg-violet-400", color: "violet" },
    ]

    return (
        <>
            <div className="pl-36 pr-28">
                <div className="pb-12 pt-16 text-lg">
                    <a href="#">Trang chủ</a> |
                    <a className="font-bold"> Danh sách sản phẩm</a>
                </div>
                <div className="flex">
                    <div className="mr-10 w-1/6">
                        <div className="space-y-3">
                            <a
                                href="#!product"
                                className="block w-full text-sm font-bold"
                            >
                                <span>Sắp xếp theo khoảng giá</span>
                                <div className="mt-2">
                                    <span className="font-normal">Giá thấp</span>
                                    <Input
                                        type="text"
                                        onChange={(e: any) =>
                                            setLowPrice(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <span className="font-normal">Giá cao</span>
                                    <Input
                                        type="text"
                                        onChange={(e: any) =>
                                            setHighPrice(e.target.value)
                                        }
                                    />
                                </div>
                            </a>
                            <hr className="border-gray-400 border-opacity-50" />
                            <a
                                href="#!product"
                                className="flex w-full text-sm font-bold"
                            >
                                <div className="flex-grow">Màu sắc</div>
                                <div
                                    className="w-1/10 text-center text-xs font-bold"
                                    onClick={handleIconClick}
                                >
                                    {isDivVisible ? (
                                        <MinusOutlined />
                                    ) : (
                                        <PlusOutlined />
                                    )}
                                </div>
                            </a>
                            {isDivVisible ? (
                                <div className="mt-4 grid grid-cols-5 justify-center">
                                    {buttonColors.map((btn: any, index: any) => (
                                        <button
                                            key={index}
                                            className={`m-1 mx-1 h-8 w-8 rounded-full ${btn.class} ${selectedButton === index ? "border-4 border-white" : ""}`}
                                            onClick={() =>
                                                handleButtonClick(index, btn.color)
                                            }
                                        ></button>
                                    ))}
                                </div>
                            ) : (
                                ""
                            )}
                            <hr className="border-gray-400 border-opacity-50" />
                            <a href="#!product" className="flex text-sm font-bold">
                                <div className="flex-grow">Danh mục</div>
                                <div
                                    className="w-1/10 text-center text-xs font-bold"
                                    onClick={handleIcon1Click}
                                >
                                    {isCategory ? (
                                        <MinusOutlined />
                                    ) : (
                                        <PlusOutlined />
                                    )}
                                </div>
                            </a>
                            {isCategory ? (
                                <div>
                                    {category?.map((data: Category) => {
                                        return (
                                            <>
                                                <div>
                                                    <Checkbox
                                                        value={data?.id}
                                                        checked={
                                                            selectedCategory ===
                                                            data.id
                                                        }
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                data.id,
                                                            )
                                                        }
                                                    >
                                                        {data?.name}
                                                    </Checkbox>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <a href="/products" className="mt-5">
                            <Button style={{ marginTop: "16px" }}>Bỏ lọc</Button>
                        </a>
                    </div>
                    <div className="w-5/6 px-8">
                        <div className="">
                            <div className="">
                                <h1 className="text-xl font-bold ">
                                    Tất cả sản phẩm
                                </h1>
                            </div>
                        </div>
                        <div className="pt-4"></div>
                        <hr className=" border-dashed border-gray-300 " />

                        <div className="row row-gap-4 mt-3">
                            <div className="grid  grid-cols-5 ">
                                {filter ? (
                                    <>
                                        {product?.length == 0 ? (
                                            <div
                                                className="result-container p-auto m-auto"
                                                style={{ marginLeft: "150%" }}
                                            >
                                                <Result
                                                    status="404"
                                                    title="Not Found"
                                                    subTitle="Không có sản phẩm phù hợp"
                                                    // extra={<Button type="primary">Back Home</Button>}
                                                />
                                            </div>
                                        ) : (
                                            product?.map((data: Product) => {
                                                return (
                                                    <>
                                                        <ProductInListProduct
                                                            data={data}
                                                            key={data?.id}
                                                        />
                                                    </>
                                                )
                                            })
                                        )}
                                    </>
                                ) : (
                                    displayedProducts?.map((data: Product) => {
                                        return (
                                            <>
                                                <ProductInListProduct
                                                    data={data}
                                                    key={data?.id}
                                                />
                                            </>
                                        )
                                    })
                                )}
                            </div>
                            <div className="mb-20 mt-10 flex justify-center">
                                {visibleCount < products?.length && (
                                    <button
                                        className="rounded border border-red-500 bg-red-500 px-4 py-2 text-white"
                                        onClick={loadMore}
                                    >
                                        Xem thêm
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListProduct
