import { useState } from "react";
import Layout from "./layouts/Layout";
import { useGetOrders } from "api/orderQueries";
import OrderCard from "components/OrderCard";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

  const onGetOrderSuccess = (payload) => {
    setOrders(payload.free.concat(payload.pending, payload.finish));
  };

  useGetOrders("", onGetOrderSuccess);

  return (
    <div>
      <Layout>
        <h2 className="text-center w-100 mt-5">Liste de mes commandes</h2>

        <div className="w-full max-w-6xl mx-auto bg-white border  border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <ul className="divide-y mb-0">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard order={order} key={order._id} />
              ))
            ) : (
              <p className="mx-auto mb-0 max-w-max">Aucune commande</p>
            )}
          </ul>
        </div>
      </Layout>
    </div>
  );
};
export default OrderListPage;
