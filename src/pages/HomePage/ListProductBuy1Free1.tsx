import { GetProductBuy1Free1 } from "@/api/services/ProductService"
import { useEffect, useState } from "react"
import ProductInListProductBuy1Free1 from "./ProductInListProductBuy1Free1"

const ListProductBuy1Free1 = () => {
    const [products, setProducts] = useState<any>([])
    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts: any = await GetProductBuy1Free1()
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
                            <ProductInListProductBuy1Free1 data={data} />
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ListProductBuy1Free1
