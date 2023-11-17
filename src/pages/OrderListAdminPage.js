import { useGetOrders } from "api/orderQueries";
import { useState } from "react";
import Layout from "./layouts/Layout";
import OrderCardAdmin from "components/OrderCardAdmin";

export default function OrderListAdminPage() {
  const [orders, setOrders] = useState([]);

  const onGetOrderSuccess = (payload) => {
    setOrders(payload);
  };

  useGetOrders("?onlyActive=false", onGetOrderSuccess);
  return (
    <div>
      <Layout>
        <h2 className="text-center w-100 mt-5">Liste des livraisons</h2>

        <div class="w-full max-w-6xl mx-auto bg-white border  border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <ul class="divide-y">
            {orders.map((order) => (
              <OrderCardAdmin order={order} key={order._id} />
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
