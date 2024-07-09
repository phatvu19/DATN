import React from 'react'
import Pay from './Pay'
import Categories from './Categories'

type Props = {}

const DataDay = (props: Props) => {
    return (
        <>
            <div className="flex ">
                <div className="w-3/5 border border-gray-400 p-4">
                    <span className='font-bold text-sm'>Dữ Liệu Ngày Hôm Nay</span>
                    <div className="flex w-full">
                        <div className="w-1/3 p-10 flex justify-center items-center flex-col">
                            <p className='font-bold text-xl p-2'>0đ</p>
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
                    <Categories/>
                </div>
            </div>
        </>
    )
}

export default DataDay