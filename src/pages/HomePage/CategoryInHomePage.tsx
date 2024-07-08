import { Category } from "@/@types/category"
import thumbnail1 from "@/assets/images/block-item-1.webp"
interface CategoryInListProductProps {
    data: Category
}
const CategoryInHomePage: React.FC<CategoryInListProductProps> = ({ data }) => {
    return (
        <>
            <a href="#" className="flex w-full flex-col  items-center">
                <div className="thumbnail my-2 w-full overflow-hidden rounded-full">
                    <img
                        src={thumbnail1}
                        alt=""
                        className=" rounded-full object-cover"
                    />
                </div>
                <div className="">
                    <p className="w-40 text-center text-2xl font-medium">
                        {data?.name}
                    </p>
                </div>
            </a>
        </>
    )
}

export default CategoryInHomePage
