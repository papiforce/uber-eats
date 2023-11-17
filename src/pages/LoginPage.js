import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Layout from "./layouts/Layout";

import { AuthContext } from "contexts/AuthContext";
import { useLogin } from "api/authQueries";

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSuccess = (payload) => {
    Cookies.set("fe-token", payload.token, { expires: 31 });
    setAuth({ isAuthenticated: true, user: payload.user });

    const cart = localStorage.getItem("cart");

    if (cart) {
      localStorage.setItem(`cart-${payload.user._id}`, cart);
      localStorage.removeItem("cart");
    }

    navigate("/");
  };

  const { mutate, reset, isError } = useLogin(onSuccess);

  const handleChange = (e) => {
    if (isError) {
      reset();
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    mutate(form);
  };

  return (
    <Layout title="Express Food | Connexion">
      <div className="flex min-h-[calc(100vh_-_85px)] lg:items-center lg:justify-center bg-gray-50">
        <div className="rounded-lg bg-gray-50 shadow-xl px-16 py-16 w-full">
          <div className="flex flex-col">
            <h3 className="my-4 text-center text-3xl font-semibold text-black">
              Connexion
            </h3>
            <form className="max-w-md mt-5 mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 text-sm font-medium mb-1"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-600 text-sm font-medium mb-1"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
                  required
                />
              </div>
            </form>
            <button
              className="mx-auto my-10 block rounded-xl border-4 border-transparent bg-gray-900 px-6  text-center text-base font-medium text-white w-56 hover:bg-gray-800 hover:duration-300"
              onClick={handleSubmit}
            >
              Se connecter
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Vous n'avez pas de compte ?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Inscrivez-vous !
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
