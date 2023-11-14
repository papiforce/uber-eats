import React, { useState } from "react";
import SearchFood from "../components/SearchFood";

const products = [
  {
    id: 1,
    name: "Burger",
    description: "Lorem Ipsum",
    price: "$10.99",
    image:
      "https://www.doitinparis.com/files/2023/bars-restos/burger/04/specimen/burger-specimen.jpg",
  },
  {
    id: 2,
    name: "Pizza",
    description: "Lorem Ipsum",
    price: "$12.99",
    image:
      "https://tb-static.uber.com/prod/image-proc/processed_images/ef276e555d968f8aaa23a59fbbb29454/859baff1d76042a45e319d1de80aec7a.jpeg",
  },
  {
    id: 3,
    name: "Pâte",
    description: "Delicious pasta with homemade sauce.",
    price: "$9.99",
    image:
      "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
  },
  {
    id: 4,
    name: "Salad",
    description: "Fresh and healthy salad with a variety of greens.",
    price: "$8.99",
    image:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/08/Greek-Salad-main.jpg",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    description: "Decadent chocolate cake topped with ganache.",
    price: "$7.99",
    image:
      "https://img.cuisineaz.com/660x660/2022/06/16/i184278-shutterstock-342885410.jpeg",
  },
  {
    id: 6,
    name: "Cheesecake",
    description: "Creamy cheesecake with your choice of topping.",
    price: "$6.99",
    image:
      "https://liliebakery.fr/wp-content/uploads/2023/06/Recette-cheesecake-framboise-Lilie-Bakery.jpg",
  },
  // Add more products as needed
];

const ListProduct = () => {
  const [quantities, setQuantities] = useState({});

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
    <>
    <SearchFood />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-4">Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-0 rounded-md shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover mb-4 rounded-t-md"
                style={{filter: 'revert'}}
              />
              <div className="px-3 pb-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{product.price}</span>
                  <div className="flex items-center">
                    <button
                      className="bg-black text-white px-4 py-2 rounded-l-md"
                      onClick={() => handleDecrement(product.id)}
                    >
                      -
                    </button>
                    <span className="px-4">{quantities[product.id] || 0}</span>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-r-md"
                      onClick={() => handleIncrement(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="mt-4 bg-black text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    alert(
                      `Added ${quantities[product.id] || 0} ${
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
    </>
  );
};

export default ListProduct;
