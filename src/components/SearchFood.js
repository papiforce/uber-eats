import React from "react";

export default function SearchFood() {
  const backgroundImageUrl =
    "url(https://www.mashed.com/img/gallery/the-best-new-fast-food-menu-items-weve-tried-in-2023-so-far/l-intro-1682446897.jpg)";
  return (
    <>
      <div
        className="h-96 bg-cover bg-center flex flex-col items-center justify-start grayscale-[50%]"
        style={{ backgroundImage: backgroundImageUrl }}
      >
        <h2 className="text-xl md:text-4xl p-2 text-white rounded  m-auto  bg-black font-bold mb-1 text-center">
          EXPRESS FOOD
        </h2>

        <div className="text-white mx-4 m-auto mt-0  w-100">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Poulet rôti..."
              className="border border-gray-300 rounded text-dark w-8/12 focus:outline-none rounded-none p-2 mr-2"
            />
            <button className="bg-black rounded text-white rounded-none p-2">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
