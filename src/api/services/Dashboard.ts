
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
const gettrangthaiDay= async () => {
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

export { getDoanhThuDay, gettrangthaiDay, getPayDay, getDoanhThuWeek, getDoanhThuMonth, getDoanhThuYear }
