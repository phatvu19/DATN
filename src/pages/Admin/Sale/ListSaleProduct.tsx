import { getAllProduct } from '@/api/services/ProductService'
import { getAllSale, updateSale } from '@/api/services/Sale'
import { Button, Select, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SaleDetail from './SaleDetail'

type Props = {}

const ListSaleProduct = (props: Props) => {
    const [products, setproduct] = useState<any>()
    const [idSale, setIdsale] = useState<any>()
    useEffect(() => {
        const fetchPro = async () => {
            const product = await getAllProduct()
            setproduct(product)
        }
        fetchPro()
    }, [])

    const handleChange = async (value: any) => {
        setIdsale(value);
    }
    const HandleUpdate = async (id: any) => {
        const data = {
            id: id.id,
            sale_id: {
                sale_id: idSale
            }
        };
        console.log(data);
        await updateSale(data)
        toast.success('Thành công')
    }
    // const saleName = sales?.find(
    //     (item: any) => item?.sale_id == data?.sale_id
    // )?.sale_id;

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
            render: (data: any) => {
                return (
                    <SaleDetail data={data} onValue={handleChange} />
                )

            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (id: any) => (
                <Button size="middle" onClick={() => HandleUpdate(id)}>
                    Update
                </Button>
            ),
        },
    ];

    const data: any = products?.map((data: any) => ({
        key: data?.id,
        id: data?.id,
        name: data?.name,
        price: data?.variants[0]?.price,
        sale_id: data?.sale_id
    }))
    return (
        <>
            <div className="w-full border border-gray-300">
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">#</th>
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="px-6 py-4">Price</th>
                            <th scope="col" className="px-6 py-4">Sale</th>
                            <th scope="col" className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((data: any) => {
                            return (
                                <SaleDetail data={data} key={data?.id}/>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListSaleProduct