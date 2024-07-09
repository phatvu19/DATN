import React from 'react'
import OrderIn7Day from './OrderIn7Day'

type Props = {}

const OrderDay = (props: Props) => {
  return (
    <>
          <div className="flex ">
              <div className="w-3/5 border border-gray-400 p-4">
                  <span className='font-bold text-sm'>Đơn Hàng Ngày Hôm Nay</span>
                  <div className="flex w-full">
                      <div className="w-1/3 p-10 flex justify-center items-center flex-col">
                          <p className='font-bold text-xl p-2'>0</p>
                          <span> Chờ Xác Nhận</span>
                      </div>
                      <div className="w-1/3 p-10  flex justify-center items-center flex-col">
                          <p className='font-bold text-xl p-2'>0</p>
                          <span>Đang Chờ Vận Chuyển</span>
                      </div>
                      <div className="w-1/3 p-10  flex justify-center items-center flex-col">
                          <p className='font-bold text-xl p-2'>0</p>
                          <span>Đơn Hàng Hoàn Tất</span>
                      </div>
                  </div>
              </div>
              <div className="w-2/5 border border-black ml-4">
                  <OrderIn7Day />
              </div>
           
          </div>
    </>
  )
}

export default OrderDay