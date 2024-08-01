import { getAllWard } from "@/api/services/map"
import { Form, Select } from "antd"
import { Option } from "antd/es/mentions"
import { useEffect, useState } from "react"

const WardInCheckOutNow = ({ id, onNameWard }: any) => {
    const [ward, setward] = useState([])
    useEffect(() => {
        const fetchWard = async () => {
            const allward = await getAllWard(id)
            setward(allward)
        }
        fetchWard()
    }, [id])
    const handleWard = (e: any) => {
        const selectedValue = e
        const selectedProvinceName = selectedValue.split(":")[0]
        console.log(selectedProvinceName)
        onNameWard(selectedProvinceName)
    }
    return (
        <>
            <div className="w-2/6">
                <label htmlFor="name" className="pl-1 text-sm font-bold">
                    Chọn phường / xã
                    <span className="text-red-500">*</span>
                </label>
                <Form.Item name="ward" rules={[
                    {
                        required: true,
                        message:
                            "Không được để trống xã ",
                    }
                ]}>
                    <Select
                        defaultValue="Chọn Xã"
                        style={{ height: "42px" }}
                        className=" mt-3 w-5/6"
                        onChange={handleWard}
                    >
                        <Option value="">Chọn Xã</Option>
                        {ward?.map((data: any) => {
                            return (
                                <>
                                    <Option
                                        value={`${data?.ward_name}:${data?.ward_id}`}
                                    >
                                        {data?.ward_name}
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

export default WardInCheckOutNow
