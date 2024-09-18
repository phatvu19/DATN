import { Product } from "@/@types/product"
import { ProductSale } from "@/api/services/Sale"
import { useEffect, useState } from "react"
import ProductInListProductSale from './ProductInListProductSale'

const ListProductSale = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts: Product[] = await ProductSale()
            setProducts(allProducts)
        }

        fetchProducts()
    }, [])
    const [visibleCount, setVisibleCount] = useState(10)
    const loadMore = () => {
        setVisibleCount((prevCount: number) => prevCount + 10)
    }
    const displayedProducts = products?.slice(0, visibleCount)

    return (
        <>
            <div className="pl-36 pr-28">
                <div className="pb-12 pt-16 text-lg ">
                    <a href="#">Trang chủ</a> |
                    <a className="font-bold"> Danh sách sản phẩm sale</a>
                </div>
                <div className="flex">

                    <div className=" px-8">
                        <div className="">
                            <div className="">
                                <h1 className="text-xl font-bold ">
                                    Tất cả sản phẩm sale
                                </h1>
                            </div>
                        </div>
                        <div className="pt-4"></div>
                        <hr className=" border-dashed border-gray-300 " />

                     
                        <div className="row row-gap-4 mt-3">
                            <div className="grid  grid-cols-5 ">
                                {
                                    displayedProducts?.map((data: Product) => {
                                        return (
                                            <>
                                                <ProductInListProductSale
                                                    data={data}
                                                    key={data?.id}
                                                />
                                            </>
                                        )
                                    })
                                }
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

export default ListProductSale
