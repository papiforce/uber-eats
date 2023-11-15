import { axiosInstance } from "./axiosInstance";
import { useQuery, useMutation } from "react-query";

const getUsers = async (options) => {
  const { data } = await axiosInstance.get(`/users?${options}`);

  return data;
};

const updateUser = async (userId, updatedData) => {
  const { data } = await axiosInstance.put(
    `/users/update/${userId}`,
    updatedData
  );

  return data;
};

export const useGetUsers = (options, onSuccess) => {
  return useQuery(["getUsers", options], () => getUsers(options), {
    onSuccess,
  });
};

export const useUpdateUser = ({ userId, data }, onSuccess, onError) => {
  return useMutation(() => updateUser(userId, data), { onSuccess, onError });
};
