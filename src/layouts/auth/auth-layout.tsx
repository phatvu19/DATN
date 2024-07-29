
import MenuSidebar from "@/layouts/auth/Components/Menu/Menu"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Layout } from "antd"
import React, { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"

const { Header, Sider, Content } = Layout

const AuthLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    const [breadcrumbs, setBreadcrumbs] = useState<React.ReactNode[]>([])
    const user = JSON.parse(localStorage.getItem('user')!)
    console.log(user);

    return (
        <Layout>
            <Sider
                width={210}
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                {!collapsed ? <div className="font-bold text-2xl p-3" >
                    GENTLEMAN'S
                </div> : <div className="pt-2 pb-2 font-bold  pl-2" >
                    GENTLE
                </div>}

                <MenuSidebar />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: 'white', display: 'flex' }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="ml-auto mr-3">
                        <div className="dropdown relative ms-3 ">
                            <button className="bg-gray-100 pl-5 pr-5"  >
                                <div className="flex items-center">
                                    <img className="rounded-full header-profile-user w-10 h-10 " src={user?.data?.avatar ? user?.data?.avatar : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} alt="Header Avatar" />
                                    <div className="text-start ml-2">
                                        <span className="hidden xl:inline-block ms-1 font-medium ">{user?.data?.name ? user?.data?.name : ""}</span>
                                        <span className="hidden xl:block ms-1  text-xs user-name-sub-text" style={{ marginTop: '-20px' }}>Admin</span>
                                    </div>
                                </div>
                            </button>

                        </div>
                    </div>

                </Header>

                <div className="site-layout-content p-10">
                    <Outlet />
                </div>

            </Layout>
        </Layout>
    )
}

export default AuthLayout
