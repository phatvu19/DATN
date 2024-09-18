
import { load, remove, save } from "@/utilities/local-storage"
import { storageKeys } from "./storage-key"

const saveDataAfterLoginGoogle = (data: any) => {
    save(storageKeys.USER, data)
}

const saveDataAfterLogin = (data: any) => {
    save(storageKeys.ACCESS_TOKEN, data.access_token)
    save(storageKeys.REFRESH_TOKEN, data.refresh_token)
}
const saveUserDetailData = (data: any) => {
    save(storageKeys.USER, data.user)
    save(storageKeys.USER_ID, data.user.id)
}

const saveAccessToken = (accessToken: string) => {
    save(storageKeys.ACCESS_TOKEN, accessToken)
}

const setActivityUser = (activityUser: string) => {
    const oldData = load<any>(storageKeys.USER)
    save(storageKeys.USER, { ...oldData, activity_user: activityUser })
}

const setAvatarUser = (avatar: string) => {
    const oldData = load<any>(storageKeys.USER)
    save(storageKeys.USER, { ...oldData, avatar: avatar })
}

const getUser = () => {
    return load<any>(storageKeys.USER)
}

const getUserId = () => {
    return load<any["id"]>(storageKeys.USER_ID)
}

const getFullName = () => {
    const userInfo = load<any>(storageKeys.USER)

    return userInfo?.first_name + " " + userInfo?.last_name || "NO NAME"
}

const getRefreshToken = () => {
    return load<string>(storageKeys.REFRESH_TOKEN)
}
const getAccessToken = () => {
    return load<string>(storageKeys.ACCESS_TOKEN)
}

const removeUser = () => {
    remove(storageKeys.USER)
}

export const StorageFunc = {
    saveDataAfterLoginGoogle,
    saveDataAfterLogin,
    saveAccessToken,
    getUser,
    getUserId,
    removeUser,
    getRefreshToken,
    getAccessToken,
    saveUserDetailData,
    getFullName,
    setActivityUser,
    setAvatarUser,
}
