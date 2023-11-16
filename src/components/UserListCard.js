
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Button, ButtonGroup } from "@material-tailwind/react";
import React, { useState } from 'react';


export default function UserListCard({user}) {

      const [openEdit, setOpenEdit] = useState(false);


    // const [editeduser, setEditeduser] = useState({
    //   firstname: user.name,
    //   lastname: user.description,
    //   address: user.price,
    //   email: user.time,
    //   role: user.photo,
    // });

    // const handleOpenEdit = () => {
    //   setEditeduser({
    //     firstname: user.name,
    //     lastname: user.description,
    //     address: user.price,
    //     email: user.time,
    //     role: user.photo,
    //   });
    //   setOpenEdit(true);
    // };


    //     const onUpdateUserSuccess = () => {
    //       queryClient.invalidateQueries(["menu"]);
    //     };

    //     const { mutate: mutateUpdate } = useUpdateUser(
    //       { mealId: user._id, data: editeduser },
    //       onUpdateUserSuccess
    //     );

    //     const handleUpdate = () => {
    //       mutateUpdate(editeduser);
    //       setOpenEdit(false);
    //     };
  return (
    <>
      <tr key={user.id} className="transition-all hover:bg-gray-50">
        <td className="py-2 px-4 border-b">{user.firstname}</td>
        <td className="py-2 px-4 border-b">{user.lastname}</td>
        <td className="py-2 px-4 border-b hidden sm:table-cell">
          {user.role === "ADMIN"
            ? "Administrateur"
            : user.role === "MEMBER"
            ? "Client"
            : "Livreur"}
        </td>
        <td className="py-2 px-4 border-b hidden xl:table-cell">
          {user.email}
        </td>
        <td className="py-2 px-4 border-b">
          <ButtonGroup className="w-100">
            <Button
              className="rounded-start w-50"
              onClick={() => {
                setOpenEdit(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button className="rounded-end w-50">
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </ButtonGroup>
        </td>
      </tr>
      <div>
        <Transition.Root show={openEdit}>
          <Dialog as="div" onClose={setOpenEdit} className="relative z-10">
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
                                htmlFor="lastname"
                                className="block text-gray-600 text-start text-sm font-medium mb-1"
                              >
                                Nom
                              </label>
                              <input
                                type="text"
                                value={user.lastname}
                                className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                htmlFor="firstname"
                                className="block text-gray-600 text-start text-sm font-medium mb-1"
                              >
                                Prénom
                              </label>
                              <input
                                type="text"
                                value={user.firstname}
                                className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                htmlFor="email"
                                className="block text-gray-600 text-start text-sm font-medium mb-1"
                              >
                                email
                              </label>
                              <input
                                type="mail"
                                value={user.email}
                                className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                htmlFor="Address"
                                className="block text-gray-600 text-start text-sm font-medium mb-1"
                              >
                                Adresse
                              </label>
                              <input
                                type="text"
                                value={user.address.address}
                                className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                htmlFor="name"
                                className="block text-gray-600 text-start text-sm font-medium mb-1"
                              >
                                Rôle
                              </label>
                              <input
                                type="text"
                                value={user.lastname}
                                className="border border-gray-300  rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
                              />
                            </div>
                          </Dialog.Description>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Valider les modifications
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenEdit(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
      </div>
    </>
  );
}
