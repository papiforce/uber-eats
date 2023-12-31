import React, { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import { useCreateOrder } from "api/orderQueries";
import { OrderContext } from "contexts/OrderContext";

const CheckoutPage = () => {
  const { auth } = useContext(AuthContext);
  const { setLatestOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const isLogged = auth.user ? `cart-${auth.user._id}` : "cart";
  const orderData = JSON.parse(localStorage.getItem(isLogged));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: auth.user ? auth.user.email : "",
    name: auth.user ? `${auth.user.firstname} ${auth.user.lastname}` : "",
    address: auth.user ? auth.user.address.address : "",
    content: orderData,
    totalPrice: 0,
  });

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

    return { total: total.toFixed(2), subtotal };
  };

  const onSuccess = (payload) => {
    setIsModalOpen(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      setLatestOrder(payload);

      navigate("/current-order");
      localStorage.removeItem(`cart-${auth.user._id}`);
    }, 2000);
  };

  const { mutate } = useCreateOrder(onSuccess);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutate({ ...form, totalPrice: calculateTotal().total });
  };

  return (
    <Layout title="Express Food | Paiement">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Votre commande :</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {orderData.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.photo}
                  alt="img"
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="float-right text-gray-400">
                    Quantité : {item.quantity}
                  </span>
                  <p className="text-lg font-bold">
                    {`${(item.price * item.quantity).toFixed(2)} `} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Détails du paiement</p>
          <p className="text-gray-400">
            Veuillez complètez les informations requises.
          </p>
          <div className="">
            <label for="email" className="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-no"
                className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Email"
                required
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <label
              for="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Nom du titulaire de la carte
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Votre nom"
                required
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <label
              for="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Informations de la carte
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="number"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  min="19"
                  required
                />
              </div>
              <input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
                maxlength="5"
                required
              />
              <input
                type="number"
                name="credit-cvc"
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
                maxlength="3"
                required
              />
            </div>
            <label
              for="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Adresse de livraison
            </label>
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                id="billing-address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Adresse de livraison"
                required
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Sous-total</p>
                <p className="font-semibold text-gray-900">
                  {calculateTotal().subtotal} €
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Livraison</p>
                {calculateTotal().subtotal > 19.99 ? (
                  <p className="font-semibold text-gray-900">Gratuit</p>
                ) : (
                  <p className="font-semibold text-gray-900">2.99 €</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{`${
                calculateTotal().total
              } €`}</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
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
