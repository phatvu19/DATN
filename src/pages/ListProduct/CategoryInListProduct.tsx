import { Category } from "@/@types/category"
import { Checkbox } from "antd"
interface CategoryInListProductProps {
    data: Category
}
const CategoryInListProduct: React.FC<CategoryInListProductProps> = ({ data }) => {
    return (
        <>
            <div>

                <Checkbox value={data?.id}>{data?.name}</Checkbox>
            </div>
        </>
    )
}

export default CategoryInListProduct
