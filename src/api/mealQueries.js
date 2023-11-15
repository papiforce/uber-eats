import { axiosInstance } from "./axiosInstance";
import { useQuery } from "react-query";

const getMenu = async () => {
  const { data } = await axiosInstance.get(`/meals`);

  return data;
};

export const useGetMenu = (onSuccess) => {
  return useQuery("menu", () => getMenu(), {
    onSuccess,
  });
};
