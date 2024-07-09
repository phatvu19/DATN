import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts"

const OrderIn7Day = () => {
    const data = [{
        "name": "1/2",
        "order": 2
    }, {
        "name": "1/2",
        "order": 1
    }, {
        "name": "1/2",
        "order": 2
    }, {
        "name": "1/2",
        "order": 3
    }, {
        "name": "1/2",
        "order": 3
    }, {
        "name": "1/2",
        "order": 5
    }, {
        "name": "1/2",
        "order": 9
    }]


    return (
        <>
            <div className="flex justify-center items-center flex-col pt-4 mb-5">
                <span className="font-bold">Đơn hàng trong 7 ngày qua</span>
            </div>
            <LineChart width={500} height={180} data={data}
                margin={{ right: 54, left:-20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={{ fontSize: '0.8em' }} />
                <Tooltip />
                <YAxis style={{ fontSize: '0.8em' }} />
                <Line type="monotone" dataKey="order" stroke="#8884d8" />
            </LineChart>
        </>
    )
}

export default OrderIn7Day