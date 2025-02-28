import Cart from "@/pages/Cart/Cart"
import CheckOut from "@/pages/CheckOut/CheckOut"
import CheckOutNow from "@/pages/CheckoutNow/CheckOutNow"
import HomePage from "@/pages/HomePage/HomePage"
import { default as LienHe, default as ListTinTuc } from "@/pages/LieHe/ListTinTuc"
import ListProduct from "@/pages/ListProduct/ListProduct"
import ListProductSale from "@/pages/ListProductSale/ListProductSale"
import LoginPage from "@/pages/LoginPage/LoginPage"
import ListOrder from "@/pages/Order/ListOrder"
import OrderDetail from "@/pages/OrderDetail/OrderDetail"
import OrderDone from "@/pages/OrderDone/OrderDone"
import ProductDetail from "@/pages/ProductDetail/ProductDetail"
import Profile from "@/pages/Profile/Profile"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"
import { pathName } from "@/routes/path-name"

export const UnAuthRouter = [
    {
        path: pathName.LOGIN,
        element: <LoginPage />,
    },
    {
        path: pathName.REGISTER,
        element: <RegisterPage />,
    },
    {
        path: pathName.HOME,
        element: <HomePage />,
    },
    {
        path: pathName.PRODUCTS,
        element: <ListProduct />,
    },
    {
        path: pathName.SALES,
        element: <ListProductSale />,
    },
    {
        path: pathName.CART,
        element: <Cart />,
    },
    {
        path: pathName.CHECKOUT,
        element: <CheckOut />,
    },
    {
        path: pathName.PRODUCT_DETAIL,
        element: <ProductDetail />,
    },
    {
        path: pathName.ORDERS,
        element: <ListOrder />,
    },
    {
        path: pathName.ORDERS_DETAIL,
        element: <OrderDetail />,
    },
    {
        path: pathName.ORDERS_DONE,
        element: <OrderDone />,
    },
    {
        path: pathName.TINTUC,
        element: <ListTinTuc />,
    },
    {
        path: pathName.LIENHE,
        element: <LienHe />,
    },
    {
        path: pathName.CHECKOUTNOW,
        element: <CheckOutNow />,
    },
    {
        path: pathName.PROFILE,
        element: <Profile />,
    },
]
