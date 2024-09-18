import { ProductSale } from "@/api/services/Sale"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductInListProductBuy3 from "./ProductInListProductBuy3"

const ListProductBuy3 = () => {
    const [products, setProducts] = useState<any>([])
    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts: any = await ProductSale()
            console.log(allProducts)

            const limitedProducts = allProducts?.slice(0, 10)
            setProducts(limitedProducts)
        }

        fetchProducts()
    }, [])

    const filterProductsBySaleId = (products: any) => {
        return products.filter((product: any) => product.sale_id >= 1)
    }

    const filteredProducts = filterProductsBySaleId(products)
    // console.log(products);

    return (
        <>
            <div className="block-new-product container mx-auto my-2 flex max-w-7xl flex-col">
                <div className="block-new-product-item grid grid-cols-1 gap-4 md:grid-cols-5">
                    {filteredProducts?.map((data: any) => {
                        return (
                            <>
                                <ProductInListProductBuy3
                                    data={data}
                                    key={data?.id}
                                />
                            </>
                        )
                    })}
                </div>
                <div className="block-offer-button my-5 text-center">
                    <button className="btn h-10 rounded border bg-red-500 px-2 pl-5 pr-5 text-white">
                        <Link to="/products">Xem tất cả sản phẩm</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ListProductBuy3
