import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListUsers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUsersList();
      }, []);

    const fetchUsersList = async () => {
        try {
          const response = await axios.get('http://localhost:4400/api/users');
          if (Array.isArray(response.data)) {
            setData(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };


    return (
    <>
        <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Liste des utilisateurs</h2>

        <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100">
            <tr>
                <th className="py-2 px-4 border-b">Prénom</th>
                <th className="py-2 px-4 border-b">Nom</th>
                <th className="py-2 px-4 border-b">Rôle</th>
            </tr>
            </thead>
            <tbody>
            {data.map((user) => (
                <tr key={user.id} className="transition-all hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.firstname}</td>
                <td className="py-2 px-4 border-b">{user.lastname}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
    );
}