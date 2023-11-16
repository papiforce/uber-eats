// import {
//   faEye,
//   faEyeSlash,
// } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function OrderCard({ order }) {

  return (
    <li class="p-4">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-shrink-0"></div>
        <div class="flex-1 min-w-0">
          <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
            {order.createdAt}
          </p>
          <p class="text-md text-gray-500 truncate dark:text-gray-400">
            {order.status}
          </p>
        </div>
        {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <ul>
            <li className="mt-2">Prix : {order.price} </li>
            <li className="mt-2">Quantité : {order.quantity} </li>
            <li className="text-center fs-4 mt-2">
              {order.isAvailable ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </li>
          </ul>
        </div> */}
      </div>
    </li>
  );
}
