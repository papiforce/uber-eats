import { axiosInstance } from "./axiosInstance";
import { useQuery, useMutation } from "react-query";

const getMenu = async (options = "onlyActive=true") => {
  const { data } = await axiosInstance.get(`/meals?${options}`);

  return data;
};

const addMeal = async (meal) => {
  const { data } = await axiosInstance.post("/meals/add", meal);

  return data;
};

const updateMeal = async (mealId, updatedMeal) => {
  const { data } = await axiosInstance.put(
    `/meals/update/${mealId}`,
    updatedMeal
  );

  return data;
};

const deleteMeal = async (mealId) => {
  const { data } = await axiosInstance.delete(`/meals/delete/${mealId}`);

  return data;
};

export const useGetMenu = (onSuccess) => {
  return useQuery("menu", getMenu, {
    onSuccess,
  });
};

export const useAddMeal = (onSuccess) => {
  return useMutation(addMeal, { onSuccess });
};

export const useUpdateMeal = ({ mealId, data }, onSuccess, onError) => {
  return useMutation(() => updateMeal(mealId, data), { onSuccess, onError });
};

export const useDeleteMeal = ({ mealId, data }, onSuccess, onError) => {
  return useMutation(() => deleteMeal(mealId, data), { onSuccess, onError });
};