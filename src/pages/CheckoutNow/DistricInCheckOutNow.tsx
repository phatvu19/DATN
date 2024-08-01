import { getAllDistrict } from "@/api/services/map"
import { Form, Select } from "antd"
import { Option } from "antd/es/mentions"
import { useEffect, useState } from "react"

const DistrictInCheckOutNow = ({ id, onIDDistrict, onNameDistrict }: any) => {
    const [district, setdistrict] = useState([])
    useEffect(() => {
        const fetchDistrict = async () => {
            const alldistrict = await getAllDistrict(id)
            setdistrict(alldistrict)
        }
        fetchDistrict()
    }, [id])
    const handleDistrict = (e: any) => {
        const selectedValue = e
        const selectedDistrictId = selectedValue.split(":")[1]
        onIDDistrict(selectedDistrictId)
        const selectedDistrictName = selectedValue.split(":")[0]
        onNameDistrict(selectedDistrictName)
    }

    return (
        <>
            <div className="w-2/6 ml-1 mr-1">
                <label htmlFor="name" className="pl-1 text-sm font-bold">
                    Chọn quận / huyện
                    <span className="text-red-500">*</span>
                </label>
                <Form.Item name="distric" rules={[
                    {
                        required: true,
                        message:
                            "Không được để trống huyện ",
                    }
                ]}>
                    <Select
                        defaultValue="Chọn Huyện"
                        className=" mt-3 w-5/6"
                        style={{ height: "42px" }}
                        onChange={handleDistrict}
                    >
                        <Option value="">Chọn Huyện</Option>
                        {district?.map((data: any) => {
                            return (
                                <>
                                    <Option
                                        value={`${data?.district_name}:${data?.district_id}`}
                                    >
                                        {data?.district_name}
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

export default DistrictInCheckOutNow
