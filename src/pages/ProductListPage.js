import { useState } from "react";
import { useGetMenu } from "api/mealQueries";

import Layout from "./layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { ButtonGroup, Button  } from "@material-tailwind/react";


const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  const onSuccess = (payload) => {
    setProducts(payload);
  };

  useGetMenu(onSuccess);

  return (
    <Layout>
      <div class="w-full max-w-6xl mx-auto bg-white border  border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <ul class="divide-y">
          {products.map((product) => (
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
                  $320
                </div>
              </div>
              <div className="flex flex-row justify-center px-5">
                <ButtonGroup className="flex-nowrap">
                  <Button>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </ButtonGroup>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
export default ProductListPage;
