import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://192.168.1.107:3300'
     baseURL: 'http://20.193.243.127:3011'
})


export const xreaRequest = async (url,type, payLoad ) => {
    let response;
    if (type === "POST") {
        response = await api.post(url, payLoad);
    }
    if (type === "GET") {
        response = await api.get(url);
    }
    return response

}
