import { useState, useContext } from "react";
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

  const backgroundImageUrl =
    "url(https://www.mashed.com/img/gallery/the-best-new-fast-food-menu-items-weve-tried-in-2023-so-far/l-intro-1682446897.jpg)";

  return (
    <Layout>
      <div
        className="h-96 bg-cover bg-center flex flex-col items-center justify-start grayscale-[50%]"
        style={{ backgroundImage: backgroundImageUrl }}
      >
        <h2 className="text-xl md:text-4xl p-2 text-white rounded  mt-5  bg-black font-bold mb-1 text-center">
          EXPRESS FOOD
        </h2>
      </div>
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
