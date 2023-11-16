import React, { useState } from "react";
import { Alert } from "@material-tailwind/react";
import axios from "axios";
import Layout from "./layouts/Layout";

const RegisterPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4400/api/auth/signup",
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          address: {
            address: formData.address,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setAlertMessage("Compte créé");
      } else {
        console.log(response.data);
        setAlertMessage(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAlertMessage(error.response.data.error);
      } else if (error.response.status === 500) {
        setAlertMessage(
          "Problème lors de l'inscription, vérifiez vos informations"
        );
      } else {
        console.error("Registration failed", error);
      }
    }
  };

  return (
    <Layout title="Food Express | Inscription">
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl text-center mb-5 font-semibold mb-4">
          Inscription
        </h1>
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
