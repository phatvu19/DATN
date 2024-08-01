import { getAllDistrict, getAllProvince, getAllWard } from '@/api/services/map';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Option } from "antd/es/mentions"
import { getUser, updateUser } from '@/api/services/UserService';
import { toast } from 'react-toastify';
const UpdateProfile = ({ openmodal, onOpen, user }: any) => {
    const [form] = Form.useForm()
    const [province, setprovince] = useState([])
    const [district, setdistrict] = useState([])
    const [ward, setward] = useState([])
    const [name, setname] = useState<any>()
    const [email, setemail] = useState<any>()
    const [number, setnumber] = useState<any>()
    const [privinceID, setprivinceID] = useState<any>()
    const [privinceNAME, setprivinceNAME] = useState<any>()
    const [districID, setdistricID] = useState<any>()
    const [districNAME, setdistricNAME] = useState<any>()
    const [wardNAME, setwardNAME] = useState<any>()
    const [users, setusers] = useState<any>()
    const handleCancel = () => {
        onOpen(false);
        window.location.reload();
    };
    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUser(user?.data?.id)
            setusers(response)
        }
        fetchUser()
    }, [])
    useEffect(() => {
        form.setFieldsValue(users)
    }, [users])

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
        setprivinceID(selectedProvinceId)
        const selectedProvinceName = selectedValue.split(":")[0]
        setprivinceNAME(selectedProvinceName)
    }
    const handleDistrict = (e: any) => {
        const selectedValue = e
        const selectedDistrictId = selectedValue.split(":")[1]
        setdistricID(selectedDistrictId)
        const selectedDistrictName = selectedValue.split(":")[0]
        setdistricNAME(selectedDistrictName)
    }
    useEffect(() => {
        const fetchDistrict = async () => {
            const alldistrict = await getAllDistrict(privinceID)
            setdistrict(alldistrict)
        }
        fetchDistrict()
    }, [privinceID])

    useEffect(() => {
        const fetchWard = async () => {
            const allward = await getAllWard(districID)
            setward(allward)
        }
        fetchWard()
    }, [districID])
    const handleWard = (e: any) => {
        const selectedValue = e
        const selectedProvinceName = selectedValue.split(":")[0]
        setwardNAME(selectedProvinceName)
    }
    const HandleUpdateUser = async () => {
        const id = users?.id
        const data = {
            name: name,
            address: wardNAME && districNAME && privinceNAME ? `${wardNAME}, ${districNAME}, ${privinceNAME}`
                : form.getFieldValue("address"),
            email: email,
            number: number
        }
        const response = await updateUser(id, data)
        if (response) {
            toast.success('Thành công!')
            onOpen(false)
            window.location.reload()
        }

    }
    const HandleUpdateUser1 = async () => {
        const id = users?.id
        const data = {
            name: name,
            email: email,
            number: number
        }
        const response = await updateUser(id, data)
        if (response) {
            toast.success('Thành công!')
            onOpen(false)
            window.location.reload()
        }

    }
    const [check, setcheck] = useState<any>()
    const handleAddress = () => {
        setcheck(true)
    }
    const validatePhone = (
        rule: any,
        value: string,
        callback: (arg0: string | undefined) => void
    ) => {
        const phonePattern = /^[0-9]{10}$/; // Regular expression for 10-digit Vietnamese phone number

        if (value && !phonePattern.test(value)) {
            callback("Số điện thoại không hợp lệ");
        } else {
            callback(undefined);
        }
    };
    const validateEmail = (
        rule: any,
        value: string,
        callback: (arg0: string | undefined) => void
    ) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/; // Basic email pattern

        if (value && !emailPattern.test(value)) {
            callback("Email không hợp lệ");
        } else {
            callback(undefined);
        }
    };
    return (
        <>
            <Modal
                title="Cập nhập thông tin cá nhân"
                open={openmodal}
                onCancel={() => handleCancel()}
                footer={[

                    <Button key="close" onClick={() => handleCancel()}>
                        Đóng
                    </Button>,
                ]}
                width={800}
            >
                <Form form={form} className='mt-2 p-10' onFinish={HandleUpdateUser}>

                    <label htmlFor="">Họ tên</label>
                    <Form.Item name='name' rules={[
                        {
                            required: true,
                            message:
                                "Không được để trống tên ",
                        },
                    ]}>
                        <Input type="text" onChange={(e: any) => setname(e.target.value)} />
                    </Form.Item>

                    <label htmlFor="">Email</label>
                    <Form.Item name="email" rules={[
                        {
                            required: true,
                            message:
                                "Không được để trống email ",
                        },
                        {
                            validator: validateEmail,
                        },
                    ]}>
                        <Input type="email" onChange={(e: any) => setemail(e.target.value)} />
                    </Form.Item>

                    <label htmlFor="">Số điện thoại</label>
                    <Form.Item name="number" rules={[
                        {
                            required: true,
                            message:
                                "Không được để trống số điện thoại ",
                        },
                        {
                            validator: validatePhone,
                        },
                    ]}>
                        <Input type="number" onChange={(e: any) => setnumber(e.target.value)} />
                    </Form.Item>
                    {check || !users?.address ? (
                        <>
                            <label htmlFor="">Tỉnh</label>
                            <Form.Item name='province' rules={[
                                {
                                    required: true,
                                    message:
                                        "Không được để trống tỉnh ",
                                }
                            ]}>
                                <Select
                                    className="mt-3 w-5/6"
                                    style={{ height: "42px" }}
                                    defaultValue="Chọn Tỉnh"
                                    onChange={handleProvince}
                                >
                                    <Option value="">Chọn Tỉnh</Option>
                                    {province?.map((data: any) => (
                                        <Option key={data?.province_id} value={`${data?.province_name}:${data?.province_id}`}>
                                            {data?.province_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <label htmlFor="">Huyện</label>
                            <Form.Item name='distric' rules={[
                                {
                                    required: true,
                                    message:
                                        "Không được để trống huyện ",
                                }
                            ]}>

                                <Select
                                    defaultValue="Chọn Huyện"
                                    className="mt-3 w-5/6"
                                    style={{ height: "42px" }}
                                    onChange={handleDistrict}
                                >
                                    <Option value="">Chọn Huyện</Option>
                                    {district?.map((data: any) => (
                                        <Option key={data?.district_id} value={`${data?.district_name}:${data?.district_id}`}>
                                            {data?.district_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <label htmlFor="">Xã</label>
                            <Form.Item name='ward' rules={[
                                {
                                    required: true,
                                    message:
                                        "Không được để trống xã ",
                                }
                            ]}>

                                <Select
                                    defaultValue="Chọn Xã"
                                    style={{ height: "42px" }}
                                    className="mt-3 w-5/6"
                                    onChange={handleWard}
                                >
                                    <Option value="">Chọn Xã</Option>
                                    {ward?.map((data: any) => (
                                        <Option key={data?.ward_id} value={`${data?.ward_name}:${data?.ward_id}`}>
                                            {data?.ward_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </>
                    ) : (
                        <div>
                            {users?.address ? (
                                <>
                                    <label htmlFor="">Địa chỉ</label>
                                    <div className="flex w-full">
                                        <Form.Item name="address" className="w-full mr-2">
                                            <Input type="text" onChange={(e: any) => setnumber(e.target.value)} disabled />
                                        </Form.Item>
                                        <Button className="ml-auto" type="primary" onClick={() => handleAddress()}>
                                            Cập nhập địa chỉ mới
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Form.Item name='province' rules={[
                                        {
                                            required: true,
                                            message:
                                                "Không được để trống tỉnh ",
                                        }
                                    ]}>
                                        <label htmlFor="">Tỉnh</label>
                                        <Select
                                            className="mt-3 w-5/6"
                                            style={{ height: "42px" }}
                                            defaultValue="Chọn Tỉnh"
                                            onChange={handleProvince}
                                        >
                                            <Option value="">Chọn Tỉnh</Option>
                                            {province?.map((data: any) => (
                                                <Option key={data?.province_id} value={`${data?.province_name}:${data?.province_id}`}>
                                                    {data?.province_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <label htmlFor="">Huyện</label>
                                    <Form.Item name='district' rules={[
                                        {
                                            required: true,
                                            message:
                                                "Không được để trống huyện ",
                                        }
                                    ]}>

                                        <Select
                                            defaultValue="Chọn Huyện"
                                            className="mt-3 w-5/6"
                                            style={{ height: "42px" }}
                                            onChange={handleDistrict}
                                        >
                                            <Option value="">Chọn Huyện</Option>
                                            {district?.map((data: any) => (
                                                <Option key={data?.district_id} value={`${data?.district_name}:${data?.district_id}`}>
                                                    {data?.district_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <label htmlFor="">Xã</label>
                                    <Form.Item name='ward' rules={[
                                        {
                                            required: true,
                                            message:
                                                "Không được để trống xã ",
                                        }
                                    ]}>

                                        <Select
                                            defaultValue="Chọn Xã"
                                            style={{ height: "42px" }}
                                            className="mt-3 w-5/6"
                                            onChange={handleWard}
                                        >
                                            <Option value="">Chọn Xã</Option>
                                            {ward?.map((data: any) => (
                                                <Option key={data?.ward_id} value={`${data?.ward_name}:${data?.ward_id}`}>
                                                    {data?.ward_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </>
                            )}
                        </div>
                    )}



                    <Button htmlType='submit' type='primary' >
                        Cập nhập
                    </Button>,
                </Form>
            </Modal>
        </>
    )
}

export default UpdateProfile