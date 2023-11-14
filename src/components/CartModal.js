import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function CartModal({ isOpen, onClose, cartItems }) {
  const cancelButtonRef = useRef(null);

  const [currentCartItems, setCurrentCartItems] = useState(cartItems);

  const [quantities, setQuantities] = useState(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.productId] = item.quantity || 1;
    });
    return initialQuantities;
  });

  useEffect(() => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {};
      cartItems.forEach((item) => {
        updatedQuantities[item.productId] = item.quantity || 1;
      });
      return updatedQuantities;
    });
  }, [isOpen, cartItems]);

  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 1),
    }));
  };

const handleRemove = (productId) => {
  // Mise à jour du local storage avec les quantités actuelles après suppression
  const updatedCart = cartItems.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Mise à jour des quantités sans dépendre de l'état actuel de cartItems
  setQuantities((prevQuantities) => {
    const { [productId]: removedItem, ...rest } = prevQuantities;
    return rest;
  });

  // Mise à jour de la liste actuelle des produits dans le panier
  setCurrentCartItems(updatedCart);
};

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-6/12">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="mt-2 p-0">
                      <ul>
                        {currentCartItems.map((item, index) => (
                          <li className="mt-4" key={index}>
                            <div className="flex">
                              <div className="flex-auto m-auto w-56">
                                <img
                                  src={item.productPhoto}
                                  alt={item.productName}
                                  className="w-full m-auto rounded-t-md"
                                  style={{ filter: "revert" }}
                                />
                              </div>

                              <div className="m-auto fw-bold  w-75">
                                {item.productName}
                              </div>
                              <div className="m-auto w-100">
                                <button
                                  className="bg-black text-white px-4 py-2 rounded-l-md"
                                  onClick={() =>
                                    handleDecrement(item.productId)
                                  }
                                >
                                  -
                                </button>
                                <span className="px-4">
                                  {quantities[item.productId] || 1}
                                </span>
                                <button
                                  className="bg-black text-white px-4 py-2 rounded-r-md"
                                  onClick={() =>
                                    handleIncrement(item.productId)
                                  }
                                >
                                  +
                                </button>

                                <button
                                  className="bg-red-500 ms-2 mt-2 m-auto text-white px-4 py-2 rounded-md ml-4"
                                  onClick={() => handleRemove(item.productId)}
                                >
                                  <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => onClose(false)}
                  >
                    Valider
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose(false)}
                    ref={cancelButtonRef}
                  >
                    Retour
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
