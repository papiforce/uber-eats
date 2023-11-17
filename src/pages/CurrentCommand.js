// HomePage.js
import React, { useContext, useState } from "react";
import { OrderContext } from "contexts/OrderContext";
import Layout from "./layouts/Layout";
import { useGetUsers } from "api/userQueries";
import axios from "axios";

const CurrentCommand = () => {
  const { latestOrder } = useContext(OrderContext);
  const [deliveryInfos, setDeliveryInfos] = useState({
    distance: null,
    duration: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const date = new Date(latestOrder.createdAt);
  const dateFormated = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const hourFormatted = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const status = latestOrder.status;

  const getStatusMessage = (status) => {
    switch (status) {
      case "ORDER_PREPARATION":
        return "La commande est en cours de préparation...";
      case "READY":
        return "La commande est prête.";
      case "PENDING_DELIVERY":
        return "La commande est en attente de livraison...";
      case "DELIVERED":
        return "La commande a été livrée avec succès.";
      case "CANCELED":
        return "La commande a été annulée.";
      default:
        return "La commande est en attente d'un livreur...";
    }
  };

  const onSuccess = async (payload) => {
    const deliveryPerson = payload[0];

    const origins = `${deliveryPerson.address.coordonates.lat},${deliveryPerson.address.coordonates.long}`;
    const destinations = `${latestOrder.address.coordonates.lat},${latestOrder.address.coordonates.long}`;
    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${process.env.REACT_APP_DISTANCE_API_KEY}`;

    const { data } = await axios.get(url);

    if (data.status !== "OK") return;

    const distanceText = data.rows[0].elements[0].distance.text;
    const durationText = data.rows[0].elements[0].duration.text;

    setDeliveryInfos({ distance: distanceText, duration: durationText });
  };

  useGetUsers(`?id=${latestOrder.deliveryPersonId}`, onSuccess);

  if (!latestOrder || latestOrder.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto my-8">
          <h1 className="text-3xl font-semibold mb-4">Chargement...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <div>
          <h1 className="text-3xl font-semibold mb-1">
            ID de la commande : {latestOrder._id}
          </h1>
          <p className="text-3xl font-semibold mb-4">
            Code : {latestOrder.code}
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "-20px",
            }}
          >
            Commande faite le {dateFormated} à {hourFormatted}
          </p>
          <p>{getStatusMessage(status)}</p>
          {latestOrder.content.map((product, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>{product.quantity}x</span>
                <span style={{ marginLeft: "10px" }}>{product.name}</span>
              </div>
              <div>
                <span>{product.price * product.quantity} €</span>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div>
              <span>Ventes de produits alimentaires TVA incluse</span>
            </div>
            <div>
              <span>
                {latestOrder.totalPrice < 19.99
                  ? (latestOrder.totalPrice - 2.99).toFixed(2)
                  : latestOrder.totalPrice}{" "}
                €
              </span>
            </div>
          </div>
        </div>
        {latestOrder.totalPrice < 19.99 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <span>Frais de livraison</span>
            </div>
            <div>
              <span>2.99 €</span>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <span>Frais de livraison</span>
            </div>
            <div>
              <span>0 €</span>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <div>
            <p className="text-3xl font-semibold mb-4">Prix total</p>
          </div>
          <div>
            <p className="text-3xl font-semibold mb-4">
              {" "}
              {latestOrder.totalPrice} €
            </p>
          </div>
        </div>

        {status === "PENDING_DELIVERY" && (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                // handleDistanceDuration();
                setIsModalOpen(true);
              }}
            >
              Voir l'emplacement du livreur
            </button>
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white p-8 w-96 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-500">
                        <p>Distance : {deliveryInfos.distance}</p>
                        <p>Durée estimée : {deliveryInfos.duration}</p>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CurrentCommand;
