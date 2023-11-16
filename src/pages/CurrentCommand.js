// HomePage.js
import React, { useContext } from "react";
import { OrderContext } from "contexts/OrderContext";
import Layout from "./layouts/Layout";


const CurrentCommand = () => {

  const { orderConfirmed } = useContext(OrderContext);

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
            {/* Condition pour afficher le bouton modal */}
          {["FREE", "DELIVERED", "CANCELED"].indexOf(orderConfirmed.orders[0].status) === -1 && (
            <button>Voir emplacement du livreur</button>
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
