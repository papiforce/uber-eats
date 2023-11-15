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

  useGetMenu(onSuccess);

  const addToCart = (product) => {
    const cart = localStorage.getItem(`cart-${auth.user._id}`);

    if (!cart)
      return localStorage.setItem(
        `cart-${auth.user._id}`,
        JSON.stringify({
          userId: auth.user._id,
          productIds: [{ productId: product._id, product }],
          address: auth.user.address ?? "",
        })
      );

    const parseCart = JSON.parse(cart);
    const { productIds } = parseCart;

    const productInCart = productIds.find(
      (subItem) => subItem.itemId === product._id
    );

    if (productInCart) {
      productInCart.product.quantity += product.quantity;
      productIds[productIds.indexOf(productInCart)] = productInCart;

      const updatedCart = { ...parseCart, productIds };

      return localStorage.setItem(
        `cart-${auth.user._id}`,
        JSON.stringify(updatedCart)
      );
    }

    productIds.push({
      productId: product._id,
      product,
    });

    const updatedCart = { ...parseCart, productIds };

    return localStorage.setItem(
      `cart-${auth.user._id}`,
      JSON.stringify(updatedCart)
    );
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
