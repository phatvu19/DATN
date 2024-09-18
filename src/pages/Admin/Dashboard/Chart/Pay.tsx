import { getPayDay } from '@/api/services/Dashboard';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';


const Pay = () => {
    const [payday, setdoanhsodatyy] = useState<any>()
    useEffect(() => {
        const fetch = async () => {
            const data = await getPayDay()
            setdoanhsodatyy(data)
        }
        fetch()
    }, [])
    console.log(payday);
    
    const series = payday ? payday?.map((data: any) => (data?.total_pay)) : ''
    const options: any = {
        chart: {
            type: 'pie',
        },
        labels: payday?.map((data: any) => (data?.pay)),
        legend: {
            position: 'bottom'

        },
        colors: ['#34c38f', '#f1b44c', '#50a5f1'],
        title: {
            text: 'Thanh toán',
            align: 'center'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 400
                },
                legend: {
                    position: 'bottom',

                }
            }
        }]
    }
    return (
        <>
            <div className="lg:w-1/4 md:w-1/2  pr-2 pl-2 ">
                <div className="bg-white shadow rounded-lg pt-8 pb-24">
                    <div className="">
                        <Chart
                            options={options}
                            series={series}
                            type="pie"
                            width="100%"
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Pay