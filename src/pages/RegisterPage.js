import React, { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import { useRegister } from "api/authQueries";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSuccess = () => {
    setAlertMessage(null);
    navigate("/login");
  };

  const onError = ({ response }) => {
    setAlertMessage(response.data.error);
  };

  const { mutate } = useRegister(onSuccess, onError);

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(formData);
  };

  return (
    <Layout title="Food Express | Inscription">
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl text-center font-semibold mb-4">Inscription</h1>
        {alertMessage && <Alert color="black">{alertMessage}</Alert>}
        <form onSubmit={handleSubmit} className="max-w-md mt-5 mx-auto">
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Prénom
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Adresse
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            >
              Continuer
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
