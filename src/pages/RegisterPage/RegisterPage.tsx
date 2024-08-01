import { register } from "@/api/services/AuthService"
import iconFb from "@/assets/images/icons/icon-fb.svg"
import iconGg from "@/assets/images/icons/icon-gg.svg"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
const RegisterPage = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [showPassword, setShowPassword] = React.useState(false)
    const [username, setusername] = useState<any>()
    const [password, setpassword] = useState<any>()
    const [email, setemail] = useState<any>()
    const [confirmPassword, setconfirmpassword] = useState<any>()
    const onSubmit = async () => {
        try {
            const response = await register(username, email, password, confirmPassword)
            if (response) {
                navigate("/dang-nhap")
            }
        } catch (error) {
            console.error(error)
            toast.error("Đăng ký thất bại!")
        }
    }
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
        <div className="mx-auto my-10 max-w-md">
            <h3 className="mb-3 text-center font-medium">Đăng Ký</h3>
            <Form
                id="form-register"
                onFinish={onSubmit}
                className="space-y-3"
                layout="vertical"
                form={form}
            >
                <Form.Item className="mb-3" label="Họ Và Tên" name="name" rules={[{ required: true, message: "Họ và tên là bắt buộc" }]} >
                    <Input
                        className="input input-bordered w-full" onChange={(e: any) => setusername(e.target.value)}
                    />
                </Form.Item>

                <Form.Item className="mb-3" label="Email" name={'email'} rules={[{ required: true, message: "Email là bắt buộc" }, { validator: validateEmail }]}>

                    <Input
                        onChange={(e: any) => setemail(e.target.value)}
                        type="email"
                        className="input input-bordered w-full"
                    />


                </Form.Item>

                <Form.Item className="relative mb-3" label="Mật Khẩu" name={'password'} rules={[{ required: true, message: "Password là bắt buộc" }]}>

                    <Input.Password
                        onChange={(e: any) => setpassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        iconRender={(visible) =>
                            visible ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )
                        }
                        className="input input-bordered w-full"
                    />


                </Form.Item>

                <Form.Item className="relative mb-3" label="Nhập Lại Mật Khẩu" name={'confirmpassword'} rules={[{ required: true, message: "ConfirmPassword là bắt buộc" }]}>

                    <Input.Password
                        onChange={(e: any) => setconfirmpassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        iconRender={(visible) =>
                            visible ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )
                        }
                        className="input input-bordered w-full"
                    />



                </Form.Item>

                <Form.Item className="mb-3">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn w-full rounded bg-red-600 py-2 text-white"
                    >
                        Đăng Ký
                    </Button>
                </Form.Item>

                <p className="mb-2 flex items-center gap-2">
                    Bạn đã có tài khoản?{" "}
                    <a className="text-red-600" href="/dang-nhap">
                        Đăng Nhập Ngay
                    </a>
                </p>
                <a href="#!password/forgot" className="text-red-600">
                    Quên Mật Khẩu
                </a>
            </Form>
            <p className="my-3 text-center font-bold">Hoặc</p>
            <div className="flex flex-col gap-3">
                <div className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-600 py-2 text-white">
                    <img src={iconFb} alt="Facebook" className="h-5 w-5" />
                    <span className="font-medium">Đăng Nhập Với Facebook</span>
                </div>
                <div className="flex cursor-pointer items-center justify-center gap-2 rounded bg-red-600 py-2 text-white">
                    <img src={iconGg} alt="Google" className="h-5 w-5" />
                    <span className="font-medium">Đăng Nhập Với Google</span>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
