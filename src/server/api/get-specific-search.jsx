import { xreaRequest } from "server/utils/axios";

export const getSpecificSearch = async (payLoad) => {
  const url = `/getSearchItem`;
  const { data } = await xreaRequest(url, "POST", payLoad);
  return data;
};
