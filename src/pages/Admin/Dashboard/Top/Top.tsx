import TopProduct from "./TopProduct"
import TopUser from "./TopUser"


const Top = () => {
    return (
        <>
            <div className="flex ">
                <div className="w-2/4 border border-gray-400">
                    <TopProduct/>
                </div>
                <div className="w-2/4 border border-black ml-4">
                    <TopUser />
                </div>

            </div>
        </>
    )
}

export default Top