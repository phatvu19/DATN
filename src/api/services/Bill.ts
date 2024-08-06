import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"
import { toast } from "react-toastify"
const addBill = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            "/bills",
            data,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const addBillDetail = async (data1: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            `/admin/bill-details`,
            data1,
            {
                headers: {
                    Authorization: `Bearer ${data1?.token}`,
                },
            },
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const getAllBill = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get("/bills")
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}
const getBillDetail = async (data1: any) => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills/${data1?.id}`, {
                headers: {
                    Authorization: `Bearer ${data1?.token}`,
                },
            })
        return response.data?.data?.data ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch orders. Please try again later.")
        return []
    }
}
const getAllBillDetail = async (token: any) => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/admin/bill-details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}
const getDetailBillDetail = async (data: any) => {
    try {
        const response =
            await httpRequest.get(`/admin/bill-details/${data?.id}`, {
                headers: {
                    Authorization: `Bearer ${data?.token}`,
                },
            })
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}
const getDetailBillDetail1 = async (id: any) => {
    try {
        const response =
            await httpRequest.get(`/billdetails/by-bill-id/${id}`)
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}
const getBillconfirm = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills-confirm`)
        return response.data?.data?.data ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch orders. Please try again later.")
        return []
    }
}
const getBillPending = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills-pending`)
        return response.data?.data?.data ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch orders. Please try again later.")
        return []
    }
}
const getBillShiping = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills-shiping`)
        return response.data?.data?.data ?? []
    } catch (error) {
        console.error("An error occurred while fetching products")
        toast.error("Failed to fetch orders. Please try again later.")
        return []
    }
}
const getBillDone = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills-done`)
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}
const getBillCancel = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills-cancel`)
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}
const getBillPaid = async () => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills-paid`)
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}

const getBillsDetail = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: { data: any } }> =
            await httpRequest.get(`/bills-with-billDetail/${id}`)
        return response.data?.data?.data ?? []
    } catch (error) {
        return []
    }
}
const updateCancel = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            `/bills-cancel/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const updateConfirm = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            `/bills-confirm/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const updateShiping = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            `/bills-shiping/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const updateDone = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            `/bills-done/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetBillWithUser = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `/bills-with-user/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const addHistoryBills = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.post(
            `/bill-stores`,
            data,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetBillPendingWithUser = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `/bills-with-user-pending/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetBillConfirmWithUser = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `/bills-with-user-confirm/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetBillShipingWithUser = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `/bills-with-user-shiping/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetBillDoneWithUser = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `/bills-with-user-done/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetBillCancelWithUser = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `/bills-with-user-cancel/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const GetBillPaidWithUser = async (id: any) => {
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `/bills-with-user-paid/${id}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}
const SearchBillByPhone = async (data:any)=>{
    try {
        const response: AxiosResponse<{ data: any }> = await httpRequest.get(
            `bills-with-phone/${data}`,
        )
        const createdProduct = response.data?.data
        return createdProduct
    } catch (error) {
        return undefined
    }
}

export {
    addBill,
    getAllBill,
    getBillDetail,
    addBillDetail,
    getAllBillDetail,
    getBillconfirm,
    getBillPending,
    getBillShiping,
    getBillDone,
    getBillCancel,
    getBillPaid,
    updateCancel,
    getBillsDetail,
    updateConfirm,
    updateShiping,
    updateDone,
    GetBillWithUser,
    addHistoryBills,
    GetBillPendingWithUser,
    GetBillConfirmWithUser,
    GetBillShipingWithUser,
    GetBillDoneWithUser,
    GetBillCancelWithUser,
    SearchBillByPhone,
    GetBillPaidWithUser,
    getDetailBillDetail,
    getDetailBillDetail1
}
