import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./layouts/Layout";

export default function ListUsersPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    try {
      const response = await axios.get("http://localhost:4400/api/users");
      if (Array.isArray(response.data)) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <h2 className="text-center w-100 px-5 mt-5">Liste des utilisateurs</h2>
        <div className="w-full max-w-6xl mx-auto bg-white border  border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 p-3">
          <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
            <thead >
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
      </Layout>
    </>
  );
}