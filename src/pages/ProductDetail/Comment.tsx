import { AddComment, getAllComment } from "@/api/services/Comment"
import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import UserInComment from "./UserInComment"
import { toast } from "react-toastify"
import { getAllBillDetail, getBillDetail } from "@/api/services/Bill"


const Comment = ({ data, name }: any) => {
    const [cmt, setcmt] = useState<any>()
    const [value, setvalue] = useState<any>()
    const [check, setchek] = useState<any>()
    const [billdetail, setbilldetail] = useState<any>()
    useEffect(() => {
        const FetchCmt = async () => {
            const response = await getAllComment()
            setcmt(response)
        }
        FetchCmt()
    }, [check])
    const user = JSON.parse(localStorage.getItem('user')!)
    const comment = cmt?.categories?.filter((c: any) => c?.product_id == data)
    const checkcmt = cmt?.categories?.find((c: any) => c?.user_id == user?.data?.id && c?.product_id == data)
    useEffect(() => {
        const FetchCmt = async () => {
            const response = await getAllBillDetail(user?.token)
            setbilldetail(response)
        }
        FetchCmt()
    }, [])
    const findBill = billdetail?.filter((c: any) => c?.product_name == name)

    const HandleCmt = async () => {
        let hasEligibleBill = false;
        if (!value) {
            toast.error('Vui lòng nhập nội dung!')
            return
        }
        if (!user) {
            toast.error('Vui lòng đăng nhập!')
            return
        }
        if (checkcmt) {
            toast.error('Mỗi người chỉ được đánh giá 1 lần!')
            return
        }

        if (Array.isArray(findBill)) {
            const promises = findBill.map(async (item: any) => {
                const data1 = {
                    id: item?.bill_id,
                    token: user?.token
                }
                const response = await getBillDetail(data1);
                if (response?.user_id === user?.data?.id) {
                    if (response?.status === "Done") {
                        const data2 = {
                            token: user?.token,
                            user_id: user?.data?.id,
                            product_id: data,
                            description: value
                        }
                        const responseAddComment = await AddComment(data2);
                        setchek(responseAddComment);
                        toast.success('Thành công!');
                        setvalue("");
                        hasEligibleBill = true;
                    }
                }
            });

            await Promise.all(promises);

            if (!hasEligibleBill) {
                toast.error('Bạn cần mua sản phẩm này hoặc đơn hàng chưa hoàn thiện!');
                setvalue("");
            }
        } else {
            toast.error('Bạn chưa mua sản phẩm này.');
        }

    }
    return (
        <>
            <div className=" pb-20 pl-40 pr-40">
                <span className="text-sl font-bold">ĐÁNH GIÁ TỪ NGƯỜI MUA</span>
                <hr className="my-4  w-full border-t border-dashed border-gray-400" />
                <div className="flex">
                    <div style={{ textAlign: "center" }} className="w-1/6">
                    </div>
                </div>
                {comment ? comment?.map((data1: any) => {
                    return (
                        <>
                            <div>
                                <UserInComment user_id={data1?.user_id} />
                                <div className="ml-14 flex flex-col">

                                    <span className="mt-4 text-sm">
                                        {data1?.description}
                                    </span>

                                </div>

                                <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                            </div>
                        </>
                    )
                }) : ""}

                <Input placeholder="Nhập nội dung" className="w-1/2" onChange={(e: any) => setvalue(e.target.value)} value={value} /><Button type="primary" className="ml-2" onClick={() => HandleCmt()}>Đăng</Button>

            </div>
        </>
    )
}

export default Comment