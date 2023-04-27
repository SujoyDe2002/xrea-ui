import { xreaRequest } from "server/utils/axios";

export const getUseCaseList = async () => {

      const url = `/users/usecase`;
      const { data } = await xreaRequest(url, "GET")
      return data
  }
