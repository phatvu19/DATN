import { register } from "@/api/services/AuthService"
import iconFb from "@/assets/images/icons/icon-fb.svg"
import iconGg from "@/assets/images/icons/icon-gg.svg"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
const RegisterPage = () => {
    const navigate = useNavigate()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()
    const [showPassword, setShowPassword] = React.useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data: {
        name: string
        email: string
        password: string
        confirmPassword: string
    }) => {
        const { name, email, password, confirmPassword } = data
        try {
            const response = await register(name, email, password, confirmPassword)
            if (response) {
                navigate("/dang-nhap")
            }
        } catch (error) {
            console.error(error)
            toast.error("Đăng ký thất bại!")
        }
    }

    return (
        <div className="mx-auto my-10 max-w-md">
            <h3 className="mb-3 text-center font-medium">Đăng Ký</h3>
            <Form
                id="form-register"
                onFinish={handleSubmit(onSubmit)}
                className="space-y-3"
                layout="vertical"
            >
                <Form.Item className="mb-3" label="Họ Và Tên">
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Họ và tên là bắt buộc" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                className="input input-bordered w-full"
                            />
                        )}
                    />
                    {errors.name && (
                        <span className="text-red-600">{errors.name.message}</span>
                    )}
                </Form.Item>

                <Form.Item className="mb-3" label="Email">
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email là bắt buộc" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="email"
                                className="input input-bordered w-full"
                            />
                        )}
                    />
                    {errors.email && (
                        <span className="text-red-600">{errors.email.message}</span>
                    )}
                </Form.Item>

                <Form.Item className="relative mb-3" label="Mật Khẩu">
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Mật khẩu là bắt buộc" }}
                        render={({ field }) => (
                            <Input.Password
                                {...field}
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
                        )}
                    />
                    <i
                        className="fa-solid fa-eye absolute right-0 top-0 mr-3 mt-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    ></i>
                    {errors.password && (
                        <span className="text-red-600">
                            {errors.password.message}
                        </span>
                    )}
                </Form.Item>

                <Form.Item className="relative mb-3" label="Nhập Lại Mật Khẩu">
                    <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{ required: "Nhập lại mật khẩu là bắt buộc" }}
                        render={({ field }) => (
                            <Input.Password
                                {...field}
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
                        )}
                    />
                    <i
                        className="fa-solid fa-eye absolute right-0 top-0 mr-3 mt-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    ></i>
                    {errors.confirmPassword && (
                        <span className="text-red-600">
                            {errors.confirmPassword.message}
                        </span>
                    )}
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
                    <a className="text-red-600" href="#!login">
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
