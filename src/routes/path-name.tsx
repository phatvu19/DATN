export const pathName = {
    LOGIN: "/dang-nhap",
    REGISTER: "/dang-ki",
    FORGOT_PASSWORD: "/quen-mat-khau",
    RESET_PASSWORD: "/doi-mat-khau",
    VERIFY_REGISTER: "/verify-register",
    HOME: "/",
    PRODUCTS: "/products",
    SALES: "/sales",
    CART: "/cart",
    CHECKOUT: "/checkout",
    PRODUCT_DETAIL: "/products/:id",
    ORDERS: "/orders",
    ORDERS_DETAIL: "/orders/:id",
    ORDERS_DONE: "/order_done/:id",
    TINTUC:"/tintuc",
    LIENHE: "/lienhe",
    CHECKOUTNOW: "/checkoutnow",
    PROFILE: "/profile",

    // ADMIN PATH
    DASHBOARD: "thong-ke",
    CATEGORIES: "quan-ly-danh-muc",
    PRODUCT_MANAGEMENT: "quan-ly-san-pham",
    VARIANT_MANAGEMENT: "quan-ly-san-pham/bien-the",
    ADD_PRODUCT: "quan-ly-san-pham/them",
    UPDATE_PRODUCT: "quan-ly-san-pham/sua/:id",
    USER_MANAGEMENT: "quan-ly-nguoi-dung",
    ADD_USER: "quan-ly-nguoi-dung/them",
    UPDATE_USER: "quan-ly-nguoi-dung/sua/:id",
    ORDER_MANAGEMENT: "quan-ly-orders",
    ORDER_DETAIL_MANAGEMENT: "quan-ly-orders/:id",
    ATTR_MANAGEMENT: "quan-ly-attr",
    SALE: "quan-ly-sale",
    VOUCHER:"voucher",
    COMMENT: 'comment' ,
    AllORDER:'orders/all',
    ALLORDERPAID:'orders/paid',
    ALLORDERPENDING: 'orders/pending',
    ALLORDERCONFIRM: 'orders/confirm',
    ALLORDERSHIPPING: 'orders/shipping',
    ALLORDERDONE: 'orders/done',
    ALLORDERCANCEL: 'orders/cancel',
} as const
