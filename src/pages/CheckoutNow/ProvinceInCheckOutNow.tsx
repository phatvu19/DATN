import { getAllProvince } from "@/api/services/map"
import { Form, Select } from "antd"
import { Option } from "antd/es/mentions"
import { useEffect, useState } from "react"

const ProvinceInCheckOutnow = ({ onIDProvince, onNameProvince }: any) => {
    const [province, setprovince] = useState([])
    useEffect(() => {
        const fetchProvince = async () => {
            const allprovince = await getAllProvince()
            setprovince(allprovince)
        }

        fetchProvince()
    }, [])
    const handleProvince = (e: any) => {
        const selectedValue = e
        const selectedProvinceId = selectedValue.split(":")[1]
        onIDProvince(selectedProvinceId)
        const selectedProvinceName = selectedValue.split(":")[0]
        onNameProvince(selectedProvinceName)
    }
    return (
        <>
            <div className="w-2/6">
                <label htmlFor="name" className="pl-1 text-sm font-bold">
                    Chọn tỉnh / thành phố
                    <span className="text-red-500">*</span>
                </label>
                <Form.Item name="province" rules={[
                    {
                        required: true,
                        message:
                            "Không được để trống tỉnh ",
                    }
                ]}>
                    <Select
                        className=" mt-3 w-5/6"
                        style={{ height: "42px" }}
                        defaultValue="Chọn Tỉnh"
                        onChange={handleProvince}
                    >
                        <Option value="">Chọn Tỉnh</Option>
                        {province?.map((data: any) => {
                            return (
                                <>
                                    <Option
                                        value={`${data?.province_name}:${data?.province_id}`}
                                    >
                                        {data?.province_name}
                                    </Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
            </div>
        </>
    )
}

export default ProvinceInCheckOutnow
