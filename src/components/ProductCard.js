import { useState } from "react";

const ProductCard = ({ product, onClick }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type, value) => {
    if (type === "LESS") {
      if (quantity === 1) return;
    }

    return setQuantity(value);
  };

  return (
    <div className="bg-white p-0 rounded-md shadow-md">
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
              onClick={() => handleQuantity("LESS", quantity - 1)}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="bg-black text-white px-4 py-2 rounded-r-md"
              onClick={() => handleQuantity("MORE", quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="mt-4 bg-black text-white px-4 py-2 rounded-md"
          onClick={() => {
            if (quantity === 0) return;

            onClick({
              photo: product.photo,
              name: product.name,
              price: product.price,
              time: product.time,
              quantity,
            });
          }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
