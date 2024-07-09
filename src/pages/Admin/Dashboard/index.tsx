import DataDay from "./DataDay/DataDay"
import DataIn1Year from "./DataIn1Year/DataIn1Year"
import OrderDay from "./OrderDay/OrderDay"
import Top from "./Top/Top"

function Dashboard() {
    return (
        <>
            <main>
                <div>
                    <DataDay />
                </div>
                <div className="mt-4">
                    <OrderDay />
                </div>
                <div className="mt-4">
                    <DataIn1Year />
                </div>
                <div className="mt-4">
                    <Top />
                </div>
            </main>
        </>
    )
}
export default Dashboard
