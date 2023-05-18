import { xreaRequest } from "server/utils/axios";

export const getSavedSearch = async (userId) => {

      const url = `/searchList?user_id=${userId}`;
      const { data } = userId && await xreaRequest(url, "GET")
      return data
  }