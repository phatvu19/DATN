import { Pagination } from "antd"
import { useState } from "react"
import ProductInAllOrderInListOrder from "./ProductInAllOrderInListOrder"

const AllOrderInListOrder = ({ data }: any) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data?.data
        ? data?.data?.slice(indexOfFirstItem, indexOfLastItem)
        : ""

    const handlePageChange = (page: any) => {
        setCurrentPage(page)
    }

    return (
        <>
            {currentItems
                ? currentItems?.map((data: any) => {
                      return (
                          <>
                              <ProductInAllOrderInListOrder data={data} />
                          </>
                      )
                  })
                : ""}

            <div className="mt-5 flex items-center justify-center">
                <Pagination
                    current={currentPage}
                    total={data?.data?.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default AllOrderInListOrder
