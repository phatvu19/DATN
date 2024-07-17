import Chart from 'react-apexcharts';



const Categories = () => {
    const series = [44, 55, 13]
    const options: any = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Danh mục',
            align: 'center'
          
        },
        labels: ['Desktop', 'Mobile', 'Tablet'],
        legend: {
            position: 'bottom' // Di chuyển chú giải xuống dưới
        },
        colors: ['#34c38f', '#f1b44c', '#50a5f1'],
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom'
                }
            },
            
        }]
    }
    return (
        <>
            <div className="lg:w-1/4 md:w-1/2 ">
                <div className="bg-white shadow rounded-lg pt-8 pb-20">

                    <div className="card-body">
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

export default Categories