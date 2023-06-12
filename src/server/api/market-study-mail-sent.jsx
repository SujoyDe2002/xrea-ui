import { xreaRequest } from "server/utils/axios";

export const postMarketStudyMailSent = async (payLoad) => {
 
      const url = `/api/users/sendmail`;
      const  {status}  = await xreaRequest(url, "POST", payLoad)
      return status;
  }