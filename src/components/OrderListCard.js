import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@material-tailwind/react";
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

  return (
    <li className="flex items-center p-4">
      <div>
        <p className="mb-2">Commande ID : {order._id}</p>
        <p className="m-0">{order.address.address}</p>
      </div>

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

      {(order.status === "FREE" || order.status === "PENDING_DELIVERY") &&
        auth.user &&
        auth.user.role === "DELIVERY_PERSON" && (
          <div className="flex flex-row justify-center px-5 ml-auto">
            <ButtonGroup className="flex-nowrap">
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
            </ButtonGroup>
          </div>
        )}
    </li>
  );
};

export default OrderListCard;
