import { useEffect, useState } from 'react'
import { FillterMonth, FillterToday, FillterWeek, GetTotalPaid, doanhThu7Day, getDoanhThuDay, getDoanhThuMonth, getDoanhThuWeek } from '@/api/services/Dashboard'
import formatNumber from '@/utilities/FormatTotal';
import { DatePicker, Dropdown, Menu, Modal, Tooltip } from 'antd';
import User from './User';
import Order from './Order';
import { FileSearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DataDay = () => {
    const [doanhsoday, setdoanhsodatyy] = useState<any>()
    const [doanhsoweek, setdoanhsoweek] = useState<any>()
    const [doanhsomonth, setdoanhsomonth] = useState<any>()
    const [totalweek, settotalweek] = useState<any>()
    const [day, setday] = useState<any>(false)
    const [week, setweek] = useState<any>(false)
    const [month, setmonth] = useState<any>(false)
    const [khoangngay, setkhoangngay] = useState<any>(false)
    useEffect(() => {
        const fetch = async () => {
            const data = await FillterToday()
            setdoanhsodatyy(data)
        }
        fetch()
    }, [])
    console.log(doanhsoday);
    
    useEffect(() => {
        const fetch = async () => {
            const data = await FillterWeek()
            settotalweek(data)
        }
        fetch()
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const data = await FillterMonth()
            setdoanhsomonth(data)
        }
        fetch()
    }, [])

    const handleChangeDay = () => {
        setday(true);
        setweek(false);
        setmonth(false);
        setkhoangngay(false);
    };
    const handleChangeWeek = () => {
        setday(false);
        setweek(true);
        setmonth(false);
        setkhoangngay(false);
    };
    const handleChangeMonth = () => {
        setday(false);
        setweek(false);
        setmonth(true);
        setkhoangngay(false)
    };
    const handleBetwenday = () => {
        setIsModalOpen1(true);
        setday(false);
        setweek(false);
        setmonth(false);
        setkhoangngay(true)
    };

    const { RangePicker } = DatePicker;
    const [khoangday, setkhoangday] = useState<any>()
    const onChange1 = async (dates: any, dateStrings: any) => {
        const data = {
            start_date: dateStrings[0],
            end_date: dateStrings[1]
        };
        const response = await doanhThu7Day(data)
        setkhoangday(response);
    };
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const handleOk1 = () => {
        setIsModalOpen1(false);
    };

    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    const menu = (
        <Menu onClick={(e: any) => {
            if (e?.key === 'Ngày') handleChangeDay();
            if (e?.key === 'Tuần') handleChangeWeek();
            if (e?.key === 'Tháng') handleChangeMonth();
        }}>
            <Menu.Item key="Ngày">Ngày</Menu.Item>
            <Menu.Item key="Tuần">Tuần</Menu.Item>
            <Menu.Item key="Tháng">Tháng</Menu.Item>
        </Menu>
    );
    const getPeriodLabel = () => {
        if (day) return 'hôm nay';
        if (week) return 'tuần này';
        if (month) return 'tháng này';
        return 'hôm nay';
    };
    
    const getRevenue = () => {
        if (week) return formatNumber(totalweek?.data?.total_sales_week) + 'đ';
        if (month) return formatNumber(doanhsomonth?.data?.total_sales_week) + 'đ';
        return formatNumber(doanhsoday?.data?.total_sales_today) + 'đ';
    };
    const getRevenuePaid = () => {
        if (week) return formatNumber(totalweek?.data?.online_paid_orders_week) ;
        if (month) return formatNumber(doanhsomonth?.data?.online_paid_orders_week) ;
        return formatNumber(doanhsoday?.data?.online_paid_orders_today);
    };
    const getRevenueOrder = () => {
        if (week) return formatNumber(totalweek?.data?.order_count_week);
        if (month) return formatNumber(doanhsomonth?.data?.order_count_week);
        return formatNumber(doanhsoday?.data?.order_count_today);
    };
    const getRevenuePersion = () => {
        if (week) return formatNumber(totalweek?.data?.new_customers_week);
        if (month) return formatNumber(doanhsomonth?.data?.new_customers_week);
        return formatNumber(doanhsoday?.data?.new_customers_today);
    };

    return (
        <div className="p-4 border rounded border-gray-200 ">
          
            <div className='flex ml-auto mb-4'>
                <h1 className="font-bold text-xl">Dữ liệu {getPeriodLabel()}</h1>
                <Dropdown overlay={menu} trigger={['click']} className=' ml-auto'>
                    <FileSearchOutlined />
                </Dropdown>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
                    <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                            <p className="text-uppercase font-medium text-gray-500 truncate mb-0">
                                Doanh số 
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <h5 className="text-green-500 text-sm mb-0">
                                {/* <i className="ri-arrow-right-up-line text-xs align-middle"></i> +16.24 % */}

                            </h5>
                        </div>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <h4 className="text-2xl font-semibold mb-4">
                                <p className='font-bold text-xl p-2'>{getRevenue()}</p>
                            </h4>
                            {/* <a href="#" className="text-blue-500 underline">View net earnings</a> */}
                        </div>
                        <div className="flex-shrink-0">
                            <span className="inline-block p-2 bg-green-100 rounded text-green-500">
                                <i className="bx bx-dollar-circle text-xl"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <Order data={getRevenueOrder()}/>

                <User data={getRevenuePersion()}/>

                <div className="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
                    <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                            <p className="text-uppercase font-medium text-gray-500 truncate mb-0">Đã thanh toán</p>
                        </div>
                        <div className="flex-shrink-0">
                            {/* <h5 className="text-gray-500 text-sm mb-0">+0.00 %</h5> */}
                        </div>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <h4 className="text-2xl font-semibold mb-4">{getRevenuePaid()}</h4>
                            <Link to="/admin/orders/paid" className="text-blue-500 underline">See details</Link>
                        </div>
                        <div className="flex-shrink-0">
                            <span className="inline-block p-2 bg-blue-100 rounded text-blue-500">
                                <i className="bx bx-wallet text-xl"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataDay