import { useEffect, useState } from 'react'
import Pay from './Pay'
import Categories from './Categories'
import { getDoanhThuDay, getDoanhThuMonth, getDoanhThuWeek } from '@/api/services/Dashboard'
import formatNumber from '@/utilities/FormatTotal';

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
    
    return (
        <>
            <div className="flex ">
                <div className="w-3/5 border border-gray-400 p-4">
                    <span className='flex font-bold text-sm'>Dữ Liệu Ngày Hôm Nay   <select
                        className='ml-auto p-2 border border-gray-300 rounded'
                        defaultValue="Ngày"
                        style={{ width: 120 }}
                        onChange={(e) => {
                            if (e.target.value === 'Ngày') handleChangeDay();
                            if (e.target.value === 'Tuần') handleChangeWeek();
                            if (e.target.value === 'Tháng') handleChangeMonth();
                        }}
                    >
                        <option value="Ngày">Ngày</option>
                        <option value="Tuần">Tuần</option>
                        <option value="Tháng">Tháng</option>
                    </select>

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