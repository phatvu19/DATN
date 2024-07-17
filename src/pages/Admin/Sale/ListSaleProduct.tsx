import { getAllProduct } from '@/api/services/ProductService'
import { useEffect, useState } from 'react'

import SaleDetail from './SaleDetail'
import { Button, Input, Modal, Select, Table } from 'antd'
import { AddSale, getAllSale } from '@/api/services/Sale'
import { toast } from 'react-toastify'

const ListSaleProduct = () => {
    const [products, setproduct] = useState<any>()
    const [loading, setloading] = useState<any>()
    useEffect(() => {
        const fetchPro = async () => {
            const product = await getAllProduct()
            setproduct(product)
        }
        fetchPro()
    }, [loading])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [value, setvalue] = useState<any>()
    const [code, setcode] = useState<any>()
    const [check, setcher] = useState<any>()

    const load=(value:any)=>{
        setloading(value)
    }
    const showModal = () => {
        setIsModalOpen(true);
    }; const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk = async () => {
        try {
            const data = {
                name: code,
                status: value,
                onLayout: 1
            }
            const response: any = await AddSale(data)
            if (response?.success == true) {
                toast.success("Thêm thành công")
                setIsModalOpen(false);
                setcher(true)
                window.location.href = ("/admin/quan-ly-sale")
            }
        } catch (error) {
            console.error("Failed to add sale", error);
        }

    };
    const handleOk1 = async () => {
        setIsModalOpen1(false);

    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: any) => {
        setvalue(value)
    }
    const onChange = (e: any) => {
        setcode(e?.target?.value);
    };
    const [sales, setsale] = useState<any>()
    useEffect(() => {
        const fetchPro = async () => {
            const sale = await getAllSale()
            setsale(sale)
        }
        fetchPro()
    }, [check])
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status:any) => {
                console.log(status);
                const check1 = status == 1 ? "Bật" : "Tắt";
                return (
                    <>{check1}</>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => (
                <><Button>Sửa</Button></>
            )
        },
    ];
    return (
        <div>
            <Modal title="Thêm mã sale" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <div className="flex">
                    <label className='w-2/5 font-bold ' >Phần trăm giảm giá</label>
                    <Input placeholder="Nhập phần trăm giảm giá" className=' w-3/4' onChange={onChange} type='number' />
                </div>
                <div className="flex mt-4">
                    <label className='w-2/5 font-bold'>Trạng thái</label>
                    <Select className='w-3/4'
                        placeholder="Chọn trạng thái"
                        onChange={handleChange}

                        options={[
                            { value: 0, label: "Tắt" },
                            { value: 1, label: "Bật" }
                        ]}
                    />
                </div>

            </Modal>
            <Modal title="Thêm mã sale" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>

                <Table dataSource={sales} columns={columns} pagination={false} />

            </Modal>
            <Button className="mb-2" onClick={showModal}>Thêm mã sale</Button>
            <Button className="mb-2 ml-2" onClick={showModal1}>Danh sách sale</Button>
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
                        {products?.map((data: any,index:any) => {
                            return (
                                <SaleDetail key={index+1} data={data} check={check} onLoad={load}/>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListSaleProduct