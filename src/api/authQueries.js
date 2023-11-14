import { axiosInstance } from "./axiosInstance";
import { useMutation, useQuery } from "react-query";

const register = async (form) => {
  const { data } = await axiosInstance.post("/auth/signup", form);

  return data;
};

const login = async (form) => {
  const { data } = await axiosInstance.post("/auth/signin", form);

  return data;
};

const getUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");

  return data;
};

export const useRegister = (onSuccess, onError) => {
  return useMutation(register, { onSuccess, onError });
};

export const useLogin = (onSuccess) => {
  return useMutation(login, { onSuccess });
};

export const useCurrentUser = (onSuccess, onError) => {
  return useQuery("currentUser", getUser, {
    onSuccess,
    onError,
  });
};
