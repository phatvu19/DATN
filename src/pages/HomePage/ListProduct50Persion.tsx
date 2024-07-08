import { GetProduct50Persion } from "@/api/services/ProductService"
import { useEffect, useState } from "react"
import ProductInListProduct50Persion from "./ProductInListProduct50Persion"

const ListProduct50Persion = () => {
    const [products, setProducts] = useState<any>([])
    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts: any = await GetProduct50Persion()
            const limitedProducts = allProducts?.product?.slice(0, 10)
            setProducts(limitedProducts)
        }

        fetchProducts()
    }, [])
    console.log(products)

    return (
        <>
            <div className="block-new-product-item grid grid-cols-1 gap-4 md:grid-cols-5">
                {products?.map((data: any) => {
                    return (
                        <>
                            <ProductInListProduct50Persion data={data} />
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ListProduct50Persion
