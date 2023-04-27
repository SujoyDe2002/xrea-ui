const { xreaRequest } = require("server/utils/axios");

// export const getCityList = async (srch) => {
//   // try {
//     console.log("data1");
//     // http://localhost:3300/users/search/city?srch=
//     const url = `/users/search/city?srch=${srch}`;
//     const { data } = await xreaRequest(url, "GET")
//     return data

// }
export const getSearchedResult = async (payLoad) => {
  const url = `/search`;
  const { data } = await xreaRequest(url, "POST", payLoad);
  return data

}

