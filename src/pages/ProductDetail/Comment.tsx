import { AddComment, getAllComment } from "@/api/services/Comment"
import { Button, Flex, Input, Rate } from "antd"
import { useEffect, useState } from "react"
import UserInComment from "./UserInComment"
import { toast } from "react-toastify"
import { GetBillWithUser, getBillDetail, getDetailBillDetail1 } from "@/api/services/Bill"


const Comment = ({ data, name }: any) => {
    console.log(name);

    const [cmt, setcmt] = useState<any>()
    const [value, setvalue] = useState<any>()
    const [check, setchek] = useState<any>()
    const [billdetail, setbilldetail] = useState<any>()
    const [arr, setArr] = useState<any>();
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
            const response = await GetBillWithUser(user?.data?.id)
            setbilldetail(response)
        }
        FetchCmt()
    }, [user?.data?.id])

    console.log(billdetail);
    // useEffect(() => {
    //     const fetchBillDetails = async () => {
    //         if (billdetail?.data) {
    //             const billDetailsPromises = billdetail?.data.map(async (data: any) => {
    //                 const data1 = {
    //                     id: data?.id,
    //                     token: user?.token,
    //                 };
    //                 const response = await getBillDetail(data1);
                 
                    
    //                 return response;
    //             });

    //             const billDetails: any = await Promise.all(billDetailsPromises);

    //             const response = billDetails?.map(async (data: any) => {

    //                 const response1 = await getDetailBillDetail1(data.id);
    //                 return response1;
    //             })
    //             const billDetails1: any = await Promise.all(response);
    //             const response1 = billDetails1?.find(async (data: any) => data?.original[0]?.product_name == name)
    //             setArr(response1);
    //         }
    //     };

    //     fetchBillDetails();
    // }, [user?.data?.id]);


    const [star, setstar] = useState<any>()
    const HandekeVote = (data: any) => {
        setstar(data);
    }

    const HandleCmt = async () => {
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
        if (billdetail?.data) {
            const billDetailsPromises = billdetail?.data.map(async (data: any) => {
                const data1 = {
                    id: data?.id,
                    token: user?.token,
                };
                const response = await getBillDetail(data1);


                return response;
            });

            const billDetails: any = await Promise.all(billDetailsPromises);

            const responsea = billDetails?.map(async (data: any) => {

                const response1 = await getDetailBillDetail1(data.id);
                return response1;
            })
            const billDetails1: any = await Promise.all(responsea);
            const response1 = billDetails1?.find(async (data: any) => data?.original[0]?.product_name == name)

            const data1 = {
                id: response1?.original[0]?.bill_id,
                token: user?.token
            }
            const response = await getBillDetail(data1);
            console.log(response);
            
            if (response?.user_id === user?.data?.id) {
                if (response?.status == "Done") {
                    if(!star){
                        return toast.error('Hãy chọn sao!')
                    }
                    const data2 = {
                        token: user?.token,
                        user_id: user?.data?.id,
                        product_id: data,
                        description: `${star} ; ${value}`
                    }
                    const responseAddComment = await AddComment(data2);
                    setchek(responseAddComment);
                    toast.success('Thành công!');
                    setvalue("");
                } else {
                    toast.error('Bạn cần mua sản phẩm này hoặc đơn hàng chưa hoàn thiện!');
                    setvalue("");
                    return
                }
            } else {
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
                    const parts = data1?.description.split(';');

                    // Trim whitespace from each part
                    const numberPart = parts[0].trim();
                    const textPart = parts[1] ? parts[1].trim() : '';
                    
                    return (
                        <>
                            <div>
                                <UserInComment user_id={data1?.user_id} date={data1?.created_at?.slice(0, 10)} />

                                <div className="ml-14 w-full ">
                                    <Rate disabled defaultValue={numberPart}/>
                                    <p className="mt-4 text-sm w-5/6 break-words ">
                                        {textPart}
                                    </p>

                                </div>

                                <hr className="my-4 w-full transform border-t border-dashed border-gray-400 " />
                            </div>
                        </>
                    )
                }) : ""}



                {user ? <div className="flex">
                    <Flex gap="middle" className="w-1/4 py-2 " >
                        <Rate defaultValue={1} onChange={HandekeVote} />
                    </Flex>
                    <Input type="text" className="flex-grow py-2 px-4 border border-gray-300 rounded" aria-label="Recipient's username" onChange={(e: any) => setvalue(e.target.value)} value={value} />
                    <button className="bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white  py-2 px-4 rounded ml-2" type="button" id="button-addon2" onClick={() => HandleCmt()}>Đăng</button>
                </div> : ""}


            </div>
        </>
    )
}

export default Comment