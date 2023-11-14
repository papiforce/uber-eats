import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function AddMenu() {
    const [formMenu, setFormMenu] = useState({
        name: "",
        description: "",
        price: "",
        photo: "",
        time: "",
        type: "",
    });

    // Ajouter un nouveau menu
    const handleAddMeal = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('http://localhost:4400/api/meals/add', formMenu);
          // Réinitialisez le formulaire  après
          setFormMenu({
            name: '',
            description: '',
            price: '',
            photo: '',
            time: '',
            type: '',
          });
          console.log(response.data); // Affichez la réponse du serveur
        } catch (error) {
          console.error('Erreur lors de l\'ajout du plat', error);
        }
      };

    
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl text-center mb-5 font-semibold mb-4">
        Ajouter un menu
      </h1>
      <form  className="max-w-md mt-5 mx-auto"
             onSubmit={handleAddMeal} >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formMenu.name}
            onChange={(e) => setFormMenu({ ...formMenu, name: e.target.value })}
            className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none  p-2 mr-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formMenu.description}
            onChange={(e) => setFormMenu({ ...formMenu, description: e.target.value })}
            className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Prix €
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formMenu.price}
            onChange={(e) => setFormMenu({ ...formMenu, price: e.target.value })}
            className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Image
          </label>
          <textarea
            id="photo"
            name="photo"
            value={formMenu.photo}
            onChange={(e) => setFormMenu({ ...formMenu, photo: e.target.value })}
            className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Temps
          </label>
          <input
            type="number"
            id="time"
            name="time"
            value={formMenu.time}
            onChange={(e) => setFormMenu({ ...formMenu, time: e.target.value })}
            className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-gray-600 text-sm font-medium mb-1"
          >
            Type : 
          </label>
          <input 
          list="typeOfMeal" 
          id="type" 
          name="type" 
          onChange={(e) => setFormMenu({ ...formMenu, type: e.target.value })}
          className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
          />
            <datalist id="typeOfMeal">
                <option value="MEAL">Plat</option>
                <option value="DESSERT">Dessert</option>
            </datalist>
      
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  )
}
