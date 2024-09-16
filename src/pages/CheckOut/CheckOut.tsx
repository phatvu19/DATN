import cart from "../../assets/images/icons/icon-cart-3.svg"
import cart1 from "../../assets/images/icons/icon-bag-4.svg"
import cart2 from "../../assets/images/icons/icon-bag-3.svg"
import {
    CreditCardOutlined,
    EnvironmentOutlined,
    LoadingOutlined,
    QuestionCircleOutlined,
    UserOutlined,
} from "@ant-design/icons"
import { Button, Form, Input, Modal, Radio, Select, Spin } from "antd"
import TextArea from "antd/es/input/TextArea"
import ProvinceInCheckOut from "./ProvinceInCheckOut"
import { useEffect, useState } from "react"
import DistrictInCheckOut from "./DistrictInCheckOut"
import WardInCheckOut from "./WardInCheckOut"
import CartInCheckOut from "./CartInCheckOut"
import formatNumber from "@/utilities/FormatTotal"
import { Link, useNavigate } from "react-router-dom"
import { addBill, addBillDetail, addHistoryBills } from "@/api/services/Bill"
import { toast } from "react-toastify"
import { getCartOrder } from "@/api/services/Order"
import { GetSaleId, getAllSale, getAllSaleProduct } from "@/api/services/Sale"
import { getAllVoucher } from "@/api/services/Voucher"
import { getUser } from "@/api/services/UserService"
const CheckOut = () => {
    const [form] = Form.useForm()
    const user = JSON.parse(localStorage.getItem("user") || "null")
    const [users, setusers] = useState<any>()
    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUser(user?.data?.id)
            setusers(response)
            form.setFieldsValue(response)
        }
        fetchUser()
    }, [])
    useEffect(() => {
        form.setFieldsValue(users)
    }, [])
    const [provinceId, setprovinceId] = useState<any>()
    const [provinceName, setprovinceName] = useState<any>()
    const [districtId, setdistrictId] = useState<any>()
    const [districtName, setDistrictName] = useState<any>()
    const [wardName, setWardName] = useState<any>()
    const [adressdetail, setadressdetail] = useState<any>()
    const [phone, setPhone] = useState<any>()
    const [paymentMethod, setPaymentMethod] = useState<any>()
    const [name, setname] = useState<any>()
    const [descbill, setdescbill] = useState<any>()
    const [totalprice, setTotalprice] = useState<number>(0)
    const [loading, setloading] = useState(true)
    const [discountCode, setDiscountCode] = useState("")
    const [priceDiscount, setPriceDiscount] = useState<any>(0)
    const [loadings, setloadings] = useState<any>()
    const [res, setres] = useState<any>()

    const HandleVnpay = async () => {
        const check = confirm(
            "Nếu chọn thanh toán ONLINE thì bạn sẽ không thể hủy đơn khi thanh toán thành công!",
        )
        if (check) {
            setloadings(true)
            const data = {
                user_id: user?.data?.id,
                recipient_address:
                    wardName && districtName && provinceName
                        ? `${name ? name : form.getFieldValue("name")}; ${descbill ? descbill : ""};${adressdetail}, ${wardName}, ${districtName}, ${provinceName}`
                        : `${name ? name : form.getFieldValue("name")}; ${descbill ? descbill : ""};${form.getFieldValue("address")}`,
                recipient_phone: phone ? phone : form.getFieldValue("number"),
                total_amount: priceDiscount
                    ? totalprice - priceDiscount
                    : totalprice,
                status: "Paid",
                pay: "ONLINE",
                voucher: "sed",
            }
            const response: any = await addBill(data)
            setres(response)
            localStorage.setItem("response", JSON.stringify(response))
            window.location.href = `http://localhost:8000/api/pay/${response?.data?.id}/${data?.total_amount}/VNPAY`
        }
    }

    const adddetailAndsendemail = async () => {
        setloadings(true)
        const storedCarts = JSON.parse(localStorage.getItem("cart")!) || []
        const response = JSON.parse(localStorage.getItem("response") || "null")
        const data = { data: storedCarts }
        const allCart: any = await getCartOrder(data)
        if (response) {
            const data2: any = {
                data: [],
                bill_id: response?.data?.id,
                token: `${user?.token}`,
            }

            await Promise.all(
                carts.map(async (element: any, index: any) => {
                    const sales = await getAllSale()
                    const sale: any = sales?.find(
                        (item: any) => item?.id == element?.sale_id,
                    )?.name
                    const totalPrice = (allCart?.data[index]?.price * sale) / 100
                    const data1 = {
                        variant_id: element?.variant_id,
                        product_name: element?.name_product,
                        attribute: `${allCart?.data[index]?.atribute[0].value}; ${allCart?.data[index]?.atribute[1].value}`,
                        price: sale
                            ? allCart?.data[index]?.price - totalPrice
                            : allCart?.data[index]?.price,
                        quantity: element?.quantity,
                        sale: priceDiscount ? `${priceDiscount}` : 0,
                        image: element?.image,
                        price_origin: 1,
                    }
                    data2.data.push(data1)
                }),
            )

            await addBillDetail(data2).then(async (data) => {
                console.log(data)

                if (data?.data?.status == true) {
                    localStorage.removeItem("cart")
                    localStorage.removeItem("response")
                    toast.success("Đặt hàng thành công")
                    setloadings(false)
                    setTimeout(() => {
                        window.location.href = `/order_done/${response?.data?.id} `
                    }, 300)
                } else {
                    toast.error(data?.data?.status)
                    setTimeout(() => {
                        setloadings(false)
                        navigate("/")
                    }, 500)
                }
            })
        }
    }
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const vnp_ResponseCode = params.get("vnp_ResponseCode")
        if (vnp_ResponseCode) {
            if (vnp_ResponseCode === "00") {
                adddetailAndsendemail()
            } else {
                confirm("Thanh toán thất bại!")
                navigate("/")
            }
        }
    }, [location.search])
    if (loadings) {
    }
    const handlePaymentChange = (e: any) => {
        if (e.target.value == "COD") {
            setPaymentMethod("COD")
        } else {
            setPaymentMethod("ONLINE")
            HandleVnpay()
        }
    }
    const { Search } = Input
    const buttonStyle = {
        backgroundColor: "red",
        borderColor: "red",
        color: "white",
    }
    const buttonStyles = {
        backgroundColor: "gray",
        borderColor: "gray",
        color: "white",
    }
    const nameprovince = (name: any) => {
        setprovinceName(name)
    }
    const idprovince = (id: any) => {
        setprovinceId(id)
    }
    const namedistrict = (name: any) => {
        setDistrictName(name)
    }
    const iddistrict = (id: any) => {
        setdistrictId(id)
    }
    const nameWard = (name: any) => {
        setWardName(name)
    }
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cartt, setcart] = useState<any>()
    const handleCartUpdate = async () => {
        const storedCarts = JSON.parse(localStorage.getItem("cart")!) || []
        setcart(storedCarts)
        const data = { data: storedCarts }
        const allCart: any = await getCartOrder(data)
        setcart(allCart)
        if (
            allCart?.data?.every((item: any) => item.sale_id === 1) &&
            allCart?.data?.reduce(
                (sum: number, item: any) => sum + item.quantity,
                0,
            ) === 3
        ) {
            const total = allCart?.data?.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0,
            )
            const discountedTotal = total * 0.9 // Apply 10% discount
            setTotalPrice(discountedTotal)
        } else {
            const total = allCart?.data?.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0,
            )
            setTotalPrice(total)
        }
    }
    useEffect(() => {
        handleCartUpdate()
    }, [])

    const carts = JSON.parse(localStorage.getItem("cart") || "[]")
    const totalCartPrice = cartt?.data?.reduce(
        (total: any, item: any, index: any) =>
            total + item.price * carts[index]?.quantity,
        0,
    )

    const navigate = useNavigate()
    const handleOk = () => {
        navigate("/dang-nhap")
    }
    const handleCancel = () => {
        navigate("/dang-ki")
    }
    const handleAdress = (e: any) => {
        setadressdetail(e.target.value)
    }

    const handleOrder = async () => {
        setloadings(true)
        const data = {
            user_id: user?.data?.id,
            recipient_address:
                wardName && districtName && provinceName
                    ? `${name ? name : form.getFieldValue("name")}; ${descbill ? descbill : ""};${adressdetail}, ${wardName}, ${districtName}, ${provinceName}`
                    : `${name ? name : form.getFieldValue("name")}; ${descbill ? descbill : ""};${form.getFieldValue("address")}`,
            recipient_phone: phone ? phone : form.getFieldValue("number"),
            total_amount: priceDiscount ? totalprice - priceDiscount : totalprice,
            status: "Pending",
            pay: paymentMethod,
            voucher: "sed",
            // bill_date: "2004-08-29",
        }
        const response: any = await addBill(data)
        if (response) {
            const data2: any = {
                data: [],
                bill_id: response?.data?.id,
                token: `${user?.token}`,
            }
            await Promise.all(
                carts.map(async (element: any, index: any) => {
                    const sales = await getAllSale()
                    const sale: any = sales?.find(
                        (item: any) => item?.id == element?.sale_id,
                    )?.name
                    const totalPrice = (cartt?.data[index]?.price * sale) / 100
                    const data1 = {
                        variant_id: element?.variant_id,
                        product_name: element?.name_product,
                        attribute: `${cartt?.data[index]?.atribute[0].value}; ${cartt?.data[index]?.atribute[1].value}`,
                        price: sale
                            ? cartt?.data[index]?.price - totalPrice
                            : cartt?.data[index]?.price,
                        quantity: element?.quantity,
                        sale: 0,
                        image: element?.image,
                        price_origin: 1,
                    }
                    data2.data.push(data1)
                }),
            )

            await addBillDetail(data2).then(async (data) => {
                if (data?.data?.status == true) {
                    const data = {
                        bill_id: response?.data?.id,
                        user_id: user?.data?.id,
                        description: `Khách hàng vừa đặt đơn hàng mới`,
                    }
                    await addHistoryBills(data)
                    toast.success("Đặt hàng thành công")
                    setloadings(false)
                    localStorage.removeItem("cart")
                    setTimeout(() => {
                        window.location.href = `/order_done/${response?.data?.id} `
                    }, 500)
                } else {
                    toast.error(data?.data?.status)
                    setloadings(false)
                    setTimeout(() => {
                        window.location.href = `/ `
                    }, 500)
                }
            })
        }
    }

    if (user == null) {
        return (
            <>
                <Modal
                    title="Cảnh báo !"
                    open={true}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Đăng nhập"
                    cancelText="Đăng kí"
                >
                    <p>Bạn cần đăng nhập hoặc đăng kí!</p>
                </Modal>
            </>
        )
    }
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOks = () => {
        setIsModalOpen(false)
    }

    const handleCancels = () => {
        setIsModalOpen(false)
    }

    const calculateTotalClick = async () => {
        let total = 0

        const promises = cartt?.data?.map(async (product: any, index: any) => {
            const cartItem: any = carts.find(
                (item: any) => item.variant_id === product.variant_id,
            )
            const cartSale_id: any = carts[index]?.sale_id

            const allSale: any = await GetSaleId(cartSale_id)
            const totalSale: any = (product.price * allSale?.name) / 100
            if (cartItem) {
                const price = cartSale_id ? product.price - totalSale : product.price
                const quantity = parseInt(cartItem.quantity, 10)
                if (!isNaN(price) && !isNaN(quantity)) {
                    total += price * quantity
                }
            }
            setloading(false)
        })
        await Promise.all(promises)
        setTotalprice(total)
    }
    useEffect(() => {
        if (cartt) {
            calculateTotalClick()
        }
    }, [cartt])
    const [checkvoucher, setcheckvoucher] = useState<any>(false)
    const HandleVoucher = async () => {
        const voucher: any = await getAllVoucher()
        console.log(discountCode)
        const check: any = voucher
            ? voucher?.data?.find(
                  (data1: any) => data1?.voucher_code == discountCode,
              )?.discount_amount
            : ""
        const voucherTotal = (totalprice * check) / 100
        if (discountCode.toLowerCase() == "xinchao") {
            if (checkvoucher == false) {
                if (totalprice >= 499000 && totalprice < 670000) {
                    setPriceDiscount(70000)
                    toast.success("Bạn đã nhập đúng voucher của shop!")
                    setcheckvoucher(true)
                } else if (totalprice >= 670000) {
                    setPriceDiscount(100000)
                    console.log("okokok1")
                    toast.success("Bạn đã nhập đúng voucher của shop!")
                    setcheckvoucher(true)
                }
            } else {
                toast.warning("Voucher của shop đã được áp dụng!")
            }
        } else if (voucherTotal) {
            setPriceDiscount(voucherTotal)
        } else {
            toast.error("Bạn đã nhập sai voucher của shop!")
        }
    }
    const validatePhone = (
        rule: any,
        value: string,
        callback: (arg0: string | undefined) => void,
    ) => {
        const phonePattern = /^[0-9]{10}$/ // Regular expression for 10-digit Vietnamese phone number

        if (value && !phonePattern.test(value)) {
            callback("Số điện thoại không hợp lệ")
        } else {
            callback(undefined)
        }
    }
    const validateEmail = (
        rule: any,
        value: string,
        callback: (arg0: string | undefined) => void,
    ) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ // Basic email pattern

        if (value && !emailPattern.test(value)) {
            callback("Email không hợp lệ")
        } else {
            callback(undefined)
        }
    }
    return (
        <>
            {loadings && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <LoadingOutlined className="text-4xl text-white" spin />
                </div>
            )}
            <main className="body m-36 mt-10 bg-gray-100 p-5">
                <div className="mb-10 mt-5 flex items-center justify-center">
                    <div className="flex items-center pl-10 pr-2">
                        <img src={cart} className="img-fluid" />
                        <span className="fs-5 fw-light ml-2 text-xl ">Giỏ Hàng</span>
                    </div>

                    <hr className="my-4 w-20 border-t border-dashed border-gray-400" />

                    <div className="flex items-center pl-2 pr-2">
                        <img src={cart1} className="img-fluid" />
                        <span className="fs-4 fw-bold text-danger ml-2 text-xl ">
                            Đặt Hàng
                        </span>
                    </div>

                    <hr className="my-4 w-20 border-t border-dashed border-gray-400" />

                    <div className="flex items-center pl-2 pr-10">
                        <img src={cart2} className="img-fluid text-xl" />
                        <span className="fs-5 fw-light ml-2 text-xl ">
                            Hoàn Thành Đơn Hàng
                        </span>
                    </div>
                </div>

                <div className="checkout-main container mt-5">
                    <div className="row flex ">
                        <Form
                            className="row flex p-0 pt-8"
                            form={form}
                            onFinish={handleOrder}
                        >
                            <div className="w-3/4">
                                <div className="flex">
                                    <div className="flex">
                                        <EnvironmentOutlined />
                                        <h4 className="ml-2 text-xl font-bold">
                                            Địa Chỉ Giao Hàng
                                        </h4>
                                    </div>
                                    {user != null ? (
                                        ""
                                    ) : (
                                        <a
                                            className="text-danger fw-bold mb-0 ml-auto text-sm text-red-500"
                                            ng-show="!isLogin"
                                            href="#!login"
                                        >
                                            <UserOutlined />
                                            <span className="text-danger ml-2 ">
                                                Đăng Nhập
                                            </span>
                                        </a>
                                    )}
                                </div>

                                <div className="flex">
                                    <div className="w-2/4">
                                        <label
                                            htmlFor="name"
                                            className="pl-1 text-sm font-bold"
                                        >
                                            Họ Tên
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Form.Item
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Không được để trống tên ",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Nhập họ tên của bạn"
                                                className="mt-3 p-2"
                                                onChange={(e) =>
                                                    setname(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="ml-10 w-2/4">
                                        <label
                                            htmlFor="name"
                                            className="pl-1 text-sm font-bold"
                                        >
                                            Email
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Không được để trống email ",
                                                },
                                                {
                                                    validator: validateEmail,
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Nhập email của bạn"
                                                className="mt-3 p-2"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="mt-5 flex">
                                    <div className="w-2/4">
                                        <label
                                            htmlFor="name"
                                            className="pl-1 text-sm font-bold"
                                        >
                                            Số điện thoại
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Form.Item
                                            name="number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Không được để trống số điện thoại ",
                                                },
                                                {
                                                    validator: validatePhone,
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Nhập số điện thoại của bạn"
                                                className="mt-3 p-2"
                                                type="number"
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="ml-10 w-2/4"></div>
                                </div>
                                {users?.address ? (
                                    <div className="mt-5">
                                        <label htmlFor="" className="font-bold">
                                            Địa chỉ
                                        </label>
                                        <div className="mt-5 flex w-full">
                                            <Form.Item
                                                name="address"
                                                className="mr-2 w-full"
                                            >
                                                <Input type="text" disabled />
                                            </Form.Item>
                                            <Link to="/profile">
                                                <Button
                                                    className="ml-auto"
                                                    type="primary"
                                                >
                                                    Cập nhập địa chỉ mới
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-5 flex w-full">
                                        <ProvinceInCheckOut
                                            onIDProvince={idprovince}
                                            onNameProvince={nameprovince}
                                        />

                                        <DistrictInCheckOut
                                            id={provinceId}
                                            onIDDistrict={iddistrict}
                                            onNameDistrict={namedistrict}
                                        />

                                        <WardInCheckOut
                                            id={districtId}
                                            onNameWard={nameWard}
                                        />
                                    </div>
                                )}

                                <div className="mt-5">
                                    <label
                                        htmlFor="name"
                                        className="pl-1 text-sm font-bold"
                                    >
                                        Địa chỉ cụ thể
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Form.Item
                                        name="desc"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Không được để trống địa chỉ cụ thể ",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Nhập địa chỉ cụ thể của bạn"
                                            className="mt-3 p-2"
                                            onChange={(e: any) => handleAdress(e)}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="col-12 mb-4 mt-5">
                                    <label
                                        htmlFor="name"
                                        className="pl-1 text-sm font-bold"
                                    >
                                        Ghi chú đơn hàng
                                    </label>
                                    <TextArea
                                        className="mt-3"
                                        placeholder="Ghi chú đơn hàng"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        onChange={(e) => setdescbill(e.target.value)}
                                    />
                                </div>

                                <div className="row mt-10">
                                    <div className="col-12 col-md-6">
                                        <h5 className="flex items-center pr-2">
                                            <CreditCardOutlined />
                                            <span className="ml-2 text-xl font-bold">
                                                Phương Thức Thanh Toán
                                            </span>
                                        </h5>
                                    </div>

                                    <div className="w-full">
                                        <Radio.Group className="mt-3 w-full">
                                            <h5 className="w-full">
                                                <Input
                                                    type="radio"
                                                    style={{
                                                        width: "4%",
                                                        height: "16px",
                                                    }}
                                                    id="paypal"
                                                    name="a"
                                                    value="COD"
                                                    onChange={handlePaymentChange}
                                                />
                                                <span className="w-full text-sm">
                                                    Thanh toán khi nhận hàng (COD)
                                                </span>
                                            </h5>
                                        </Radio.Group>
                                        <Radio.Group className="mt-3 w-full">
                                            <h5 className="w-full">
                                                <Input
                                                    className="text-xl"
                                                    type="radio"
                                                    style={{
                                                        width: "4%",
                                                        height: "16px",
                                                        fontSize: "20px",
                                                    }}
                                                    id="paypal"
                                                    name="a"
                                                    value="ONLINE"
                                                    onChange={handlePaymentChange}
                                                />
                                                <span className="w-full text-sm">
                                                    Thanh toán online (VNPAY)
                                                </span>
                                            </h5>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className=" ml-4 w-1/4 bg-white p-4 ">
                                <div className="">
                                    <h5 className="text-xl font-bold">ĐƠN HÀNG</h5>

                                    <div className="mt-5">
                                        <label
                                            htmlFor="name"
                                            className="pl-1 text-xs font-bold"
                                        >
                                            MÃ PHIẾU GIẢM GIÁ
                                        </label>
                                        <div className="flex">
                                            <Input
                                                className="custom-search  mt-2"
                                                placeholder="Nhập mã giảm giá"
                                                onChange={(e) =>
                                                    setDiscountCode(e.target.value)
                                                }
                                            ></Input>
                                            <Button
                                                className="custom-search  mt-2"
                                                style={buttonStyle}
                                                onClick={HandleVoucher}
                                            >
                                                Áp Dụng
                                            </Button>
                                        </div>
                                    </div>
                                    <img
                                        src="https://pm2ec.s3.ap-southeast-1.amazonaws.com/cms/17172282689428000.jpg"
                                        className="mt-2"
                                    />
                                    <hr className="my-4 w-full border-t border-dashed border-gray-500" />
                                    <div className="custom-dash d-flex flex-column gap-2 pb-3">
                                        <div className="mt-5 flex">
                                            <p className="text-sm">Tạm Tính</p>
                                            <p className="fw-bold mb-0 ml-auto text-sm font-bold">
                                                {formatNumber(totalprice)} đ
                                            </p>
                                        </div>
                                        <div className="mt-3 flex">
                                            <p className="mr-1 text-sm">Giảm Giá </p>
                                            <QuestionCircleOutlined
                                                onClick={showModal}
                                            />
                                            <Modal
                                                title="Giảm giá"
                                                open={isModalOpen}
                                                onOk={handleOks}
                                                onCancel={handleCancels}
                                            >
                                                <p>
                                                    Để có được giảm giá bạn cần mua
                                                    các sản phẩm có ưu đãi của chúng
                                                    tôi!
                                                </p>
                                                <p>
                                                    Đồng thời bạn không thể nhập
                                                    voucher áp dùng nữa!
                                                </p>
                                            </Modal>
                                            <p className="fw-bold mb-0 ml-auto text-sm font-bold">
                                                -{" "}
                                                {priceDiscount
                                                    ? formatNumber(priceDiscount)
                                                    : 0}{" "}
                                                đ
                                            </p>
                                        </div>
                                        <div className="mt-3 flex">
                                            <p className="text-sm">Phí Vận Chuyển</p>
                                            <p className="fw-bold mb-0 ml-auto text-sm font-bold">
                                                30.000 đ
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="my-4 w-full border-t border-dashed border-gray-500" />
                                    <div className="custom-dash d-flex flex-column gap-2 pb-3">
                                        <div className="flex">
                                            <h5 className="">Tổng Tiền</h5>
                                            <h5 className="fw-bold mb-0 ml-auto font-bold text-red-500 ">
                                                {priceDiscount
                                                    ? formatNumber(
                                                          totalprice +
                                                              30000 -
                                                              priceDiscount,
                                                      )
                                                    : formatNumber(
                                                          totalprice + 30000,
                                                      )}
                                                đ
                                            </h5>
                                        </div>
                                    </div>
                                    <hr className="w-full border-t border-dashed border-gray-500 " />
                                    {loading ? (
                                        <Button className="align-center mt-5 w-full rounded bg-red-600 p-2 text-white">
                                            <Spin
                                                indicator={
                                                    <LoadingOutlined
                                                        style={{ fontSize: 16 }}
                                                        spin
                                                    />
                                                }
                                            />
                                        </Button>
                                    ) : (
                                        <Button
                                            htmlType="submit"
                                            className="align-center mt-5 w-full rounded bg-red-600 p-2 text-white"
                                        >
                                            Đặt Hàng
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>

                <CartInCheckOut />
            </main>
        </>
    )
}

export default CheckOut
