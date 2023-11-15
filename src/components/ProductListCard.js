import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { queryClient } from "../index";
import { useDeleteMeal } from "api/mealQueries";

export default function ProductListCard({ product }) {

  const onDeleteMealSuccess = (payload) => {
    queryClient.invalidateQueries(["menu"]);
  };

  const { mutate } = useDeleteMeal(product._id, onDeleteMealSuccess);

  const handleDelete = () => {
    mutate();
  };
  
  return (
    <li class="p-4">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-shrink-0">
          <img
            src={product.photo}
            alt={product.name}
            class="w-32 h-32 rounded-full"
            style={{ filter: "revert" }}
          />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
            {product.name}
          </p>
          <p class="text-md text-gray-500 truncate dark:text-gray-400">
            {product.description}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {product.price}
        </div>
      </div>
      <div className="flex flex-row justify-center px-5">
        <ButtonGroup className="flex-nowrap">
          <Button>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </ButtonGroup>
      </div>
    </li>
  );
}
