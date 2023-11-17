import { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import { useGetOrders } from "api/orderQueries";
import OrderListCard from "components/OrderListCard";

const FreeOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [updateOrderSuccess, setupdateOrderSuccesss] = useState(false);
  const [selectedOrder, setselectedOrder] = useState(null);

  const onGetOrdersSuccess = (payload) => {
    setOrders(payload.free);
  };

  useGetOrders("", onGetOrdersSuccess);

  useEffect(() => {
    if (updateOrderSuccess) {
      setOrders(orders.filter((orders) => orders._id !== selectedOrder));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder]);

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <ul className="divide-y">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderListCard
                order={order}
                key={order._id}
                update={setupdateOrderSuccesss}
                selected={setselectedOrder}
              />
            ))
          ) : (
            <p className="mx-auto my-0 max-w-max">Aucune commande en attente</p>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default FreeOrdersPage;
