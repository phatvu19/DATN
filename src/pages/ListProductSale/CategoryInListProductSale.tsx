import { Category } from "@/@types/category"
import { Checkbox } from "antd"
interface CategoryInListProductProps {
    data: Category
}
const CategoryInListProductSale: React.FC<CategoryInListProductProps> = ({ data }) => {
    return (
        <>
            <div>

                <Checkbox value={data?.id}>{data?.name}</Checkbox>
            </div>
        </>
    )
}

export default CategoryInListProductSale
