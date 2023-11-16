// HomePage.js
import React, { useContext, useState } from "react";
import { OrderContext } from "contexts/OrderContext";
import Layout from "./layouts/Layout";
import axios from 'axios';


const CurrentCommand = () => {

  const { orderConfirmed } = useContext(OrderContext);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!orderConfirmed || !orderConfirmed.orders || orderConfirmed.orders.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto my-8">
          <h1 className="text-3xl font-semibold mb-4">Chargement...</h1>
        </div>
      </Layout>
    );
  }

  const date = new Date(orderConfirmed.orders[0].createdAt);
  const dateFormated = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
  const hourFormatted = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  const status = orderConfirmed.orders[0].status;


  let statusMessage;

  switch (status) {
    case "FREE":
      statusMessage = "La commande est en attente d'un livreur...";
      break;
    case "ORDER_PREPARATION":
      statusMessage = "La commande est en cours de préparation...";
      break;
    case "READY":
      statusMessage = "La commande est prête.";
      break;
    case "PENDING_DELIVERY":
      statusMessage = "La commande est en attente de livraison...";
      break;
    case "DELIVERED":
      statusMessage = "La commande a été livrée avec succès.";
      break;
    case "CANCELED":
      statusMessage = "La commande a été annulée.";
      break;
  }

  

  const handleDistanceDuration = async () => {
    try {
      
      const position = await axios.get(`http://localhost:4400/api/users/?id=${orderConfirmed.orders[0].deliveryPersonId}`);
      const origins = `${position.data[0].address.coordonates.lat},${position.data[0].address.coordonates.long}`;
      const destinations = `${orderConfirmed.orders[0].address.coordonates.lat},${orderConfirmed.orders[0].address.coordonates.long}`;
      const apiKey = 'YBubBUzCmEWE0cSdLilVCwTJm8498FyLaQYBHI3DZLOugSqbco71OeswG6mjOCNP';
      const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`;
      const response = await axios.get(url);

      if (response.data.status === 'OK') {
        const distanceText = response.data.rows[0].elements[0].distance.text;
        const durationText = response.data.rows[0].elements[0].duration.text;

        setDistance(distanceText);
        setDuration(durationText);
      } else {
        console.error('Erreur lors de la récupération des informations de distance et de durée');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la récupération des informations de distance et de durée', error);
    }
  };


  return (
    <Layout>
      <div className="container mx-auto my-8">
        {orderConfirmed ? (
          <div>
            <h1 className="text-3xl font-semibold mb-4">ID de la commande {orderConfirmed.orders[0]._id}</h1>
            <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-20px' }} >{dateFormated}&nbsp;&nbsp;{hourFormatted}</p>
            <p>{statusMessage}</p>
            {orderConfirmed.orders[0].content.map((product, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span>{product.quantity}x</span>
                  <span style={{ marginLeft: '10px' }}>{product.name}</span>
                </div>
                <div>
                  <span>{(product.price * product.quantity)} €</span>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <div>
                <span>Ventes de produits alimentaires TVA incluse</span>
              </div>
              <div>
                <span>{orderConfirmed.orders[0].totalPrice} €</span>
              </div>

            </div>
            {orderConfirmed.orders[0].totalPrice < 20 ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span>Frais de livraison</span>
                </div>
                <div>
                  <span>2.99 €</span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span>Frais de livraison</span>
                </div>
                <div>
                  <span>0 €</span>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '50px' }}>
              <div>
                <h1 className="text-3xl font-semibold mb-4">Prix total</h1>
              </div>
              <div>
                <h1 className="text-3xl font-semibold mb-4"> {orderConfirmed.orders[0].totalPrice} €</h1>
              </div>
            </div>
            {orderConfirmed.orders[0].status === "PENDING_DELIVERY" && (
              <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => { setIsModalOpen(true); handleDistanceDuration(); }}>
                  Voir l'emplacement du livreur
                </button>
                {isModalOpen && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-8 w-96 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-shrink-0">
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-gray-500">
                            <p>Distance {distance}</p>
                            <p>Durée estimée {duration}</p>
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button onClick={() => setIsModalOpen(false)} className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200">
                          Fermer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        ) : (
          <h1 className="text-3xl font-semibold mb-4">Chargement...</h1>
        )}
      </div>
    </Layout>
  );
};

export default CurrentCommand;
