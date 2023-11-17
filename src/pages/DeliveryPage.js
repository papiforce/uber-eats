import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import Layout from "./layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";


export default function DeliveryPage() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div class="bg-white p-6 rounded-md w-7/12">
            {auth.isAuthenticated && (
              <h1 class="text-2xl font-semibold mb-4">
                Bonjour {auth.user.firstname}
              </h1>
            )}
          </div>
        </div>

        <div class="max-w-1xl mx-auto lg:flex lg:justify-center">
          <div
            class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow-md mr-4"
            onClick={() => navigate("/delivery-dashboard/orders")}
          >
            <FontAwesomeIcon className="fs-3" icon={faPenToSquare} />
            <h2 class="text-xl font-semibold mb-2">
              Voir les commandes disponibles
            </h2>
          </div>
        </div>
      </Layout>
    </>
  );
}
