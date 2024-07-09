import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';


const Categories = () => {
    const COLORS = ['#0088FE', '#FF8042', 'pink', 'red', 'blue', 'green', 'yellow', 'violet', '#FFBB28'];
    const data = [{
        "name": "Áo khoác",
        "value": 1
    }, {
        "name": "Áo khoác",
        "value": 1
    }, {
        "name": "Áo khoác",
        "value": 1
    }]
    return (
        <>
            <div className="flex justify-center items-center flex-col pt-4">
                <span className="font-bold">Danh mục</span>
            </div>
            <PieChart width={200} height={175}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="60%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={65}
                    fill="#8884d8"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </>
    )
}

export default Categories