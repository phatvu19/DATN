import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Layout } from "antd"
import React from "react"

const { Header } = Layout

interface Props {
    collapsed: boolean
    toggleCollapsed: () => void
}

const AppHeader: React.FC<Props> = ({ collapsed, toggleCollapsed }) => {
    return (
        <Header style={{ padding: 0 , background:'white'}}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    )
}

export default AppHeader
