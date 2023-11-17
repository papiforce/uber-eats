import { useUpdateOrderStatusAdmin } from "api/orderQueries";
import { queryClient } from "index";
import React, { useState } from "react";

export default function OrderCardAdmin({ order }) {
  const dateCreated = new Date(order.createdAt);

  const dateCreatedFormated = dateCreated.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const hourCreatedFormatted = dateCreated.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [editedOrderStatus, setEditedOrderStatus] = useState([]);

  const onUpdateOrderStatusSuccess = () => {
    queryClient.invalidateQueries(["getOrders"]);
  };

  const { mutate } = useUpdateOrderStatusAdmin(
    order._id,
    editedOrderStatus.status,
    onUpdateOrderStatusSuccess
  );

  return (
    <li class="p-4">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-shrink-0"></div>
        <div class="flex-1 min-w-0">
          <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
            Date de commande : {dateCreatedFormated} à {hourCreatedFormatted}
          </p>

          <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
            Client :{" "}
            {order.customerId.lastname} {order.customerId.firstname}
          </p>

          <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
            Email : {order.customerId.email}
          </p>

          <p class="text-md text-gray-500 truncate dark:text-gray-400">
            <select
              name="type"
              className="border border-gray-300 rounded-md text-dark w-50 focus:outline-none p-2 mr-2"
              value={order.status}
              onChange={(e) => {
                setEditedOrderStatus({
                  ...editedOrderStatus,
                  status: e.target.value,
                });
                mutate({ status: e.target.value });
              }}
            >
              <option value="FREE">Gratuit</option>
              <option value="ORDER_PREPARATION">En préparation</option>
              <option value="READY">Prêt</option>
              <option value="PENDING_DELIVERY">En attente de livraison</option>
              <option value="DELIVERED">Livré</option>
              <option value="CANCELED">Annulé</option>
              <option value="UNKNOWN">Statut inconnu</option>
            </select>
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <ul>
            {order.content.map((product, index) => {
              return <li>{product.name + " X " + product.quantity}</li>;
            })}
            <li className="mt-5 text-end fs-4">{order.totalPrice} €</li>
          </ul>
        </div>
      </div>
    </li>
  );
}
