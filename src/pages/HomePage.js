// HomePage.js
import { useState } from "react";
import SearchFood from "../components/SearchFood";
import Layout from "./layouts/Layout";
import { useGetMenu } from "api/mealQueries";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);

  const onSuccess = (payload) => {
    setProducts(payload);
  };

  useGetMenu("?onlyActive=true", onSuccess);

  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));
  };

  return (
    <Layout>
      <SearchFood />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-4">Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              quantity={quantities[product._id] || 0}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
