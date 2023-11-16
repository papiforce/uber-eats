import { useState } from "react";
import Layout from "./layouts/Layout";
import ProductListCard from "components/ProductListCard";
import { useGetMenu } from "api/mealQueries";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  const onGetMenuSuccess = (payload) => {
    setProducts(payload);
  };

  useGetMenu("?onlyActive=false", onGetMenuSuccess);

  return (
    <Layout>
      <div class="w-full max-w-6xl mx-auto bg-white border  border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
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
