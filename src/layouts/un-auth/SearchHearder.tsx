import { getAllCategory } from '@/api/services/CategoryService';
import { filterProduct, getAllProduct } from '@/api/services/ProductService';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Result } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ProductInSearch from './ProductInSearch';

type Props = {}

const SearchHearder = ({ data }: any) => {
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
    const [category, setCategory] = useState<any>([])

    useEffect(() => {
        const fetchCategory = async () => {
            const allCategory: any= await getAllCategory()
            setCategory(allCategory)
        }

        fetchCategory()
    }, [])
    const [products, setProducts] = useState<any>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts: any = await getAllProduct()
            setProducts(allProducts)
        }

        fetchProducts()
    }, [])
    const [visibleCount, setVisibleCount] = useState(10)
    const loadMore = () => {
        setVisibleCount((prevCount: number) => prevCount + 10)
    }
    const displayedProducts = data?.slice(0, visibleCount)
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
            {data.length > 0 ? <>
                <div className="pl-36 pr-36 p-10">
                    <div className="pb-12 pt-16 text-lg">
                        <a href="#">Trang chủ</a> |
                        <a className="font-bold">Search</a>
                    </div>
                    <div className="flex">
                        
                        <div className=" px-8">
                            <div className="">
                                <div className="">
                                    <h1 className="text-xl font-bold ">
                                        Danh sách sản phẩm search
                                    </h1>
                                </div>
                            </div>
                            <div className="pt-4"></div>
                            <hr className=" border-dashed border-gray-300 " />

                            <div className="row row-gap-4 mt-3">
                                <div className="grid  grid-cols-5 ">
                                    {data?.map((data: any) => {
                                        return (
                                            <>
                                                <ProductInSearch
                                                    data={data}
                                                    key={data?.id}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </> :
                <Result
                    status="404"
                    // title="204"
                    subTitle="Xin lỗi, không tìm thấy sản phẩm"
                    extra={<a href={'/'}><Button type="primary">Back Home</Button></a>}
                />
            }
        </>
    )
}

export default SearchHearder