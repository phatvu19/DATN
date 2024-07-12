import React from 'react'

type Props = {}

const ProductInTopProduct = ({data}:any) => {
    return (
        <>
            {data?.map((data1:any,index:any)=>{
                return (
                    <>
                        <div className="flex p-2">
                            <div className='w-16 border '>
                                <span>{index+1 }</span>
                            </div>
                            <div className='w-16 border '>
                                <img src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17205122836764534.png&w=1920&q=75" alt="" className='' />
                            </div>
                            <div className=' w-2/3 border flex justify-center items-center flex-col'>
                                <span className='font-bold text-sm'>{data1?.product_name}</span>
                            </div>
                            <div className=' w-1/3 border flex justify-center items-center flex-col'>
                                <span className='font-bold text-sm'>{data1?.sold_count} lượt bán</span>
                            </div>
                        </div>
                        </>
                )
            })}
        </>
    )
}

export default ProductInTopProduct