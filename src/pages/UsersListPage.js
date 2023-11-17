import React, { useState } from "react";
import Layout from "./layouts/Layout";
import { useGetUsers } from "api/userQueries";
import UserListCard from "components/UserListCard";

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  

  const onGetUsersSuccess = (payload) => {
    setUsers(payload);
  };

  useGetUsers("?onlyActive=false", onGetUsersSuccess);

  return (
    <>
      <Layout>
        <h2 className="text-center w-100 px-5 mt-5">Liste des utilisateurs</h2>
        <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 my-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 p-3 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Prénom</th>
                <th className="py-2 px-4 border-b">Nom</th>
                <th className="py-2 px-4 border-b hidden sm:table-cell">Rôle</th>
                <th className="py-2 px-4 border-b hidden xl:table-cell">
                  Email
                </th>
                <th className="py-2 px-4 border-b">Modifier</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <>
                  <UserListCard user={user} />
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}
