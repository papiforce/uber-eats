import { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import { useGetOrders } from "api/orderQueries";
import OrderListCard from "components/OrderListCard";

const DeliveryOrdersPage = () => {
  const [orders, setOrders] = useState({
    free: [],
    pending: [],
    finish: [],
  });
  const [updateOrderSuccess, setupdateOrderSuccesss] = useState(false);
  const [selectedOrder, setselectedOrder] = useState(null);

  const noOrders =
    orders.free.length === 0 &&
    orders.pending.length === 0 &&
    orders.finish.length === 0;

  const onGetOrdersSuccess = (payload) => {
    setOrders(payload);
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
        <ul className="divide-y mb-0">
          {noOrders && (
            <p className="mx-auto my-0 max-w-max">Aucune commande</p>
          )}

          {orders && orders.free.length > 0 && (
            <>
              <p className="mt-3 border-none fw-bold">En attente</p>
              {orders.free.map((order, index) => (
                <div key={`free-${index}`}>
                  <OrderListCard
                    order={order}
                    key={order._id}
                    update={setupdateOrderSuccesss}
                    selected={setselectedOrder}
                  />
                </div>
              ))}
            </>
          )}

          {orders && orders.pending.length > 0 && (
            <>
              <p className="mt-3 border-none fw-bold">Livraisons en cours</p>
              {orders.pending.map((order, index) => (
                <div key={`pending-${index}`}>
                  <OrderListCard
                    order={order}
                    key={order._id}
                    update={setupdateOrderSuccesss}
                    selected={setselectedOrder}
                  />
                </div>
              ))}
            </>
          )}

          {orders && orders.finish.length > 0 && (
            <>
              <p className="mt-3 border-none fw-bold">Livraisons terminées</p>
              {orders.finish.map((order, index) => (
                <div key={`finish-${index}`}>
                  <OrderListCard
                    order={order}
                    key={order._id}
                    update={setupdateOrderSuccesss}
                    selected={setselectedOrder}
                  />
                </div>
              ))}
            </>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default DeliveryOrdersPage;
