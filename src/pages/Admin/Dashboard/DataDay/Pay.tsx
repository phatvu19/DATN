import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';


const Pay = () => {
    const data = [
        { name: 'Online', value: 1 },
        { name: 'Ship Cod', value: 2},
    ];

    const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#FF8042'];
    return (
        <>
            <div className="flex justify-center items-center flex-col pt-4">
                <span className="font-bold">Kiểu thah toán</span>
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

export default Pay