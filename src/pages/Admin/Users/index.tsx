import { User } from "@/@types/user"
import { deleteUser, getAllUser } from "@/api/services/UserService"
import { Button, Table } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 

const UserManagement = () => {
    const [users, setUsers] = useState<any>([])
    const [isViewModalVisible, setIsViewModalVisible] = useState(false)
    const [viewingUser, setViewingUser] = useState<User>()

    const navigate = useNavigate()

    const fetchUser = async () => {
        const response = await getAllUser()
       
        setUsers(response)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "number",
            key: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Role",
            dataIndex: "role_id",
            key: "role",
            render: (role_id: number) => (role_id === 1 ? "Customer" : "Admin"),
        }
    ]

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl">User Management</h2>
                <Button
                    type="primary"
                    onClick={() => navigate("/admin/quan-ly-nguoi-dung/them")}
                >
                    Add User
                </Button>
            </div>
            <Table dataSource={users?.data} columns={columns} rowKey="id" />
        </div>
    )
}

export default UserManagement
