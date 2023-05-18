import { xreaRequest } from "server/utils/axios";

export const postMarketStudyMailSent = async (payLoad) => {
 
      const url = `/sendMail`;
      const  data  = await xreaRequest(url, "POST", payLoad)
      return data
  }