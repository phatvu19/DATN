import React, { useEffect, useState } from 'react'
import { gettrangthaiDay } from '@/api/services/Dashboard'
import { Link } from 'react-router-dom'

type Props = {}

const OrderDay = () => {
    const [trangthaiday, setdoanhsodatyy] = useState<any>()
console.log(trangthaiday);

    useEffect(() => {
        const fetch = async () => {
            const data = await gettrangthaiDay()
            setdoanhsodatyy(data)
        }
        fetch()
    }, [])
    const trangthaiDone = trangthaiday?.find((data: any) => data?.status == "Shipping")?.total_bill
    const trangthaiPending = trangthaiday?.find((data: any) => data?.status == "Pending")?.total_bill
    const trangthaiConfirm = trangthaiday?.find((data: any) => data?.status == "Confirm")?.total_bill
  return (
    <>
          <div className="col-span-full xl:col-span-9 order-first xl:order-none">
              <div className="flex flex-col h-full">
                  <div className="flex flex-wrap h-full">
                      <div className="lg:w-1/3 md:w-1/2 ">
                          <div className="bg-white shadow rounded-lg">
                              <div className="p-10">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0">
                                          <span className="flex items-center justify-center w-12 h-12 bg-light text-primary rounded-full text-3xl">
                                              <i className="ri-file-list-fill"></i>
                                          </span>
                                      </div>
                                      <div className="flex-grow ml-3">
                                          <p className="text-xs font-semibold text-muted uppercase mb-1">Chờ Xác Nhận</p>
                                          <h4 className="mb-0"><span className="counter-value font-bold text-xl">{trangthaiPending ? trangthaiPending : 0}</span></h4>
                                      </div>
                                      <div className="flex-shrink-0 self-end">
                                          <Link to="/admin/orders/pending" className="bg-success-subtle text-success px-2 py-1 rounded"><i className="ri-arrow-up-s-fill align-middle mr-1"></i>xem</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="lg:w-1/3 md:w-1/2 pr-2 pl-2">
                          <div className="bg-white shadow rounded-lg">
                              <div className="p-10">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0">
                                          <span className="flex items-center justify-center w-12 h-12 bg-light text-primary rounded-full text-3xl">
                                              <i className=" ri-shopping-cart-2-fill"></i>
                                          </span>
                                      </div>
                                      <div className="flex-grow ml-3">
                                          <p className="text-xs font-semibold text-muted uppercase mb-1">Chờ Vận Chuyển</p>
                                          <h4 className="mb-0"><span className="counter-value font-bold text-xl">{trangthaiConfirm ? trangthaiConfirm : 0}</span></h4>
                                      </div>
                                      <div className="flex-shrink-0 self-end">
                                          <Link to="/admin/orders/confirm" className="bg-success-subtle text-success px-2 py-1 rounded"><i className="ri-arrow-up-s-fill align-middle mr-1"></i>xem</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="lg:w-1/3 md:w-1/2 ">
                          <div className="bg-white shadow rounded-lg">
                              <div className="p-10">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0">
                                          <span className="flex items-center justify-center w-12 h-12 bg-light text-primary rounded-full text-3xl">
                                              <i className=" ri-truck-fill"></i>
                                          </span>
                                      </div>
                                      <div className="flex-grow ml-3">
                                          <p className="text-xs font-semibold text-muted uppercase mb-1">Đang vận chuyển</p>
                                          <h4 className="mb-0"><span className="counter-value font-bold text-xl">{trangthaiDone ? trangthaiDone : 0}</span></h4>
                                      </div>
                                      <div className="flex-shrink-0 self-end">
                                          <Link to="/admin/orders/shipping" className="bg-danger-subtle text-danger px-2 py-1 rounded"><i className="ri-arrow-down-s-fill align-middle mr-1"></i>xem</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default OrderDay