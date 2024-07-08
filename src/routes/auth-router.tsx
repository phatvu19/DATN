import AttributeManagement from "@/pages/Admin/Attributes"
import CategoryManagement from "@/pages/Admin/Categories"
import Dashboard from "@/pages/Admin/Dashboard"
import ListOrderAdmin from "@/pages/Admin/Orders/ListOrderAdmin"
import OrderDetailInListOrderAdmin from "@/pages/Admin/Orders/OrderDetailInListOrderAdmin"
import AddProduct from "@/pages/Admin/Products/_Features/AddProduct"
import UpdateProduct from "@/pages/Admin/Products/_Features/UpdateProduct"
import ProductManagement from "@/pages/Admin/Products/ProductList"
import UserManagement from "@/pages/Admin/Users"
import AddUser from "@/pages/Admin/Users/_Features/AddUser"
import UpdateUser from "@/pages/Admin/Users/_Features/UpdateUser"
import { pathName } from "@/routes/path-name"
export const AuthRouter = [
    {
        path: pathName.DASHBOARD,
        element: <Dashboard />,
    },
    {
        path: pathName.CATEGORIES,
        element: <CategoryManagement />,
    },
    {
        path: pathName.PRODUCT_MANAGEMENT,
        element: <ProductManagement />,
    },
    {
        path: pathName.UPDATE_PRODUCT,
        element: <UpdateProduct />,
    },
    {
        path: pathName.ADD_PRODUCT,
        element: <AddProduct />,
    },
    {
        path: pathName.USER_MANAGEMENT,
        element: <UserManagement />,
    },
    {
        path: pathName.ADD_USER,
        element: <AddUser />,
    },
    {
        path: pathName.UPDATE_USER,
        element: <UpdateUser />,
    },
    {
        path: pathName.ORDER_MANAGEMENT,
        element: <ListOrderAdmin />,
    },
    {
        path: pathName.ORDER_DETAIL_MANAGEMENT,
        element: <OrderDetailInListOrderAdmin />,
    },
    {
        path: pathName.ATTR_MANAGEMENT,
        element: <AttributeManagement />,
    },
]
