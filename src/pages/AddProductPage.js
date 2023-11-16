import { useState } from "react";
import { useAddMeal } from "api/mealQueries";
import Layout from "./layouts/Layout";
  import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    photo: "",
    time: "",
    type: "MEALS",
  });
  const onSuccess = () => {
      navigate("/");

  };
  const { mutate } = useAddMeal(onSuccess);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    mutate(form);
  };
  return (
    <Layout>
      <div className="flex justify-center mx-auto mt-8">
        <div className="w-96 bg-gray-200 text p-5 rounded">
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Nom
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nom du produit"
              value={form.name}
              className="border border-gray-300 rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="border border-gray-300 rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Prix
            </label>
            <input
              type="number"
              name="price"
              placeholder="Prix"
              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Temps de préparation
            </label>

            <input
              type="number"
              name="time"
              placeholder="Temps de préparation (en minutes)"
              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
              value={form.time}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Photo
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo"
              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
              value={form.photo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Type de produit
            </label>
            <select
              name="type"
              className="border border-gray-300 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
              value={form.type}
              onChange={handleChange}
            >
              <option value="MEALS">Repas</option>
              <option value="DESSERT">Dessert</option>
            </select>
          </div>
          <div className="mb-4 text-center">
            <button
              className="bg-black text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
              onClick={handleSubmit}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}