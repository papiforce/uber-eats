import {
  faEye,
  faEyeSlash,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { queryClient } from "../index";
import { useDeleteMeal, useUpdateMeal } from "api/mealQueries";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";

export default function ProductListCard({ product }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    time: product.time,
    photo: product.photo,
    type: product.type,
    quantity: product.quantity,
    isAvailable: product.isAvailable,
  });

  const handleOpenEdit = () => {
    setEditedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      time: product.time,
      photo: product.photo,
      type: product.type,
      quantity: product.quantity,
      isAvailable: product.isAvailable,
    });
    setOpenEdit(true);
  };

  const cancelButtonRef = useRef(null);

  const onDeleteMealSuccess = () => {
    queryClient.invalidateQueries(["menu"]);
  };

  const { mutate: mutateDelete } = useDeleteMeal(
    product._id,
    onDeleteMealSuccess
  );

  const handleDelete = () => {
    mutateDelete();
  };

  const onUpdateMealSuccess = () => {
    queryClient.invalidateQueries(["menu"]);
  };

  const { mutate: mutateUpdate } = useUpdateMeal(
    { mealId: product._id, data: editedProduct },
    onUpdateMealSuccess
  );

  const handleUpdate = () => {
    mutateUpdate(editedProduct);
    setOpenEdit(false);
  };

  return (
    <li className="p-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <img
            src={product.photo}
            alt={product.name}
            className="w-32 h-32 rounded-full"
            style={{ filter: "revert" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
            {product.name}
          </p>
          <p className="text-md text-gray-500 truncate dark:text-gray-400">
            {product.description}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <ul>
            <li className="mt-2">Prix : {product.price} </li>
            <li className="mt-2">Quantité : {product.quantity} </li>
            <li className="text-center fs-4 mt-2">
              {product.isAvailable ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row justify-center px-5">
        <ButtonGroup className="flex-nowrap">
          <Button onClick={() => handleOpenEdit()}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button onClick={() => setOpenDelete(true)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </ButtonGroup>
      </div>
      <Transition.Root show={openDelete} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenDelete}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                      <div className="mt-3 mx-auto text-center sm:ml-4 sm:mt-0 sm:text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Êtes-vous sûr de vouloir supprimer ce produit?
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDelete}
                    >
                      Oui
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenDelete(false)}
                      ref={cancelButtonRef}
                    >
                      Non
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openEdit}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenDelete}
        >
          <Transition.Child
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pt-4 sm:p-4 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                      <div className="mt-3 w-100 mx-auto text-center sm:ml-4 sm:mt-0 sm:text-start">
                        <Dialog.Title
                          as="h3"
                          className="fs-4 font-semibold leading-6 text-gray-900"
                        >
                          Modification
                        </Dialog.Title>

                        <Dialog.Description className="mt-5 font-semibold w-100 leading-6 text-gray-900">
                          <div className="mt-4">
                            <label
                              htmlFor="name"
                              className="block text-gray-600 text-start text-sm font-medium mb-1"
                            >
                              Nom
                            </label>
                            <input
                              type="text"
                              value={editedProduct.name}
                              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              onChange={(e) =>
                                setEditedProduct({
                                  ...editedProduct,
                                  name: e.target.value,
                                })
                              }
                              // Ajoutez d'autres champs en fonction de votre modèle de données
                            />
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="description"
                              className="block text-gray-600 text-start text-sm font-medium mb-1"
                            >
                              Description
                            </label>
                            <input
                              type="text"
                              value={editedProduct.description}
                              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              onChange={(e) =>
                                setEditedProduct({
                                  ...editedProduct,
                                  description: e.target.value,
                                })
                              }
                              // Ajoutez d'autres champs en fonction de votre modèle de données
                            />
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="price"
                              className="block text-gray-600 text-start text-sm font-medium mb-1"
                            >
                              Prix
                            </label>
                            <input
                              type="number"
                              value={editedProduct.price}
                              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              onChange={(e) =>
                                setEditedProduct({
                                  ...editedProduct,
                                  price: e.target.value,
                                })
                              }
                              // Ajoutez d'autres champs en fonction de votre modèle de données
                            />
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="time"
                              className="block text-gray-600 text-start text-sm font-medium mb-1"
                            >
                              Temps de préparation
                            </label>
                            <input
                              type="number"
                              value={editedProduct.time}
                              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              onChange={(e) =>
                                setEditedProduct({
                                  ...editedProduct,
                                  time: e.target.value,
                                })
                              }
                              // Ajoutez d'autres champs en fonction de votre modèle de données
                            />
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="photo"
                              className="block text-gray-600 text-start text-sm font-medium mb-1"
                            >
                              Photo
                            </label>
                            <input
                              type="text"
                              value={editedProduct.photo}
                              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              onChange={(e) =>
                                setEditedProduct({
                                  ...editedProduct,
                                  photo: e.target.value,
                                })
                              }
                              // Ajoutez d'autres champs en fonction de votre modèle de données
                            />
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="type"
                              className="block text-gray-600 text-start text-sm font-medium mb-1"
                            >
                              Type de produit
                            </label>
                            <select
                              name="type"
                              className="border border-gray-300 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
                              value={editedProduct.type}
                              onChange={(e) =>
                                setEditedProduct({
                                  ...editedProduct,
                                  type: e.target.value,
                                })
                              }
                            >
                              <option value="MEAL">Repas</option>
                              <option value="DESSERT">Dessert</option>
                            </select>
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="price"
                              className="block text-gray-600 text-start text-sm font-medium mb-1"
                            >
                              Quantité
                            </label>
                            <input
                              type="number"
                              value={editedProduct.quantity}
                              className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              onChange={(e) =>
                                setEditedProduct({
                                  ...editedProduct,
                                  quantity: e.target.value,
                                })
                              }
                              // Ajoutez d'autres champs en fonction de votre modèle de données
                            />
                          </div>
                          <div className="mt-4 text-start">
                            <label className="relative inline-flex items-center mb-5 cursor-pointer">
                              <input
                                type="checkbox"
                                value={editedProduct.isAvailable}
                                className="sr-only peer"
                                checked={editedProduct.isAvailable}
                                onChange={() =>
                                  setEditedProduct({
                                    ...editedProduct,
                                    isAvailable: !editedProduct.isAvailable,
                                  })
                                }
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                              <span className="ms-3 text-sm font-medium text-gray-600 dark:text-gray-500">
                                Visible
                              </span>
                            </label>
                          </div>
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Valider les modifications
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      ref={cancelButtonRef}
                      onClick={() => setOpenEdit(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </li>
  );
}
