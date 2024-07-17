import Chart from 'react-apexcharts';

const Data7Day = () => {
    const apiData = [
        { month: "Jan", orders: 310 },
        { month: "Feb", orders: 30 },
        { month: "Mar", orders: 320 },
        { month: "Mar", orders: 202 },
        { month: "Mar", orders: 320 },
        { month: "Mar", orders: 120 },
        { month: "Mar", orders: 220 }
    ];
    const series = [{
        name: "Orders",
        data: apiData.map(item => item.orders)
    }];
    const options:any = {
        chart: {
            type: "line",
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: true
        },
        title: {
            text: 'Đơn hàng trong 7 ngày gần nhất',
            align: 'center'
        },
        stroke: {
            curve: "smooth"
        },
        xaxis: {
            categories: apiData.map(item => item.month),
        }
    };

    return (
        <>
            <div className="lg:w-2/4 md:w-1/2 ">
                <div className="bg-white shadow rounded-lg">

                    <div className="card-body pt-4 ">
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            height={300}
                            
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Data7Day