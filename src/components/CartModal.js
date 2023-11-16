import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const CartModal = ({ isOpen, onClose, cartItems, onHandleCart }) => {
  const navigate = useNavigate();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                      {cartItems.length > 0 ? (
                        <ul>
                          {cartItems.map((item, idx) => {
                            return (
                              <li className="mt-4" key={idx}>
                                <div className="flex">
                                  <div className="flex-auto m-auto w-56">
                                    <img
                                      src={item.photo}
                                      alt={item.name}
                                      className="w-full m-auto rounded-t-md"
                                      style={{ filter: "revert" }}
                                    />
                                  </div>

                                  <div className="m-auto fw-bold  w-75">
                                    {item.name}
                                  </div>
                                  <div className="m-auto w-100">
                                    <button
                                      className="bg-black text-white px-4 py-2 rounded-l-md"
                                      onClick={() =>
                                        onHandleCart("LESS", item.id)
                                      }
                                    >
                                      -
                                    </button>
                                    <span className="px-4">
                                      {item.quantity}
                                    </span>
                                    <button
                                      className="bg-black text-white px-4 py-2 rounded-r-md"
                                      onClick={() =>
                                        onHandleCart("MORE", item.id)
                                      }
                                    >
                                      +
                                    </button>

                                    <button
                                      className="bg-red-500 ms-2 mt-2 m-auto text-white px-4 py-2 rounded-md ml-4"
                                      onClick={() =>
                                        onHandleCart("REMOVE", item.id)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p>Votre panier est vide</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => navigate(`/payment`)}
                    disabled={cartItems.length === 0}
                    style={{
                      cursor:
                        cartItems.length === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    Payer
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose(false)}
                  >
                    Fermer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartModal;
