import { useEffect, useState } from 'react'
import Pay from './Pay'
import Categories from './Categories'
import { getDoanhThuDay, getDoanhThuMonth, getDoanhThuWeek, getDoanhthuThang } from '@/api/services/Dashboard'
import formatNumber from '@/utilities/FormatTotal';
import { DatePicker, Modal, Select } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts"

const DataDay = () => {
    const [doanhsoday, setdoanhsodatyy] = useState<any>()
    const [doanhsoweek, setdoanhsoweek] = useState<any>()
    const [doanhsomonth, setdoanhsomonth] = useState<any>()
    const [day, setday] = useState<any>(false)
    const [week, setweek] = useState<any>(false)
    const [month, setmonth] = useState<any>(false)
    useEffect(() => {
        const fetch = async () => {
            const data = await getDoanhThuDay()
            setdoanhsodatyy(data)
        }
        fetch()
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const data = await getDoanhThuWeek()
            setdoanhsoweek(data)
        }
        fetch()
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const data = await getDoanhThuMonth()
            setdoanhsomonth(data)
        }
        fetch()
    }, [])
    console.log(doanhsoweek);
    
    const handleChangeDay = () => {
        setday(true);
        setweek(false);
        setmonth(false);
    };
    const handleChangeWeek = () => {
        setday(false);
        setweek(true);
        setmonth(false);
    };
    const handleChangeMonth = () => {
        setday(false);
        setweek(false);
        setmonth(true);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [months,setmonths] = useState<any>()
    const [totalm, settotalm] = useState<any>()
    const [total ,settotal] = useState<any>()
    const [year , setyear] = useState<any>()
    const onChange: any =async (date:any, dateString:any) => {
        
        const month = dateString.split('-')[1];
        setyear(dateString.split('-')[0])
        setmonths(month);
        const data={
            "month": month
        }
        const response = await getDoanhthuThang(data) 
        settotalm(response?.original?.total_revenue)
        settotal(response?.original?.daily_revenues)
    };
    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    };

    const fullMonthData = Array.from({ length: daysInMonth(months, 2024) }, (_, i) => {
        const day = (i + 1).toString();
        const monthData = total?total.find((item: any) => {
            const itemMonth = item?.date.split('-')[1]; 
            return itemMonth == months && item?.date.split('-')[2] == day;
        })?.total_revenue : "";
        return {
            name: `Ngày ${day}`,
            Total: monthData ? formatNumber(monthData) : 0
        };
    });
    
    const data = fullMonthData?.map((data1: any) => ({ "name": data1?.name, "Total": data1?.Total }))
    
    return (
        <>
            <div className="flex ">
                <div className="w-3/5 border border-gray-400 p-4">
                    <span className='flex font-bold text-sm'>Dữ Liệu Ngày Hôm Nay   
                        <div className='ml-auto '>
                    <Select
                        // className='ml-auto '
                        defaultValue="Ngày"
                        style={{ width: 120 }}
                        onChange={(e:any) => {
                            if (e === 'Ngày') handleChangeDay();
                            if (e === 'Tuần') handleChangeWeek();
                            if (e === 'Tháng') handleChangeMonth();
                        }}
                        options={[
                            { value: 'Ngày', label: 'Ngày' },
                            { value: 'Tuần', label: 'Tuần' },
                            { value: 'Tháng', label: 'Tháng' },
                        ]} 
                    />
                   
                            <CalendarOutlined className=" ml-4 p-1.5 border border-gray-300 bg-white rounded " onClick={showModal} />
                            <Modal width={'70%'} title="Doanh thu cả tháng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <DatePicker picker="month" onChange={onChange} className="mb-4"/>
                                <br className='mt-4'/>
                                {!months ? <span className='font-bold text-xl'>Hãy chọn tháng.</span> : <span className=' text-xl'>Doanh thu của {months} là: <span className='font-bold text-xl'>{formatNumber(totalm)}đ </span></span>}
                                {months ? <LineChart width={1050} height={280} data={data}
                                    margin={{ right: 54, left: -20, top: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" style={{ fontSize: '0.8em' }} />
                                    <Tooltip />
                                    <YAxis  style={{ fontSize: '0.8em' }} />
                                    <Line type="monotone" dataKey="Total" stroke="#8884d8" />
                                </LineChart> :""}
                                
                            </Modal>
                        </div>
                    </span>
                    <div className="flex w-full">
                        <div className="w-1/3 p-10 flex justify-center items-center flex-col">
                            {!day && !week && !month && (
                                <p className='font-bold text-xl p-2'>{formatNumber(doanhsoday)}đ</p>
                            )}
                            {day && (
                                <p className='font-bold text-xl p-2'>{formatNumber(doanhsoday)}đ</p>
                            )}
                            {week && (
                                <p className='font-bold text-xl p-2'>{formatNumber(doanhsoweek?.original?.total_revenue)}đ</p>
                            )}
                            {month && (
                                <p className='font-bold text-xl p-2'>{formatNumber(doanhsomonth?.total_revenue)}đ</p>
                            )}
                            <span>Doanh số</span>
                        </div>
                        <div className="w-1/3 p-10  flex justify-center items-center flex-col">
                            <p className='font-bold text-xl p-2'>0</p>
                            <span>Sản Phẩm Đã Bán</span>
                        </div>
                        <div className="w-1/3 p-10  flex justify-center items-center flex-col">
                            <p className='font-bold text-xl p-2'>0</p>
                            <span>Đơn Hàng</span>
                        </div>
                    </div>

                </div>
                <div className="w-1/5 border border-black ml-4">
                    <Pay />
                </div>
                <div className="w-1/5 border border-black ml-2">
                    <Categories />
                </div>
            </div>
        </>
    )
}

export default DataDay