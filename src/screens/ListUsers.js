import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({}); // État pour stocker les rôles sélectionnés par utilisateur

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4400/api/users/");
        setUsers(response.data);

        // Initialise les rôles sélectionnés avec le rôle actuel de chaque utilisateur
        const initialSelectedRoles = {};
        response.data.forEach((user) => {
          initialSelectedRoles[user._id] = user.role || "";
        });
        setSelectedRoles(initialSelectedRoles);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId) => {
    try {
      // Envoyer la requête PUT pour mettre à jour le rôle avec la valeur de selectedRoles[userId]
      await axios.put(`http://localhost:4400/api/users/update/${userId}`, {
        role: selectedRoles[userId],
      });

      // Mettre à jour localement le rôle de l'utilisateur
      setUsers((prevUsers) => {
        return prevUsers.map((user) =>
          user._id === userId ? { ...user, role: selectedRoles[userId] } : user
        );
      });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du rôle de l'utilisateur :",
        error
      );
    }
  };

  return (
    <>
      <ul className="divide-y w-50 m-auto divide-gray-100">
        {users.map((user) => (
          <li key={user.email} className="flex justify-between gap-x-6 py-3">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {user.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{user.role}</p>
              {/* Menu déroulant pour sélectionner le nouveau rôle */}
              <select
                value={selectedRoles[user._id] || ""}
                onChange={(e) =>
                  setSelectedRoles((prevRoles) => ({
                    ...prevRoles,
                    [user._id]: e.target.value,
                  }))
                }
                className="mt-1 text-xs leading-5 text-blue-500"
              >
                <option value="">Sélectionner un rôle</option>
                <option value="MEMBER">Membre</option>
                <option value="DELIVERY_PERSON">Livreur</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button
                onClick={() => updateUserRole(user._id)}
                className="mt-1 text-xs leading-5 text-blue-500 cursor-pointer hover:underline"
              >
                Mettre à jour le rôle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
