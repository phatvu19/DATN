import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { getUser, updateUser } from "@/api/services/UserService";
import { CameraOutlined, UploadOutlined } from "@ant-design/icons";

const Profile = () => {
    const [openmodal, setopenmodel] = useState<any>()
    const user = JSON.parse(localStorage.getItem('user')!)
    const [form] = Form.useForm()
    const [users, setusers] = useState<any>()
    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUser(user?.data?.id)
            setusers(response)
            form.setFieldsValue(response)
        }
        fetchUser()
    }, [])
    const open = (value: any) => {

        setopenmodel(value)
    }
    const props: any = {
        action: "https://api.cloudinary.com/v1_1/dsul0ahfu/image/upload",
        onChange({ file }: any) {
            if (file.status !== "uploading") {
                handleUploadImageUser(file.response.secure_url);
            }
        },
        data: {
            upload_preset: "dant_phat",
            folder: "datn",
        },
    };
    const handleUploadImageUser = async (url: any) => {
        const id = users?.id
        const data = {
            avatar: url
        }
        const response = await updateUser(id, data)
        window.location.reload()
    };
    return (
        <div className="container mx-auto p-4 mt-5 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                    <div className="bg-slate-100 shadow rounded-lg p-4">
                        <div className="text-center">
                            <div className="relative inline-block mx-auto mb-4">
                                <img
                                    src={!users?.avatar ? 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' : users?.avatar}
                                    className="w-24 h-24 rounded-full mx-auto"
                                    alt="user-profile-image"
                                />
                                <div className="mt-3">
                                    <Upload.Dragger {...props} multiple accept=".jpg,.png">
                                        <Button icon={<CameraOutlined />}></Button>
                                    </Upload.Dragger>
                                </div>
                            </div>
                            <h5 className="text-lg font-semibold mb-1">{users?.name ? users?.name : ""}</h5>

                        </div>
                    </div>


                </div>

                <div className="col-span-2">
                    <div className="bg-slate-100 shadow rounded-lg ">
                        <div className="border-b border-gray-200">
                            <ul className="flex space-x-4 p-4">
                                <li>
                                    <a
                                        className="text-blue-600 border-b-2 border-blue-600 pb-2 hover:text-blue-800"
                                        href="#personalDetails"
                                    >
                                        <i className="fas fa-home"></i> Thông tin cá nhân
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="p-4">
                            <div className="tab-content">
                                <div id="personalDetails">
                                    <Form className="space-y-4" form={form}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="mb-2" >
                                                <label htmlFor="lastnameInput" className="block text-sm font-medium text-gray-700">Họ Tên</label>
                                                <Form.Item name="name" >
                                                    <Input
                                                        disabled
                                                    />
                                                </Form.Item>
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="phonenumberInput" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                                <Form.Item name="number">
                                                    <Input
                                                        type="text"


                                                        disabled
                                                    />
                                                </Form.Item>
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700">Email</label>
                                                <Form.Item name="number">
                                                    <Input
                                                        type="email"



                                                        disabled
                                                    />
                                                </Form.Item>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="JoiningdatInput" className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                                <Form.Item name="address">
                                                    <Input
                                                        type="text"


                                                        disabled
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="flex ">
                                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => setopenmodel(true)}>Update</button>

                                                <UpdateProfile openmodal={openmodal} onOpen={open} user={user} />
                                            </div>
                                        </div>

                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
