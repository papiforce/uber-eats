import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faListAlt } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import CartModal from "./CartModal";
import BikePNG from "../assets/img/bike.png";
import Cookies from "js-cookie";

import { AuthContext } from "contexts/AuthContext";
import { OrderContext } from "contexts/OrderContext";

const Nav = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { latestOrder, setLatestOrder } = useContext(OrderContext);

  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [currentCart, setCurrentCart] = useState(
    auth.user && localStorage.getItem(`cart-${auth.user._id}`)
      ? JSON.parse(localStorage.getItem(`cart-${auth.user._id}`))
      : []
  );

  const handleCart = (actionType, productId) => {
    const isLogged = auth.user ? `cart-${auth.user._id}` : "cart";
    const cart = localStorage.getItem(isLogged);
    const parseCart = JSON.parse(cart);

    const productToUpdate = parseCart.find(
      (subItem) => subItem.id === productId
    );

    if (actionType === "REMOVE") {
      const updatedCart = parseCart.filter(
        (subItem) => subItem.id !== productId
      );

      setCurrentCart(updatedCart);
      return localStorage.setItem(isLogged, JSON.stringify(updatedCart));
    }

    if (actionType === "LESS") {
      if (productToUpdate.quantity === 1) {
        const updatedCart = parseCart.filter(
          (subItem) => subItem.id !== productId
        );

        setCurrentCart(updatedCart);
        return localStorage.setItem(isLogged, JSON.stringify(updatedCart));
      }

      productToUpdate.quantity -= 1;
      parseCart[parseCart.indexOf(productToUpdate)] = productToUpdate;
    }

    if (actionType === "MORE") {
      productToUpdate.quantity += 1;
      parseCart[parseCart.indexOf(productToUpdate)] = productToUpdate;
    }

    setCurrentCart(parseCart);
    return localStorage.setItem(isLogged, JSON.stringify(parseCart));
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    setLatestOrder(null);
    Cookies.remove("fe-token");

    navigate("/");
  };

  useEffect(() => {
    const isLogged = auth.user ? `cart-${auth.user._id}` : "cart";
    const cart = localStorage.getItem(isLogged);
    const parseCart = JSON.parse(cart);

    setCurrentCart(parseCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartModalOpen]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Navbar className="sticky top-0 z-10 max-w-full backdrop-blur-none shadow backdrop-saturate-100 bg-opacity-100 rounded-none border-0 px-4 py-3 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="cursor-pointer py-1.5 text-4xl text-black no-underline relative"
          >
            EXPRESS <span className="fw-bold"> FOOD</span>
          </Typography>
          <Typography as="a" href="/">
            <img className="w-12 m-auto hidden lg:block" alt="" src={BikePNG} />
          </Typography>

          <div className="flex items-center gap-4">
            {!auth.isAuthenticated ? (
              <div className="flex items-center gap-x-1">
                <Button
                  size="sm"
                  className="bg-transparant text-dark rounded-full"
                  onClick={
                    !auth.isAuthenticated
                      ? () => navigate("/login")
                      : () => setCartModalOpen(!isCartModalOpen)
                  }
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </Button>
                <Button
                  size="sm"
                  className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                  onClick={() => navigate("/login")}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span> Connexion</span>
                </Button>

                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden rounded-full lg:inline-block w-44"
                  onClick={() => navigate("/register")}
                >
                  <span>Inscription</span>
                </Button>
              </div>
            ) : (
              <>
                {auth.user && auth.user.role === "ADMIN" && (
                  <Button
                    size="sm"
                    className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                    onClick={() => navigate("/dashboard")}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span> Admin </span>
                  </Button>
                )}

                {auth.user &&
                  (auth.user.role === "ADMIN" ||
                    auth.user.role === "DELIVERY_PERSON") && (
                    <Button
                      size="sm"
                      className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                      onClick={() => navigate("/delivery-dashboard/orders")}
                    >
                      <FontAwesomeIcon icon={faListAlt} />
                      <span> Liste des livraisons </span>
                    </Button>
                  )}

                {latestOrder && (
                  <Button
                    variant="filled"
                    className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                    onClick={() => navigate("/current-order")}
                  >
                    Commande en cours
                  </Button>
                )}
                  <Button
                    variant="filled"
                    className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                    onClick={() => navigate("/orders")}
                  >
                    Mes commandes
                  </Button> 

                {/* {auth.user.role === "MEMBER" && (
                     <Button
                     variant="filled"
                     className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                     onClick={() => navigate("/current-order")}
                   >
                     MES COMMANDES
                   </Button>
                 )}   
                } */}

                <Button
                  size="sm"
                  className="bg-transparant text-dark rounded-full"
                  onClick={
                    !auth.isAuthenticated
                      ? () => navigate("/login")
                      : () => setCartModalOpen(!isCartModalOpen)
                  }
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </Button>
                <Button
                  size="sm"
                  className="bg-danger text-white rounded-full"
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
              </>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              <div className="HAMBURGER-ICON space-y-2">
                {!openNav && (
                  <>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                  </>
                )}
                {openNav && (
                  <>
                    <svg
                      className="h-8 w-8 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </>
                )}
              </div>
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {!auth.isAuthenticated ? (
            <>
              <Button
                size="sm"
                className="bg-white text-black border w-full"
                onClick={() => navigate("/login")}
              >
                <FontAwesomeIcon icon={faUser} />
                <span> Connexion</span>
              </Button>
              <Button
                variant="sm"
                className="bg-white text-black border w-full mt-2"
                onClick={() => navigate("/register")}
              >
                <span>Inscription</span>
              </Button>
            </>
          ) : (
            <>
              {auth.user && auth.user.role === "ADMIN" && (
                <>
                  <Button
                    size="sm"
                    className="bg-white text-black border w-full mt-2"
                    onClick={() => navigate("/dashboard")}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span> Admin </span>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white text-black border w-full mt-2"
                    onClick={() => navigate("/delivery-dashboard")}
                  >
                    <FontAwesomeIcon icon={faListAlt} />
                    <span> Liste des livraisons </span>
                  </Button>
                </>
              )}

              {latestOrder && (
               <> 
                <Button
                  variant="filled"
                  className="bg-white text-black border w-full mt-2"
                  onClick={() => navigate("/current-order")}
                >
                  Commande en cours
                </Button>
                <Button
                  variant="filled"
                  className="bg-white text-black border w-full mt-2"
                  onClick={() => navigate("/orders")}
                >
                  Mes commandes
                </Button>
                </>
              )}
              <Button
                size="sm"
                className="bg-danger text-white border w-full mt-2"
                onClick={logout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Button>
            </>
          )}
        </Collapse>
      </Navbar>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setCartModalOpen(!isCartModalOpen)}
        cartItems={currentCart}
        onHandleCart={(action, id) => handleCart(action, id)}
      />
    </>
  );
};

export default Nav;
