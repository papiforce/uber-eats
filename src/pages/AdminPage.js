import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";

import Layout from "./layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AdminPage() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <div className="flex justify-center mt-5">
          <div class="bg-white p-6 rounded-md w-7/12">
            {auth.isAuthenticated && (
              <h1 class="text-2xl sm:text-center text-start font-semibold mb-4">
                Bonjour {auth.user.firstname}
              </h1>
            )}
          </div>
        </div>

        <div class="max-w-1xl mx-auto lg:flex lg:justify-center">
          <div
            class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow mr-4"
            onClick={() => navigate("/dashboard/products")}
          >
            <FontAwesomeIcon className="fs-3" icon={faPenToSquare} />
            <h2 class="text-xl font-semibold mb-2">Voir les menus</h2>
          </div>

          <div
            class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow mr-4"
            onClick={() => navigate("/dashboard/product/form")}
          >
            <FontAwesomeIcon className="fs-3" icon={faPlus} />
            <h2 class="text-xl font-semibold mb-2">Ajouter un nouveau menu</h2>
          </div>

          <div
            class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow mr-4"
            onClick={() => navigate("/dashboard/orders")}
          >
            <FontAwesomeIcon className="fs-3" icon={faPenToSquare} />
            <h2 class="text-xl font-semibold mb-2">Voir les commandes</h2>
          </div>

          <div
            class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow mr-4"
            onClick={() => navigate("/dashboard/users")}
          >
            <FontAwesomeIcon className="fs-3" icon={faUser} />
            <h2 class="text-xl font-semibold mb-2">Voir les utilisateurs</h2>
          </div>
        </div>
      </Layout>
    </>
  );
}
