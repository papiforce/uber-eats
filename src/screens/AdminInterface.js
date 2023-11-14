import React from 'react'
import { useNavigate } from "react-router-dom";


export default function AdminInterface() {

const navigate = useNavigate();

const handleAddMenuClick = () => {
    // Naviguer vers la page "Ajouter un menu"
    navigate("/addMenu"); 
};

const handleMenuListClick = () => {
    // Naviguer vers la page "Ajouter un menu"
    navigate("/menu"); 
};

  return (
    <>
        <div>
            <div class="bg-white p-6 rounded-md">
                <h1 class="text-2xl font-semibold mb-4">Bonjour Template</h1>
            </div>
        </div>

        <div class="max-w-1xl mx-auto lg:flex lg:justify-center">
            <div class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow-md mr-4">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                </svg>
                    <h2 class="text-xl font-semibold mb-2">Voir les menus</h2>
            </div>

            <div class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow-md mr-4"
                 onClick={handleAddMenuClick}
            >
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                    <h2 class="text-xl font-semibold mb-2">Ajouter un nouveau menu</h2>
            </div>

            <div class="flex flex-col justify-center items-center gap-8 bg-white m-6 p-6 rounded-md shadow-md mr-4">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
                    <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                </svg>
                    <h2 class="text-xl font-semibold mb-2">Voir les utilisateurs</h2>
            </div>
    
        </div>
    </>

  )
}
