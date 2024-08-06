import { getAllProduct } from "@/api/services/ProductService"
import logo from "@/assets/images/logo/logo.webp"
import {
    DashboardOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons"
import { Button, Dropdown, Menu } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import localStorage from "redux-persist/es/storage"

function Header({ onSearch }:any) {
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            if (scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        const fetchRole = async () => {
            const role = await localStorage.getItem("role")
            if (role) {
            }
        }
        fetchRole()
    }, [])

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "logout") {
            localStorage.removeItem("user")
            localStorage.removeItem("accessToken")
            toast.success("Bạn đã đăng xuất!")
            navigate("/")
            window.location.reload()
        }
    }

    const [role, setrole] = useState<any>()

    useEffect(() => {
        const fetchStoredCarts = async () => {
            try {
                const user: any = await localStorage.getItem("user")
                const users = JSON.parse(user) || []
                setrole(users?.data?.role_id)
            } catch (error) {
                console.error("Error fetching or parsing stored carts:", error)
            }
        }
        fetchStoredCarts()
    }, [])
    const userMenu = (
        <Menu onClick={handleMenuClick}>
            <a href={"/profile"}>
                <Menu.Item key="profile" icon={<UserOutlined />}>
                    Thông tin cá nhân
                </Menu.Item>
            </a>
            <a href={"/orders"}>
                <Menu.Item key="orders" icon={<SettingOutlined />}>
                    Đơn hàng
                </Menu.Item>
            </a>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    )
    const authMenu = (
        <Menu>
            <Menu.Item key="login">
                <a href="/dang-nhap">Đăng nhập</a>
            </Menu.Item>
            <Menu.Item key="register">
                <a href="/dang-ki">Đăng ký</a>
            </Menu.Item>
        </Menu>
    )
    const [product, setProduct] = useState<any>()
    useEffect(() => {
        const fetchpro = async () => {
            const response = await getAllProduct()
            setProduct(response)
        }
        fetchpro()
    }, [])
    const HandleSearch = (e: any) => {
        e.preventDefault();
        const searchValue = e.target.value.toLowerCase();

        if (searchValue === "") {
            onSearch([]);
        } else {
            const filter = product?.filter((data: any) =>
                data?.name.toLowerCase().includes(searchValue)
            );
            onSearch(filter);
        }
    };

    return (
        <>
            <header className="header">
                <div className="swiper swiper-initialized">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="sale-header relative flex h-[50px] items-center justify-center bg-[rgb(201,32,39)] bg-[url('https://pm2ec.s3.ap-southeast-1.amazonaws.com/cms/17122900563117907.jpg')] bg-contain bg-center">
                                <div className="sale-content mr-2 font-semibold uppercase text-white">
                                    Flash sale đến 50%
                                </div>
                                <div className="sale-action flex justify-end">
                                    <div className="">
                                        <a
                                            href="https://tokyolife.vn/landing-page/hot-100"
                                            className="text-bold text-sm text-white"
                                        >
                                            gentleman's
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`sticky-header h-[126px] w-full bg-[#f8f1e4] ${isScrolled ? "fixed top-0 z-10" : ""}`}
                >
                    <div className="header-content container mx-auto flex h-[63px] max-w-7xl items-center justify-between">
                        <div className="logo">
                            <a href="/" className="font-bold text-2xl">
                                GENTLEMAN'S
                            </a>
                        </div>
                        <div className="search mx-4 flex w-full max-w-3xl justify-center">
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    autoComplete="off"
                                    aria-invalid="false"
                                    onChange={(e: any) => HandleSearch(e)}
                                    className="w-full rounded-l border border-r-0 p-2 outline-none"
                                />
                                <button className="rounded-r border border-l-0 bg-red-500 p-2 text-white hover:bg-red-600">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fillOpacity="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="icon-wrapper"
                                            clipPath="url(#clip0_10988_132346)"
                                        >
                                            <path
                                                id="Union"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.832031 7.66536C0.832031 11.432 3.8987 14.4987 7.66536 14.4987C11.432 14.4987 14.4987 11.432 14.4987 7.66536C14.4987 3.8987 11.432 0.832031 7.66536 0.832031C3.8987 0.832031 0.832031 3.8987 0.832031 7.66536ZM1.83203 7.66536C1.83203 4.45203 4.44536 1.83203 7.66536 1.83203C10.8854 1.83203 13.4987 4.45203 13.4987 7.66536C13.4987 10.8787 10.8854 13.4987 7.66536 13.4987C4.44536 13.4987 1.83203 10.8787 1.83203 7.66536ZM14.312 15.019C14.412 15.119 14.5387 15.1657 14.6653 15.1657C14.792 15.1657 14.9187 15.119 15.0187 15.019C15.212 14.8257 15.212 14.5057 15.0187 14.3123L13.6853 12.979C13.492 12.7857 13.172 12.7857 12.9787 12.979C12.7853 13.1723 12.7853 13.4923 12.9787 13.6857L14.312 15.019Z"
                                                fill="white"
                                            ></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_10988_132346">
                                                <rect
                                                    width="16"
                                                    height="16"
                                                    fill="white"
                                                ></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="actions flex items-center space-x-4">
                            <a
                                href="/cart"
                                className="relative  text-gray-700 hover:text-gray-900"
                            >
                                <i className=" ri-shopping-cart-2-line text-xl"></i>
                            </a>
                            <a
                                href="/order-tracking"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fillOpacity="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.86066 22.17C10.5207 22.54 11.3907 22.75 12.3007 22.75C13.2107 22.75 14.0807 22.54 14.7407 22.16C15.1007 21.96 15.2307 21.5 15.0307 21.14C14.8307 20.78 14.3707 20.65 14.0107 20.85C13.7482 20.9978 13.4139 21.101 13.0508 21.1596V12.991L21.0358 8.36572C21.1161 8.63829 21.1606 8.90804 21.1606 9.15997V12.82C21.1606 13.23 21.5006 13.57 21.9106 13.57C22.3206 13.57 22.6606 13.23 22.6606 12.82V9.15997C22.6606 7.49997 21.5206 5.57001 20.0706 4.77001L14.7307 1.80999C13.3607 1.04999 11.2207 1.04999 9.86066 1.80999L4.52066 4.77001C3.07066 5.58001 1.93066 7.49997 1.93066 9.15997V14.82C1.93066 16.48 3.07066 18.41 4.52066 19.21L9.86066 22.17ZM20.3561 7.01894L12.3006 11.6796L4.25189 7.02183C4.54363 6.62759 4.89279 6.29481 5.26065 6.09002L10.6006 3.13C11.5106 2.62 13.1007 2.62 14.0107 3.13L19.3506 6.09002C19.7152 6.29127 20.0638 6.62372 20.3561 7.01894ZM3.57364 8.36918L11.5508 12.9856V21.157C11.1926 21.098 10.8622 20.9956 10.6006 20.85L5.26065 17.89C4.30065 17.36 3.45065 15.92 3.45065 14.82V9.15997C3.45065 8.90874 3.49447 8.6403 3.57364 8.36918ZM19.5008 22.1498C17.3208 22.1498 15.5508 20.3798 15.5508 18.1998C15.5508 16.0198 17.3208 14.2498 19.5008 14.2498C21.6808 14.2498 23.4508 16.0198 23.4508 18.1998C23.4508 19.0209 23.1997 19.7838 22.7701 20.4159C22.7911 20.4327 22.8113 20.4508 22.8307 20.4702L23.8307 21.4702C24.1207 21.7602 24.1207 22.2402 23.8307 22.5302C23.6807 22.6802 23.4907 22.7502 23.3007 22.7502C23.1107 22.7502 22.9207 22.6802 22.7707 22.5302L21.7707 21.5302C21.7513 21.5108 21.7332 21.4905 21.7164 21.4695C21.0844 21.8988 20.3216 22.1498 19.5008 22.1498ZM19.5008 15.7498C18.1508 15.7498 17.0508 16.8498 17.0508 18.1998C17.0508 19.5498 18.1508 20.6498 19.5008 20.6498C20.8508 20.6498 21.9508 19.5498 21.9508 18.1998C21.9508 16.8498 20.8508 15.7498 19.5008 15.7498Z"
                                        fill="#292D32"
                                    ></path>
                                </svg>
                            </a>
                            <div>
                                {role >= 0 ? (
                                    <Dropdown overlay={userMenu} trigger={["hover"]}>
                                        <Button
                                            icon={<UserOutlined />}
                                            className="flex items-center"
                                        >

                                        </Button>
                                    </Dropdown>
                                ) : (
                                    <Dropdown overlay={authMenu} trigger={["hover"]}>
                                        <a
                                            href="#"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            <i className=" ri-user-3-fill"></i>
                                        </a>
                                    </Dropdown>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="menu-box flex h-[63px] items-center bg-white shadow-md">
                        <nav className="nav container mx-auto flex max-w-7xl justify-start">
                            <ul className="flex flex-col rounded-lg font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse ">
                                <li>
                                    <a
                                        href="/"
                                        className="block rounded py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-600"
                                        aria-current="page"
                                    >
                                        Trang chủ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/products"
                                        className="block rounded py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-600"
                                    >
                                        Sản phẩm
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="sales"
                                        className="block rounded py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-600"
                                    >
                                        Giảm giá
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/lienhe"
                                        className="block rounded py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-600"
                                    >
                                        Liên hệ
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
