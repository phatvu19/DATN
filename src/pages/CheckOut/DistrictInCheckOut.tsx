import { getAllDistrict } from "@/api/services/map"
import { Select } from "antd"
import { Option } from "antd/es/mentions"
import { useEffect, useState } from "react"

const DistrictInCheckOut = ({ id, onIDDistrict, onNameDistrict }: any) => {
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
            <div className="w-2/6">
                <label htmlFor="name" className="pl-1 text-sm font-bold">
                    Chọn quận / huyện
                    <span className="text-red-500">*</span>
                </label>
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
            </div>
        </>
    )
}

export default DistrictInCheckOut
