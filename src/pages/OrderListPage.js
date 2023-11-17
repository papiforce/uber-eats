import { useState } from "react";
import Layout from "./layouts/Layout";
import { useGetOrders } from "api/orderQueries";
import OrderCard from "components/OrderCard";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

  const onGetOrderSuccess = (payload) => {
    setOrders(payload);
  };

  useGetOrders("", onGetOrderSuccess);

  return (
    <Layout>
      <h2 className="text-center w-100 mt-5">Liste de mes commandes</h2>

      <div className="w-full max-w-6xl mx-auto bg-white border  border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <ul className="divide-y">
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};
export default OrderListPage;
