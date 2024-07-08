import React, { useEffect, useState } from "react"
import { Button, Form, Input, Select, Space, Upload, notification } from "antd"
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { getUser, updateUser } from "@/api/services/UserService"
import { Controller, useForm } from "react-hook-form"
import { getAllProvince, getAllDistrict, getAllWard } from "@/api/services/map"

const { Option } = Select

const UpdateUser: React.FC = () => {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            address: "",
            city: "",
            district: "",
            ward: "",
            name: "",
            email: "",
            number: "",
            role_id: null,
            avatar: null,
        },
    })
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const [fileList, setFileList] = useState<any[]>([])
    const [provinces, setProvinces] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [wards, setWards] = useState<any[]>([])
    const [selectedProvince, setSelectedProvince] = useState<any>(null)
    const [selectedDistrict, setSelectedDistrict] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser(id)
                const { address } = user
                if (address) {
                    const addressParts = address.split(",")
                    const [specificAddress, ward, district, city] = addressParts.map(
                        (part) => part.trim(),
                    )
                    setValue("address", specificAddress)
                    setValue("city", city)
                    setValue("district", district)
                    setValue("ward", ward)

                    const provincesData = await getAllProvince()
                    setProvinces(provincesData)
                    const selectedProvince = provincesData.find(
                        (province) => province.province_name === city,
                    )
                    if (selectedProvince) {
                        setSelectedProvince(selectedProvince.province_id)
                        const districtsData = await getAllDistrict(
                            selectedProvince.province_id,
                        )
                        setDistricts(districtsData)
                        const selectedDistrict = districtsData.find(
                            (district) => district.district_name === district,
                        )
                        if (selectedDistrict) {
                            setSelectedDistrict(selectedDistrict.district_id)
                            const wardsData = await getAllWard(
                                selectedDistrict.district_id,
                            )
                            setWards(wardsData)
                        }
                    }
                }
                setValue("name", user.name)
                setValue("email", user.email)
                setValue("number", user.number)
                setValue("role_id", user.role_id)
                setFileList(user.avatar ? [{ url: user.avatar }] : [])
            } catch (error) {
                console.error("Failed to fetch user details", error)
            }
        }

        fetchData()
    }, [id, setValue])

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                const districtsData = await getAllDistrict(selectedProvince)
                setDistricts(districtsData)
            } else {
                setDistricts([])
            }
        }
        fetchDistricts()
    }, [selectedProvince])

    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                const wardsData = await getAllWard(selectedDistrict)
                setWards(wardsData)
            } else {
                setWards([])
            }
        }
        fetchWards()
    }, [selectedDistrict])

    const handleAvatarChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList)
    }

    const onSubmit = async (data: any) => {
        console.log(data)
        try {
            const provinceName =
                provinces.find((p) => p.province_id === data.city)?.province_name ||
                ""
            const districtName =
                districts.find((d) => d.district_id === data.district)
                    ?.district_name || ""
            const wardName =
                wards.find((w) => w.ward_id === data.ward)?.ward_name || ""
            const fullAddress = `${data.address}, ${wardName}, ${districtName}, ${provinceName}`
            console.log("Full Address:", fullAddress)
            await updateUser(id, {
                ...data,
                avatar: fileList[0]?.originFileObj,
                address: fullAddress,
            })
            navigate("/quan-ly-nguoi-dung")
        } catch (error) {
            notification.error({
                message: "Error",
                description: "There was an error updating the user.",
            })
        }
    }

    return (
        <div className="container mx-auto mt-10 flex flex-col space-y-10 rounded-lg bg-white p-5 shadow-lg">
            <h2 className="my-10 text-2xl font-semibold text-gray-700">
                Cập nhật người dùng
            </h2>
            <Form
                layout="vertical"
                onFinish={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="mb-5 flex space-x-4">
                    <div className="flex-grow">
                        <Form.Item label="Họ và tên:">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Họ và tên"
                                    />
                                )}
                            />
                        </Form.Item>
                    </div>
                    <div className="flex-grow">
                        <Form.Item label="Email">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Email"
                                    />
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="mb-5 flex space-x-4">
                    <div className="flex-grow">
                        <Form.Item label="Số Điện Thoại">
                            <Controller
                                name="number"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Số Điện Thoại"
                                    />
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="mb-5 flex space-x-4">
                    <div className="flex-grow">
                        <Form.Item label="Chọn tỉnh / thành phố">
                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Chọn một tỉnh/thành phố"
                                        onChange={(value) => {
                                            setSelectedProvince(value)
                                            setValue("city", value)
                                        }}
                                    >
                                        {provinces.map((province) => (
                                            <Option
                                                key={province.province_id}
                                                value={province.province_id}
                                            >
                                                {province.province_name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </div>
                    <div className="flex-grow">
                        <Form.Item label="Quận/Huyện">
                            <Controller
                                name="district"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Chọn một quận/huyện"
                                        onChange={(value) => {
                                            setSelectedDistrict(value)
                                            setValue("district", value)
                                        }}
                                        disabled={!selectedProvince}
                                    >
                                        {districts.map((district) => (
                                            <Option
                                                key={district.district_id}
                                                value={district.district_id}
                                            >
                                                {district.district_name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="mb-5 flex space-x-4">
                    <div className="flex-grow">
                        <Form.Item label="Phường/Xã">
                            <Controller
                                name="ward"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Chọn một phường/xã"
                                        onChange={(value) => setValue("ward", value)}
                                        disabled={!selectedDistrict}
                                    >
                                        {wards.map((ward) => (
                                            <Option
                                                key={ward.ward_id}
                                                value={ward.ward_id}
                                            >
                                                {ward.ward_name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="mb-5 flex space-x-4">
                    <div className="flex-grow">
                        <Form.Item label="Nhập địa chỉ cụ thể">
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Nhập địa chỉ cụ thể"
                                    />
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="mb-5 flex space-x-4">
                    <div className="flex-grow">
                        <Form.Item label="Ủy Quyền">
                            <Controller
                                name="role_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        size="large"
                                        style={{ height: 50 }}
                                        {...field}
                                        placeholder="Chọn một vai trò"
                                    >
                                        <Option value={1}>
                                            Tài Khoản Khách Hàng
                                        </Option>
                                        <Option value={0}>Admin</Option>
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="mb-5 flex space-x-4">
                    <div className="flex-grow">
                        <Form.Item label="Avatar">
                            <Controller
                                name="avatar"
                                control={control}
                                render={({ field }) => (
                                    <Upload
                                        listType="picture"
                                        maxCount={1}
                                        fileList={fileList}
                                        beforeUpload={() => false}
                                        onChange={({ fileList }) => {
                                            handleAvatarChange({ fileList })
                                            field.onChange(
                                                fileList[0]?.originFileObj,
                                            )
                                        }}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Click to upload
                                        </Button>
                                    </Upload>
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item>
                    <Space size="large">
                        <Button size="large" type="primary" htmlType="submit">
                            Cập nhật User
                        </Button>
                        <Button
                            size="large"
                            type="default"
                            className="bg-red-500 text-white"
                            onClick={() => navigate("/quan-ly-nguoi-dung")}
                            icon={<ArrowLeftOutlined />}
                        >
                            Quay Lại
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateUser
