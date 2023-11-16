import { faEye, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { updateOrderStatusDelivery } from "api/orderQueries";
import { useState } from "react";

export default function OrderListCard({ order, update , selected}) {

 console.log(order);
  const [openEdit, setOpenEdit] = useState(false);

  const [editedOrder, setEditedOrder] = useState({
    id: order._id,
    status: order.status,
    // Ajoutez d'autres champs en fonction de votre modèle de données
  });

  const handleSelect = async () => {
    try {
        const checkUpdate = 

        await updateOrderStatusDelivery(
            order._id, 
            "ORDER_PREPARATION"
            
          );
          if(checkUpdate.success) {
            update(true);
            selected(order._id);
          }
          setOpenEdit(true);
    }
    catch (err) {
    }
  };

  console.log(`test order ${order}`);
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
        <p>Commande ID {editedOrder.id}</p>
      </div>
    </li>
  );
}