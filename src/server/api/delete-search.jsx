import { xreaRequest } from "server/utils/axios";


export const deleteSearch = async (payLoad) => {
    const url = `/searchDelete`;
    const data = await xreaRequest(url, "POST", payLoad)
    return data
}