import service from "../service"
import { getToken } from '../utils/token'

// 获取所有公告
export const getAllAnnouncement = () => {
    return service({
        method: "GET",
        url: "/announcement/getallannouncement",
        headers: {
            Authorization: getToken("token")
        },
    })
}
// 根据公告ID删除公告
export const deleteAnnouncementById = (id) => {
    return service({
        method: "POST",
        url: "/announcement/deleteannouncementbyid",
        data: {
            a_id: id,
        },
        headers: {
            Authorization: getToken("token")
        },
    })
}
// 发布公告
export const addAnnouncement = (data) => {
    return service({
        method: "POST",
        url: "/announcement/addannouncement",
        data,
        headers: {
            Authorization: getToken("token")
        },
    })
}