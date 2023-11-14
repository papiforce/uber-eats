import { useState } from "react";
import SearchFood from "../components/SearchFood";
import Layout from "./layouts/Layout";
import { useGetMenu } from "api/mealQueries";

const HomePage = () => {
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);

  const onSuccess = (payload) => {
    setProducts(payload);
  };

  useGetMenu(onSuccess);

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
            <div
              key={product._id}
              className="bg-white p-0 rounded-md shadow-md"
            >
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-56 object-cover mb-4 rounded-t-md"
                style={{ filter: "revert" }}
              />
              <div className="px-3 pb-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{product.price}€</span>
                  <div className="flex items-center">
                    <button
                      className="bg-black text-white px-4 py-2 rounded-l-md"
                      onClick={() => handleDecrement(product._id)}
                    >
                      -
                    </button>
                    <span className="px-4">{quantities[product._id] || 0}</span>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-r-md"
                      onClick={() => handleIncrement(product._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="mt-4 bg-black text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    alert(
                      `Added ${quantities[product._id] || 0} ${
                        product.name
                      }(s) to cart`
                    )
                  }
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
