import { getAllProduct } from '@/api/services/ProductService'
import { getAllSale } from '@/api/services/Sale'
import { Button, Select, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {}

const ListSaleProduct = (props: Props) => {
    const [products, setproduct] = useState<any>()
    useEffect(() => {
        const fetchPro = async () => {
            const product = await getAllProduct()
            setproduct(product)
        }
        fetchPro()
    }, [])
    const [sales, setsale] = useState<any>()
    useEffect(() => {
        const fetchPro = async () => {
            const sale = await getAllSale()
            setsale(sale)
        }
        fetchPro()
    }, [])
    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Sale',
            key: 'sale',
            render: () => (
                <>
                    <Select
                        defaultValue="Chọn Giảm giá"
                        style={{ width: 160 }}
                        // onChange={handleChange}
                        options={sales?.map((data: any) => ({ value: data?.name, label: `Giảm giá ${data?.name}%` }))}
                    />
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Button size="middle">
                    Update
                </Button>
            ),
        },
    ];
    console.log(sales);

    const data: any = products?.map((data: any) => ({
        key: data?.id,
        id: data?.id,
        name: data?.name,
        price: data?.variants[0]?.price,

    }))
    return (
        <>
            <div className="w-full border border-gray-300">
                <Table columns={columns} dataSource={data} pagination={false}/>
            </div>
        </>
    )
}

export default ListSaleProduct