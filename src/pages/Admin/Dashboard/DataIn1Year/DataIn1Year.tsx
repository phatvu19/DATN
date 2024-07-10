import { getDoanhThuYear } from "@/api/services/Dashboard";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
const DataIn1Year = () => {
    const formatCurrency = (value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const [doanhsoyear, setdoanhsodatyy] = useState<any>()
    useEffect(() => {
        const fetch = async () => {
            const data = await getDoanhThuYear()
            setdoanhsodatyy(data)
        }
        fetch()
    }, [])
    const fullYearData = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString();
        const monthData = doanhsoyear?.monthly_revenues?.find((item: any) => item.month == month)?.total_revenue
        return {
            name: month,
            Total: monthData ? monthData : 0
        };
    });

    return (
        <>
            <div className="flex ">
                <div className="w-full border border-gray-400 p-4">
                    <span className='font-bold text-sm'>Doanh Thu Trong 1 Năm</span>
                    <BarChart width={1100} height={350} data={fullYearData} className="mt-8" >
                        <CartesianGrid strokeDasharray="5" />
                        <XAxis dataKey="name" style={{ fontSize: '1em' }} />
                        <YAxis style={{ fontSize: '0.8em' }} />
                        <Tooltip formatter={formatCurrency} />
                        <Bar dataKey="Total" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </>
    )
}

export default DataIn1Year