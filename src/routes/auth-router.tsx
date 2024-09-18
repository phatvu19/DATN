import AttributeManagement from "@/pages/Admin/Attributes"
import CategoryManagement from "@/pages/Admin/Categories"
import Dashboard from "@/pages/Admin/Dashboard"
import ListOrderAdmin from "@/pages/Admin/Orders/ListOrderAdmin"
import ListOrderCancel from "@/pages/Admin/Orders/OrderCancel/ListOrderCancel"
import ListOrderConFirm from "@/pages/Admin/Orders/OrderConFirm/ListOrderConFirm"
import OrderDetailInListOrderAdmin from "@/pages/Admin/Orders/OrderDetailInListOrderAdmin"
import ListOrderDones from "@/pages/Admin/Orders/OrderDone/ListOrderDone"
import ListOrderPaid from "@/pages/Admin/Orders/OrderPaid/ListOrderPaid"
import ListOrderPending from "@/pages/Admin/Orders/OrderPending/ListOrderPending"
import ListOrderSiping from "@/pages/Admin/Orders/OrderShiping/ListOrderSiping"
import AddProduct from "@/pages/Admin/Products/_Features/AddProduct"
import UpdateProduct from "@/pages/Admin/Products/_Features/UpdateProduct"
import ProductManagement from "@/pages/Admin/Products/ProductList"
import ListSaleProduct from "@/pages/Admin/Sale/ListSaleProduct"
import UserManagement from "@/pages/Admin/Users"
import AddUser from "@/pages/Admin/Users/_Features/AddUser"
import ListVoucher from "@/pages/Admin/Voucher/ListVoucher"
import { pathName } from "@/routes/path-name"
import ListComment from "../pages/Admin/Comment/ListComment"
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
    {
        path: pathName.SALE,
        element: <ListSaleProduct />,
    },
    {
        path: pathName.VOUCHER,
        element: <ListVoucher />,
    },
    {
        path: pathName.COMMENT,
        element: <ListComment />,
    },
    {
        path: pathName.AllORDER,
        element: <ListOrderAdmin />,
    },
    {
        path: pathName.ALLORDERPAID,
        element: <ListOrderPaid />,
    },
    {
        path: pathName.ALLORDERPENDING,
        element: <ListOrderPending />,
    },
    {
        path: pathName.ALLORDERCONFIRM,
        element: <ListOrderConFirm />,
    },
    {
        path: pathName.ALLORDERSHIPPING,
        element: <ListOrderSiping />,
    },
    {
        path: pathName.ALLORDERDONE,
        element: <ListOrderDones />,
    },
    {
        path: pathName.ALLORDERCANCEL,
        element: <ListOrderCancel />,
    },
]
