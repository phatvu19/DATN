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
    const findBill = billdetail?.find((c: any) => c?.product_name == name)
    console.log(findBill);

    const HandleCmt = async () => {
        let hasEligibleBill = false;
        if (!value) {
            toast.error('Vui lòng nhập nội dung!')
            setvalue("");
            return
        }
        if (!user) {
            toast.error('Vui lòng đăng nhập!')
            setvalue("");
            return
        }

        if (findBill) {
            const data1 = {
                id: findBill?.bill_id,
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
                }else{
                    toast.error('Bạn cần mua sản phẩm này hoặc đơn hàng chưa hoàn thiện!');
                    setvalue("");
                    return
                }
            }else{
                toast.error('Bạn cần mua sản phẩm này hoặc đơn hàng chưa hoàn thiện!');
                setvalue("");
                return
            }


            // if (!hasEligibleBill) {
            //     toast.error('Bạn cần mua sản phẩm này hoặc đơn hàng chưa hoàn thiện!');
            //     setvalue("");
            // }
        } else {
            toast.error('Bạn chưa mua sản phẩm này.');
        }

    }
    return (
        <>
            <div className="pb-20 pl-80 pr-80 pt-20 w-full">
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
                                <UserInComment user_id={data1?.user_id} date={data1?.created_at?.slice(0, 10)}/>
                              
                                <div className="ml-14 w-full ">

                                    <p className="mt-4 text-sm w-5/6 break-words ">
                                        {data1?.description}
                                    </p>

                                </div>

                                <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                            </div>
                        </>
                    )
                }) : ""}



                {user ? <div className="flex">
                    <Input type="text" className="flex-grow py-2 px-4 border border-gray-300 rounded" aria-label="Recipient's username" onChange={(e: any) => setvalue(e.target.value)} value={value} />
                    <button className="bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white  py-2 px-4 rounded ml-2" type="button" id="button-addon2" onClick={() => HandleCmt()}>Đăng</button>
                </div> : ""}


            </div>
        </>
    )
}

export default Comment