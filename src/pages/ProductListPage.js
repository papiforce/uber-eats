import { useState } from "react";
import Layout from "./layouts/Layout";
import ProductListCard from "components/ProductListCard";
import { useGetMenu } from "api/mealQueries";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const ProductListPage = () => {
  const [products, setProducts] = useState([]);
    const navigate = useNavigate();

  const onGetMenuSuccess = (payload) => {
    setProducts(payload);
  };

  useGetMenu("?onlyActive=false", onGetMenuSuccess);

  return (
    <Layout>
      <h2 className="text-center w-100 px-5 mt-5">Liste des produits</h2>

      <div className="flex mt-5 justify-center">
        <Button onClick={() => navigate("/dashboard/product/form")}>
          <FontAwesomeIcon icon={faCirclePlus} /> Ajouter
        </Button>
      </div>
      <div class="w-full max-w-6xl mx-auto bg-white border  border-gray-200 mt-4 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <ul class="divide-y">
          {products.map((product) => (
            <ProductListCard product={product} key={product._id} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};
export default ProductListPage;
