

const ProductInTopProduct = ({data}:any) => {
    return (
        <>
            {data?.map((data1:any,index:any)=>{
                return (
                    
                        <div className="flex p-2" key={index+1}>
                            <div className='w-16 border '>
                                <span>{index+1 }</span>
                            </div>
                            <div className='w-24 border h-24 '>
                                <img src={data1?.image} alt="" style={{textAlign:'center', alignItems:'center', width:'100%' , height:'100%'}} />
                            </div>
                            <div className=' w-2/3 border flex justify-center items-center flex-col'>
                            <span className='font-bold text-sm'>{data1?.product_name?.length > 30 ? `${data1?.product_name?.slice(0, 30)}` : data1?.product_name}</span>
                            </div>
                            <div className=' w-1/3 border flex justify-center items-center flex-col'>
                                <span className='font-bold text-sm'>{data1?.sold_count} lượt bán</span>
                            </div>
                        </div> 
                )
            })}
        </>
    )
}

export default ProductInTopProduct