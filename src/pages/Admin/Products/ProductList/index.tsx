import { AttributeValue, Product } from "@/@types/product"
import {
    deleteProduct,
    getAllProduct,
    getProductById,
} from "@/api/services/ProductService"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Descriptions, Input, Modal, Space, Table } from "antd"

import { ColumnGroupType, ColumnType } from "antd/es/table"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProductManagement = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const fetchProducts = async () => {
        const allProducts: Product[] = await getAllProduct()
        setProducts(allProducts)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleRemoveProduct = async (record: Product) => {
        try {
            await deleteProduct(record.id)
            fetchProducts()
        } catch (error) {
            console.error("An error occurred while deleting product:", error)
        }
    }

    const handleUpdate = (id: number) => {
        navigate(`/admin/quan-ly-san-pham/sua/${id}`)
    }

    const handleViewProduct = async (id: number) => {
        const product = await getProductById(id)
        setSelectedProduct(product)
        setIsModalVisible(true)
    }
    const [filter, setfilter] = useState<any>()
    const columns: (ColumnGroupType<Product> | ColumnType<Product>)[] = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            render: (_text: string, _record: Product, index: number) => index + 1,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text, record) => (
                <img
                    src={record.image}
                    style={{ width: "50px", height: "auto" }}
                    alt={text}
                />
            ),
        },
        {
            title: "Danh mục",
            dataIndex: ["category", "name"],
            key: "category_name",
        },
        {
            title: "Thương hiệu",
            dataIndex: "brand",
            key: "brand",
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (_text: string, record: Product) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleRemoveProduct(record)}
                    >
                        Xóa
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleUpdate(record.id)}
                        icon={<ArrowRightOutlined />}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="default"
                        onClick={() => handleViewProduct(record.id)}
                    >
                        Chi tiết
                    </Button>
                </Space>
            ),
        },
    ]
    const variantColumns = [
        {
            title: "Mã số",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Thuộc tính",
            key: "attribute_values",
            render: (record: any) =>
                record.attribute_values.map((attribute: AttributeValue) => (
                    <p key={attribute.id}>{attribute.value}</p>
                )),
        },
    ]

    const { Search } = Input
    const handleSearch = (e: any) => {
        const searchValue = e.toLowerCase()

        if (searchValue === "") {
            setfilter([])
        } else {
            const filter = products?.filter((data: any) =>
                data?.name.toLowerCase().includes(searchValue),
            )
            setfilter(filter)
        }
    }
    console.log(filter)

    return (
        <>
            <Search
                placeholder="Tìm kiếm theo tên sản phẩm"
                onSearch={handleSearch}
                className="m-2 ml-auto flex w-1/4"
            />
            <Table
                columns={columns}
                dataSource={filter?.length > 0 ? filter : products}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            {selectedProduct && (
                <Modal
                    title="Chi tiết sản phẩm"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setIsModalVisible(false)}>
                            Đóng
                        </Button>,
                    ]}
                    width={800}
                >
                    <Descriptions bordered size="middle" column={1}>
                        <Descriptions.Item label="ID">
                            {selectedProduct.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên sản phẩm">
                            {selectedProduct.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Danh mục">
                            {selectedProduct.category.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thương hiệu">
                            {selectedProduct.brand}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả">
                            {selectedProduct.description}
                        </Descriptions.Item>
                    </Descriptions>
                    <Table
                        columns={variantColumns}
                        dataSource={selectedProduct.variants}
                        rowKey="id"
                        pagination={false}
                        style={{ marginTop: 20 }}
                    />
                </Modal>
            )}
        </>
    )
}

export default ProductManagement
