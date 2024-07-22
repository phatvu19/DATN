import { getAllBill } from "@/api/services/Bill"
import { Dropdown, Menu } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Order = () => {
    const [order, setorder] = useState<any>()
    useEffect(() => {
        const fetchOrder = async () => {
            const response = await getAllBill()
            setorder(response);

        }
        fetchOrder()
    }, [])
    const handleMenuClick = (e:any) => {
        console.log('Click on menu item:', e.key);
        // Xử lý lựa chọn menu tại đây
    };
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Ngày</Menu.Item>
            <Menu.Item key="2">Tuần</Menu.Item>
            <Menu.Item key="3">Tháng</Menu.Item>
        </Menu>
    );
  return (
    <>
          <div className="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
              <div className="flex items-center">
                  <div className="flex-grow overflow-hidden">
                      <p className="text-uppercase font-medium text-gray-500 truncate mb-0">Đơn hàng</p>
                  </div>
                  <div className="flex-shrink-0">
                      <h5 className="text-red-500 text-sm mb-0">
                          <Dropdown overlay={menu} trigger={['click']}>
                              <i className=" ri-more-2-fill text-black"></i> 
                          </Dropdown>
                      </h5>
                  </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                  <div>
                      <h4 className="text-2xl font-semibold mb-4">{order ? order?.length :0}
                          </h4>
                      <Link to="/admin/quan-ly-orders" className="text-blue-500 underline">View all orders</Link>
                  </div>
                  <div className="flex-shrink-0">
                      <span className="inline-block p-2 bg-blue-100 rounded text-blue-500">
                          <i className="bx bx-shopping-bag text-xl"></i>
                      </span>
                  </div>
              </div>
          </div>
    </>
  )
}

export default Order