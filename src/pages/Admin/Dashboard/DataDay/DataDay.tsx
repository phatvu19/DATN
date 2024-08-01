import { useEffect, useState } from 'react'
import { GetTotalPaid, doanhThu7Day, getDoanhThuDay, getDoanhThuMonth, getDoanhThuWeek } from '@/api/services/Dashboard'
import formatNumber from '@/utilities/FormatTotal';
import { DatePicker, Dropdown, Menu, Modal, Tooltip } from 'antd';
import User from './User';
import Order from './Order';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import moment from 'moment';

const DataDay = () => {
    const [doanhsoday, setdoanhsodatyy] = useState<any>()
    const [doanhsoweek, setdoanhsoweek] = useState<any>()
    const [doanhsomonth, setdoanhsomonth] = useState<any>()
    const [totalpaid, settotalpaid] = useState<any>()
    const [day, setday] = useState<any>(false)
    const [week, setweek] = useState<any>(false)
    const [month, setmonth] = useState<any>(false)
    const [khoangngay, setkhoangngay] = useState<any>(false)
    useEffect(() => {
        const fetch = async () => {
            const data = await getDoanhThuDay()
            setdoanhsodatyy(data)
        }
        fetch()
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const data = await GetTotalPaid()
            settotalpaid(data)
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
            if (e?.key === 'Day') handleBetwenday();
        }}>
            <Menu.Item key="Ngày">Ngày</Menu.Item>
            <Menu.Item key="Tuần">Tuần</Menu.Item>
            <Menu.Item key="Tháng">Tháng</Menu.Item>
            <Menu.Item key="Day"> More </Menu.Item>
        </Menu>
    );
    const getPeriodLabel = () => {
        if (day) return 'ngày';
        if (week) return 'tuần';
        if (month) return 'tháng';
        if (khoangday) return 'khoảng ngày';
        return 'ngày';
    };
    const getRevenue = () => {
        if (week) return formatNumber(doanhsoweek?.original?.total_revenue) + 'đ';
        if (month) return formatNumber(doanhsomonth?.total_revenue) + 'đ';
        if (khoangday) return formatNumber(khoangday?.original?.total_revenue) + 'đ';
        return formatNumber(doanhsoday) + 'đ';
    };
    return (
        <>
            <Modal width={'70%'} title="Doanh thu theo khoảng ngày" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                <RangePicker onChange={onChange1} />
            </Modal>
            <div className='flex ml-auto mb-2'>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
                    <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                            <p className="text-uppercase font-medium text-gray-500 truncate mb-0">
                                Doanh số ({getPeriodLabel()})
                            </p>
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

                <Order />

                <User />

                <div className="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
                    <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                            <p className="text-uppercase font-medium text-gray-500 truncate mb-0">Đã trả tiền (ONLINE trong ngày)</p>
                        </div>
                        <div className="flex-shrink-0">
                            {/* <h5 className="text-gray-500 text-sm mb-0">+0.00 %</h5> */}
                        </div>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <h4 className="text-2xl font-semibold mb-4">{totalpaid?.total_revenue ? formatNumber(totalpaid?.total_revenue) : 0} đ</h4>

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