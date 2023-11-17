const OrderCard = ({ order }) => {
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

  const statusText =
    order.status === "FREE"
      ? "En attente de livreur"
      : order.status === "ORDER_PREPARATION"
      ? "En préparation"
      : order.status === "READY"
      ? "Prêt"
      : order.status === "PENDING_DELIVERY"
      ? "En attente de livraison"
      : order.status === "DELIVERED"
      ? "Livré"
      : order.status === "CANCELED"
      ? "Annulé"
      : "Statut inconnu";

  return (
    <li className="p-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
            Date de commande : {dateCreatedFormated} à {hourCreatedFormatted}
          </p>

          <p className="text-md text-gray-500 truncate dark:text-gray-400">
            {statusText}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <ul>
            {order.content.map((product, index) => {
              return (
                <li key={index}>
                  {product.name} X {product.quantity}
                </li>
              );
            })}
            <li className="mt-5 text-end fs-4">{order.totalPrice} €</li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default OrderCard;
