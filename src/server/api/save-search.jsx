import { xreaRequest } from "server/utils/axios";

export const postSearchDetails = async (payLoad) => {
 
      const url = `/saveSearch`;
      const  data  = await xreaRequest(url, "POST", payLoad)
      return data
  }
