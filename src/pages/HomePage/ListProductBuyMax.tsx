import { GetProductBuyMax } from "@/api/services/ProductService"
import { useEffect, useState } from "react"
import ProductInListProductBuyMax from "./ProductInListProductBuyMax"

const ListProductBuyMax = () => {
    const [products, setProducts] = useState<any>([])
    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts: any = await GetProductBuyMax()
            const limitedProducts = allProducts?.product?.slice(0, 10)
            setProducts(limitedProducts)
        }

        fetchProducts()
    }, [])

    return (
        <>
            <div className="block-new-product-item grid grid-cols-1 gap-4 md:grid-cols-5">
                {products?.map((data: any) => {
                    return (
                        <>
                            <ProductInListProductBuyMax data={data} />
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ListProductBuyMax
