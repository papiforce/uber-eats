import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { updateOrderStatusDelivery } from "api/orderQueries";

const OrderListCard = ({ order, update, selected }) => {
  const handleSelect = async () => {
    try {
      const checkUpdate = await updateOrderStatusDelivery(
        order._id,
        "ORDER_PREPARATION"
      );
      if (checkUpdate.success) {
        update(true);
        selected(order._id);
      }
    } catch (err) {}
  };

  return (
    <li className="p-4">
      <div className="flex flex-row justify-center px-5">
        <ButtonGroup className="flex-nowrap">
          <Button onClick={handleSelect}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <p>Commande ID {order._id}</p>
      </div>
    </li>
  );
};

export default OrderListCard;
