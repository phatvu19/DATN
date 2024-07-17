import Chart from 'react-apexcharts';
import Data7Day from './Data7Day';
import Categories from './Categories';
import Pay from './Pay';
const ChartAll = () => {
    const series = [44, 55, 13]
    const options: any = {
        chart: {
            type: 'pie',
        },
        labels: ['Desktop Users', 'Mobile Users', 'Tablet Users'],
        colors: ['#34c38f', '#f1b44c', '#50a5f1'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    return (
        <>

            <div className="flex flex-wrap h-full  border border-gray-100 ">
                <Categories />
                <Pay />
                <Data7Day />
            </div>

        </>
    )
}

export default ChartAll