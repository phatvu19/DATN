import { getUser } from "@/api/services/UserService"
import { useEffect, useState } from "react"


const UserInComment = ({ user_id ,date}: any) => {
    const [user, setUser] = useState<any>()
    useEffect(() => {
        const FetchUser = async () => {
            const response = await getUser(user_id)
            setUser(response)
        }
        FetchUser()
    }, [])
    return (
        <>
            <div className="flex">
                {user?.avatar ? <img src={user?.avatar} alt="" className="m-1 mx-1 h-10 w-10 rounded-full " /> : <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" alt="" className="m-1 mx-1 h-10 w-10 rounded-full " />}
              
                <div className="ml-2 flex flex-col pt-1">
                    <a className="font-400">{user?.name}</a>
                    <span className="text-sm text-gray-400">{date}</span>
                </div>
            </div>
        </>
    )
}

export default UserInComment