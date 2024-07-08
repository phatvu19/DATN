import logo from "@/assets/images/logo/logo.webp"
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

    useEffect(() => {
        const generateBreadcrumbs = () => {
            const pathnames = location.pathname.split("/").filter((item) => item)
            const newBreadcrumbs = [
                <Breadcrumb.Item key="home">
                    {/* <NavLink to="/admin/thong-ke"></NavLink> */}
                </Breadcrumb.Item>,
                ...pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
                    const displayName = name
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                    return (
                        <Breadcrumb.Item key={routeTo}>
                            <NavLink to={routeTo}>{displayName}</NavLink>
                        </Breadcrumb.Item>
                    )
                }),
            ]
            setBreadcrumbs(newBreadcrumbs)
        }

        generateBreadcrumbs()
    }, [location.pathname])

    return (
        <Layout>
            <Sider
                width={210}
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="demo-logo-vertical m-5">
                    <img src={logo} alt="logo" />
                </div>
                <MenuSidebar />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}>
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
                </Header>
                <Content
                    style={{
                        padding: "20px 50px",
                        overflowY: "auto",
                        backgroundColor: "whitesmoke",
                    }}
                    className="min-h-screen"
                >
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        {breadcrumbs}
                    </Breadcrumb>
                    <div className="site-layout-content ">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AuthLayout
