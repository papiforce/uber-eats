import { useState, useContext } from "react";
import SearchFood from "../components/SearchFood";
import Layout from "./layouts/Layout";
import { useGetMenu } from "api/mealQueries";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "contexts/AuthContext";

const HomePage = () => {
  const { auth } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  const onSuccess = (payload) => {
    setProducts(payload);
  };

  useGetMenu("?onlyActive=true", onSuccess);

  const addToCart = (product) => {
    const isLogged = auth.user ? `cart-${auth.user._id}` : "cart";
    const cart = localStorage.getItem(isLogged);

    if (!cart)
      return localStorage.setItem(isLogged, JSON.stringify([{ ...product }]));

    const parseCart = JSON.parse(cart);

    const productInCart = parseCart.find(
      (subItem) => subItem.id === product.id
    );

    if (productInCart) {
      productInCart.quantity += product.quantity;
      parseCart[parseCart.indexOf(productInCart)] = productInCart;
    } else {
      parseCart.push(product);
    }

    return localStorage.setItem(isLogged, JSON.stringify(parseCart));
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
              onClick={(product) => addToCart(product)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
