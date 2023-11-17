import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { useUpdateOrderStatusDelivery } from "api/orderQueries";
import { queryClient } from "../index";

const OrderListCard = ({ order }) => {
  const onSuccess = () => {
    queryClient.invalidateQueries(["getOrders"]);
  };

  const { mutate } = useUpdateOrderStatusDelivery(
    order._id,
    "ORDER_PREPARATION",
    "",
    onSuccess
  );

  return (
    <li className="flex items-center p-4">
      <div>
        <p className="mb-2">Commande ID : {order._id}</p>
        <p className="m-0">{order.address.address}</p>
      </div>

      <div className="flex flex-row justify-center px-5 ml-auto">
        <ButtonGroup className="flex-nowrap">
          <Button onClick={() => mutate()}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </ButtonGroup>
      </div>
    </li>
  );
};

export default OrderListCard;
