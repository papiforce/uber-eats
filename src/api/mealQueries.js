import { axiosInstance } from "./axiosInstance";
import { useQuery, useMutation } from "react-query";

const getMenu = async (options) => {
  const { data } = await axiosInstance.get(`/meals${options}`);

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

export const useGetMenu = (options, onSuccess) => {
  return useQuery(["menu", options], () => getMenu(options), {
    onSuccess,
  });
};

export const useAddMeal = (data, onSuccess) => {
  return useMutation(() => addMeal(data), { onSuccess });
};

export const useUpdateMeal = ({ mealId, data }, onSuccess, onError) => {
  return useMutation(() => updateMeal(mealId, data), { onSuccess, onError });
};

export const useDeleteMeal = (mealId, onSuccess, onError) => {
  return useMutation(() => deleteMeal(mealId), { onSuccess, onError });
};
