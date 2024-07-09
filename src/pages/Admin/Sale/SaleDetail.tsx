import { getAllSale, updateSale } from "@/api/services/Sale"
import { Button, Select } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const SaleDetail = ({ data, onValue }: any) => {
    const [sales, setsale] = useState<any>()
    const [idSale, setIdsale] = useState<any>()
    const [saleNmae, setsalename] = useState<any>(data?.sale_id)
    useEffect(() => {
        const fetchPro = async () => {
            const sale = await getAllSale()
            setsale(sale)
            const saleName = sale?.find(
                (item: any) => item?.id == data?.sale_id
            )?.id;
            setsalename(saleName)
        }
        fetchPro()
    }, [])

    const handleChange = (value: any) => {
        onValue(value)
    }
    const HandleUpdate = async (id: any) => {
        const data = {
            id: id,
            sale_id: {
                sale_id: idSale
            }
        };
        console.log(data);
        await updateSale(data)
        toast.success('Thành công')
    }
    console.log(saleNmae);
  

    return (
        <>
            <tr className="border-b dark:border-neutral-500" key={data?.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{data?.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{data?.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{data?.variants[0]?.price}</td>
                <td className="whitespace-nowrap px-6 py-4">
                    <select
                        id="largeSelect"
                        className="form-select form-select-lg"
                        value={saleNmae ? saleNmae :""}
                        style={{ width: "150px", height: "90%" }}
                        onChange={(e) => setIdsale(e.target.value)}
                    >
                        <option value="null">Chọn sale</option>
                        {sales?.map((data: any) => (
                            <option value={data?.id}>Mã sale {data?.name}%</option>
                        ))}
                    </select></td>
                <td className="whitespace-nowrap px-6 py-4"> <Button size="middle" onClick={() => HandleUpdate(data?.id)}>
                    Update
                </Button></td>
            </tr>
        </>
    )
}

export default SaleDetail