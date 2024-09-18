
import { Button, Result } from 'antd';
import ProductInSearch from './ProductInSearch';

const SearchHearder = ({ data }: any) => {
    return (
        <>
            {data.length > 0 ? <>
                <div className="pl-36 pr-36 p-10">
                    <div className="pb-12 pt-16 text-lg">
                        <a href="#">Trang chủ</a> |
                        <a className="font-bold">Search</a>
                    </div>
                    <div className="flex">
                        
                        <div className=" px-8">
                            <div className="">
                                <div className="">
                                    <h1 className="text-xl font-bold ">
                                        Danh sách sản phẩm search
                                    </h1>
                                </div>
                            </div>
                            <div className="pt-4"></div>
                            <hr className=" border-dashed border-gray-300 " />

                            <div className="row row-gap-4 mt-3">
                                <div className="grid  grid-cols-5 ">
                                    {data?.map((data: any) => {
                                        return (
                                            <>
                                                <ProductInSearch
                                                    data={data}
                                                    key={data?.id}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </> :
                <Result
                    status="404"
                    // title="204"
                    subTitle="Xin lỗi, không tìm thấy sản phẩm"
                    extra={<a href={'/'}><Button type="primary">Back Home</Button></a>}
                />
            }
        </>
    )
}

export default SearchHearder