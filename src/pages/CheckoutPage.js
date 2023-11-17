import React, { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "./layouts/Layout";

const CheckoutPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLogged = auth.user ? `cart-${auth.user._id}` : "cart";
  const orderData = JSON.parse(localStorage.getItem(isLogged));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [order, setOrder] = useState({
    customerId: "",
    address: {
      address: "",
      coordonates: {
        lat: 0,
        long: 0,
      },
    },
    deliveryPersonId: "",
    content: [
      {
        name: "",
        price: 0,
        photo: "",
        quantity: 0,
      },
    ],
    totalPrice: 0,
    status: "FREE",
    code: "",
  });


// Ouvrir la modal et redirection vers la page des commandes
  const openModal = () => {
    setIsModalOpen(true);
    setIsLoading(true);
  
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      navigate("/orders"); 
    }, 2000);
  };


  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4400/api/orders/add",
        order
      );

      setOrder({
        customerId: "",
        address: {
          address: "",
          coordonates: {
            lat: 0,
            long: 0,
          },
        },
        deliveryPersonId: "",
        content: [],
        totalPrice: 0,
        status: "FREE",
        code: "",
      });

      openModal();
    } catch (error) {
      console.error("Erreur lors de la requête POST:", error);
    }
  };

  const calculateTotal = () => {
    let subtotal = 0;

    orderData.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    let shippingFee = 2.99;

    if (subtotal > 19.99) {
      shippingFee = 0;
    }

    const total = subtotal + shippingFee;

    console.log(total, subtotal, shippingFee, ` <== total`);

    return { total: total.toFixed(2), subtotal };
  };

  return (
    <Layout title="Express Food | Paiement">
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Votre commande :</p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {orderData.map((item, index) => (
              <div
                key={item.id}
                class="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.photo}
                  alt="img"
                  value={orderData[index].photo}
                />
                <div class="flex w-full flex-col px-4 py-4">
                  <span
                    class="font-semibold"
                    value={orderData[index].name}
                  >
                    {item.name}
                  </span>
                  <span
                    class="float-right text-gray-400"
                    value={orderData[index].quantity}
                  >
                    Quantité : {item.quantity}
                  </span>
                  <p
                    class="text-lg font-bold"
                    value={orderData[index].price}
                  >
                    {`${(item.price * item.quantity).toFixed(2)} `} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Détails du paiement</p>
          <p class="text-gray-400">
            Veuillez complètez les informations requises.
          </p>
          <div class="">
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div class="relative">
              <input
                type="text"
                id="card-no"
                name="card-no"
                class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <label
              for="card-holder"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Nom du titulaire de la carte
            </label>
            <div class="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Votre nom"
                required
              />
            </div>
            <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">
              Informations de la carte
            </label>
            <div class="flex">
              <div class="relative w-7/12 flex-shrink-0">
                <input
                  type="number"
                  id="card-no"
                  name="card-no"
                  class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  min="19"
                  required
                />
              </div>
              <input
                type="text"
                name="credit-expiry"
                class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
                maxlength="5"
                required
              />
              <input
                type="number"
                name="credit-cvc"
                class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
                maxlength="3"
                required
              />
            </div>
            <label
              for="billing-address"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Adresse de livraison
            </label>
            <div class="flex flex-col sm:flex-row">
              <div class="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Adresse de livraison"
                  required
                />
              </div>
              <input
                type="number"
                name="billing-zip"
                class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Code postal"
                maxlength="5"
                required
              />
            </div>

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Sous-total</p>
                <p class="font-semibold text-gray-900">{`${
                  calculateTotal().subtotal
                } €`}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Livraison</p>
                {calculateTotal() > 20 ? (
                  <p class="font-semibold text-gray-900">Gratuit</p>
                ) : (
                  <p class="font-semibold text-gray-900">{`2.99 €`}</p>
                )}
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">{`${
                calculateTotal().total
              } €`}</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Commander
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 w-96">
            {isLoading ? (
              <h2 className="text-2xl text-center font-semibold mb-4">
                Votre paiement a été confirmé, <br /> redirection en cours...
              </h2>
            ) : null}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CheckoutPage;
