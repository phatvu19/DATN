import { Bar, BarChart, CartesianGrid, LabelList, Legend, Tooltip, XAxis, YAxis } from "recharts"
const DataIn1Year = () => {
    const formatCurrency = (value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const data = [{
        "name": "1",
        "Total": 2324234
    }, {
        "name": "2",
        "Total": 12343243
    }, {
        "name": "3",
        "Total": 22341232
    }, {
        "name": "4",
        "Total": 2324234
    }, {
        "name": "5",
        "Total": 33123213
    }, {
        "name": "6",
        "Total": 2324234
    }, {
        "name": "7",
        "Total": 7631231
    }, {
        "name": "8",
        "Total": 9345345
    }, {
        "name": "9",
        "Total": 2324234
    }, {
        "name": "10",
        "Total": 9234234
    },  {
        "name": "11",
        "Total": 9324234
    },  {
        "name": "12",
        "Total": 9532443
    }]
    return (
        <>
            <div className="flex ">
                <div className="w-full border border-gray-400 p-4">
                    <span className='font-bold text-sm'>Doanh Thu Trong 1 Năm</span>
                    <BarChart width={1100} height={350} data={data} className="mt-8" >
                        <CartesianGrid strokeDasharray="5" />
                        <XAxis dataKey="name" style={{ fontSize: '1em' }} />
                        <YAxis style={{ fontSize: '0.8em' }} />
                        <Tooltip formatter={formatCurrency} />
                        <Bar dataKey="Total" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </>
    )
}

export default DataIn1Year