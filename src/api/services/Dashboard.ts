
import httpRequest from "@/api/axios-instance"
import { AxiosResponse } from "axios"

const getDoanhThuDay = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("revenue-by-day")
        return response?.data?.data?.data?.total_revenue
    } catch (error) {
        return []
    }
}
const gettrangthaiDay = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("status-by-day")
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const getPayDay = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("count-pay")
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const getDoanhThuWeek = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("revenue-week-by-day")
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const getDoanhThuMonth = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("revenue-by-month-with-week")
        return response?.data?.data?.data?.original
    } catch (error) {
        return []
    }
}
const getDoanhThuYear = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get("revenue-by-year-now")
        return response?.data?.data?.data?.original
    } catch (error) {
        return []
    }
}
const getProductTop = async (top: any) => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`top-product/${top}`)
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const getDoanhthuThang = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.post(`revenue-by-month`, data)
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const getUserTop = async (top: any) => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`top-user/${top}`)
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const doanhThu7Day = async (data: any) => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.post(`revenue-by-between-date`, data)
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const ProInCategory = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`revenue-category`)
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const OrderInDay = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`revenue-sevent-last-day`)
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const GetTotalPaid = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`revenue-paid-by-day`)
        return response?.data?.data?.data
    } catch (error) {
        return []
    }
}
const FillterToday = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`revenue-today`)
        return response?.data?.data
    } catch (error) {
        return []
    }
}
const FillterWeek = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`revenue-week`)
        return response?.data?.data
    } catch (error) {
        return []
    }
}
const FillterMonth = async () => {
    try {
        const response: AxiosResponse<{ data: any }> =
            await httpRequest.get(`revenue-month`)
        return response?.data?.data
    } catch (error) {
        return []
    }
}

export { getDoanhThuDay, getUserTop, gettrangthaiDay, getPayDay, getDoanhThuWeek, getDoanhThuMonth, getDoanhThuYear, getProductTop, getDoanhthuThang, doanhThu7Day, ProInCategory, OrderInDay, GetTotalPaid, FillterToday, FillterWeek, FillterMonth }
