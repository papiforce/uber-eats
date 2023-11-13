import React from "react";

export default function SearchFood() {
  const backgroundImageUrl =
    "url(https://www.mashed.com/img/gallery/the-best-new-fast-food-menu-items-weve-tried-in-2023-so-far/l-intro-1682446897.jpg)";
  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex items-center justify-start"
        style={{ backgroundImage: backgroundImageUrl }}
        
      >
        <div className="text-white mx-4 w-100">
          <h2 className="text-xl md:text-4xl font-bold mb-4 text-center">
            Rechercher un produit
          </h2>
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Rechercher..."
              className="border border-gray-300 text-dark w-3/5 focus:outline-none rounded-none p-2 mr-2"
            />
            <button className="bg-black text-white rounded-none p-2">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
