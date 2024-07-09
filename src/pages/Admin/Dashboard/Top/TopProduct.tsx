import { Select } from "antd"
import ProductInTopProduct from "./ProductInTopProduct"

const TopProduct = () => {
    return (
        <>
            <div>
                <div className="bg-gray-200 p-4 flex ">
                    <span className="font-bold">Sản Phẩm Bán Chạy</span>
                    <Select
                        className="ml-auto"
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        // onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Ngày' },
                            { value: 'lucy', label: 'Tuần' },
                            { value: 'Yiminghe', label: 'Tháng' }
                        ]}
                    />
                </div>
                <ProductInTopProduct />
            </div>
        </>
    )
}

export default TopProduct