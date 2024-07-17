import { useEffect, useState } from 'react'
import {  getDoanhThuDay, getDoanhThuMonth, getDoanhThuWeek } from '@/api/services/Dashboard'
import formatNumber from '@/utilities/FormatTotal';
import { Dropdown, Menu } from 'antd';
import User from './User';
import Order from './Order';

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
    return (
        <>
            <div className='flex ml-auto mb-2'>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
                    <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                            <p className="text-uppercase font-medium text-gray-500 truncate mb-0">Doanh số ({!day && !week && !month && (
                                `ngày`
                            )}{ day && (
                               `ngày`
                            )}
                                {week && (
                                    `tuần`
                                )}
                                {month && (
                                    `tháng`
                                )})</p>
                        </div>
                        <div className="flex-shrink-0">
                            <h5 className="text-green-500 text-sm mb-0">
                                {/* <i className="ri-arrow-right-up-line text-xs align-middle"></i> +16.24 % */}
                                <Dropdown overlay={menu} trigger={['click']} >
                                    <i className=" ri-more-2-fill text-black"></i>
                                </Dropdown>
                            </h5>
                        </div>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <h4 className="text-2xl font-semibold mb-4"> {!day && !week && !month && (
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
                                )}</h4>
                            {/* <a href="#" className="text-blue-500 underline">View net earnings</a> */}
                        </div>
                        <div className="flex-shrink-0">
                            <span className="inline-block p-2 bg-green-100 rounded text-green-500">
                                <i className="bx bx-dollar-circle text-xl"></i>
                            </span>
                        </div>
                    </div>
                </div>

               <Order/>

               <User/>

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
                            <h4 className="text-2xl font-semibold mb-4"> {!day && !week && !month && (
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
                                )}</h4>
                            {/* <a href="#" className="text-blue-500 underline">Withdraw money</a> */}
                        </div>
                        <div className="flex-shrink-0">
                            <span className="inline-block p-2 bg-blue-100 rounded text-blue-500">
                                <i className="bx bx-wallet text-xl"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataDay