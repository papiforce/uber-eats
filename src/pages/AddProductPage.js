import { useState } from "react";
import { useAddMeal } from "api/mealQueries";
import Layout from "./layouts/Layout";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    photo: "",
    time: 0,
    type: "MEAL",
    quantity: 1,
  });

  console.log(form);
  const onSuccess = () => {
    navigate("/dashboard/products");
  };
  const { mutate } = useAddMeal(form, onSuccess);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    mutate(form);
  };
  return (
    <Layout>
      <h2 className="text-center w-100 mt-5">Ajouter un produit</h2>
      <div className="w-full max-w-6xl mx-auto bg-white border  border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 p-3">
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
            <option value="MEAL">Repas</option>
            <option value="DESSERT">Dessert</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Quantité
          </label>

          <input
            type="number"
            name="quantity"
            placeholder="Temps de préparation (en minutes)"
            className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
            value={form.quantity}
            onChange={handleChange}
          />
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
    </Layout>
  );
}
