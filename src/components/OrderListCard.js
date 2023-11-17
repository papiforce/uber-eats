import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { useUpdateOrderStatusDelivery } from "api/orderQueries";
import { queryClient } from "../index";
import { useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";

const OrderListCard = ({ order }) => {
  const { auth } = useContext(AuthContext);
  const [code, setCode] = useState("");

  const onSuccess = () => {
    queryClient.invalidateQueries(["getOrders"]);
  };

  const { mutate: mutateOrderPreparation } = useUpdateOrderStatusDelivery(
    order._id,
    "ORDER_PREPARATION",
    "",
    onSuccess
  );

  const { mutate: mutateDelivered } = useUpdateOrderStatusDelivery(
    order._id,
    "DELIVERED",
    code,
    onSuccess
  );
console.log(order)
  return (
    <li className="flex items-start px-5 py-3">
      <div className="w-100">
        {order.status === "READY" &&
          auth.user &&
          auth.user.role === "DELIVERY_PERSON" && (
            <p>Commande prête à être récuperée</p>
          )}
        <p className="fw-bold fs-5 text-center mt-4">
          {order.customerId.firstname}
        </p>
        <div className="text-center my-5">
          {(order.status === "FREE" || order.status === "PENDING_DELIVERY") &&
            auth.user &&
            auth.user.role === "DELIVERY_PERSON" && (
              <Button
                onClick={() => {
                  order.status === "FREE"
                    ? mutateOrderPreparation()
                    : mutateDelivered();
                }}
                disabled={order.status === "PENDING_DELIVERY" && code === ""}
              >
                <FontAwesomeIcon icon={faCheckCircle} />
              </Button>
            )}

          {order.status === "PENDING_DELIVERY" &&
            auth.user &&
            auth.user.role === "DELIVERY_PERSON" && (
              <input
                type="text"
                name="code"
                className="max-w-[100px] ml-6 border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
                onChange={(e) => setCode(e.target.value)}
              />
            )}
        </div>

        <p className="mt-2 text-center fw-bold">Commande ID : {order._id}</p>
        <p className="mb-5 mt-2 text-center">{order.address.address}</p>

        <div className="flex justify-content-center mx-auto text-center">
          <ul>
            {order.content.map((content, index) => (
              <li className="mt-2 border rounded p-4 text">
                {content.quantity}x {content.name}
              </li>
            ))}
          </ul>
        </div>

        <p className="m-0 text-end fw-bold mt-5">Prix : {order.totalPrice}</p>
      </div>
    </li>
  );
};

export default OrderListCard;
