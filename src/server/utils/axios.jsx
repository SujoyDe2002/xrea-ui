import axios from 'axios'

const api = axios.create({
   // baseURL: 'http://192.168.1.134:5000'
      baseURL: 'http://20.193.243.127:3011'
})


export const xreaRequest = async (url, type, payLoad) => {
    let response;
    if (type === "POST") {
        response = await api.post(url, payLoad).catch((x)=>console.log(x));
       // console.log("Response", response);
    }
    if (type === "GET") {
        response = await api.get(url);
        // console.log("Response 1 : ", response);
    }

    // const { status, data, message } = response;
    const { status, data, message } = response;
    if ( status === 200 ) {
        return { message, data, status }
    } else {
        return { message }
    }

}
