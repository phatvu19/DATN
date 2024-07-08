import { Category } from "@/@types/category"

type Props = {
    data: Category
}

const CategoryInProductDetail = ({ data }: Props) => {
    return (
        <>
            <div className="mt-5 text-sm">
                Danh mục:{" "}
                <span className="text-sm font-bold text-red-700">{data?.name}</span>
            </div>
        </>
    )
}

export default CategoryInProductDetail
