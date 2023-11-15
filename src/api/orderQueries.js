import { axiosInstance } from "./axiosInstance";
import { useMutation, useQuery } from "react-query";

const getOrders = async (options) => {
  const { data } = await axiosInstance.get(`/orders?${options}`);

  return data;
};

const createOrder = async (form) => {
  const { data } = await axiosInstance.post("/orders/add", form);

  return data;
};

const cancelOrder = async (orderId) => {
  const { data } = await axiosInstance.put(`/orders/cancel/${orderId}`);

  return data;
};

const updateOrderStatusDelivery = async (orderId, status, code) => {
  const { data } = await axiosInstance.put(
    `/orders/update-delivery-status/${orderId}`,
    {
      status,
      code,
    }
  );

  return data;
};

const updateOrderStatusAdmin = async (orderId, status) => {
  const { data } = await axiosInstance.put(`/orders/update-status/${orderId}`, {
    status,
  });

  return data;
};

export const useGetOrders = (options, onSuccess) => {
  return useQuery(["getOrders", options], () => getOrders(options), {
    onSuccess,
  });
};

export const useCreateOrder = async (form, onSuccess) => {
  return useMutation(() => createOrder(form), { onSuccess });
};

export const useCancelOrder = async (orderId, onSuccess) => {
  return useMutation(() => cancelOrder(orderId), { onSuccess });
};

export const useUpdateOrderStatusDelivery = async (
  orderId,
  status,
  code,
  onSuccess
) => {
  return useMutation(() => updateOrderStatusDelivery(orderId, status, code), {
    onSuccess,
  });
};

export const useUpdateOrderStatusAdmin = async (orderId, status, onSuccess) => {
  return useMutation(() => updateOrderStatusAdmin(orderId, status), {
    onSuccess,
  });
};