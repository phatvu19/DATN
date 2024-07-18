import { RemoveVoucher, addVoucher, getAllVoucher } from "@/api/services/Voucher"
import { Button, Dropdown, Form, Input, Menu, Modal, Popconfirm } from "antd"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import formatNumber from '@/utilities/FormatTotal';


const ListVoucher = () => {
    const [vouchers, setvouchers] = useState<any>()
    const [namevoucher, setnamevoucher] = useState<any>()
    const [discountvoucher, setdiscountvoucher] = useState<any>()
    const [limitvoucher, setlimitvoucher] = useState<any>()
    const [check, setcheck] = useState<any>()
    useEffect(() => {
        const fetchVoucher = async () => {
            const response = await getAllVoucher()
            setvouchers(response)
        }
        fetchVoucher()
    }, [check])
    const formRef: any = useRef(null)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        if (!namevoucher || !discountvoucher || !limitvoucher) {
            return;
        }
        const data = {
            voucher_code: namevoucher,
            expiration_date: "2025-07-20",
            discount_amount: discountvoucher,
            minimum_purchase: 100,
            status: 1,
            usage_limit: limitvoucher,
            description: "voucher"
        }
        const response = await addVoucher(data)
        if (response) {
            setIsModalOpen(false);
            setcheck(response)
            toast.success('Thành công')
            setTimeout(() => {
                window.location.reload();
            }, 300);

        }


    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const HandleDelete = async (id: any) => {
        const response = await RemoveVoucher(id)
        toast.success('Thành công')
        setcheck(response)
    }
    return (
        <>
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out mb-2" onClick={showModal}>Thêm</button>
            <Modal title="Thêm voucher" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form ref={formRef} >
                    <Form.Item
                        name="voucher_code"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Không được để trống tên ",
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Nhập tên voucher" onChange={(e: any) => setnamevoucher(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name="discount_amount"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Không được để trống phần trăm ",
                            },
                        ]}
                    >
                        <Input type="number" placeholder="Phần trăm giảm giá" onChange={(e: any) => setdiscountvoucher(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name="usage_limit"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Không được để trống giới hạn ",
                            },
                        ]}
                    >
                        <Input type="number" placeholder="Giới hạn sử dụng voucher" onChange={(e: any) => setlimitvoucher(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher code</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phần trăm giảm</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {vouchers ? vouchers?.data?.map((data: any) => {
                        return (
                            <>
                                <tr key={data.id}>
                                    <td className="px-6 py-4 whitespace-nowrap"><a href="#" className="font-semibold text-blue-600">#{data?.id}</a></td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data?.voucher_code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data?.usage_limit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatNumber(data?.discount_amount)}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap">    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa?"
                                        onConfirm={() => HandleDelete(data?.id)}
                                        // onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    ><Button>Xóa</Button>
                                    </Popconfirm></td>
                                </tr>
                            </>
                        )
                    }) : ""}
                </tbody>
            </table>

        </>
    )
}

export default ListVoucher