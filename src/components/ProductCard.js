// ProductCard.js
import React from "react";

const ProductCard = ({ product, onDecrement, onIncrement, quantity }) => {
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
              onClick={() => onDecrement(product._id)}
            >
              -
            </button>
            <span className="px-4">{quantity || 0}</span>
            <button
              className="bg-black text-white px-4 py-2 rounded-r-md"
              onClick={() => onIncrement(product._id)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="mt-4 bg-black text-white px-4 py-2 rounded-md"
          onClick={() =>
            alert(`Added ${quantity || 0} ${product.name}(s) to cart`)
          }
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
