import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartModal from "./CartModal";

import { AuthContext } from "contexts/AuthContext";

const Nav = () => {
  const { auth } = useContext(AuthContext);
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

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Your list items go here */}
    </ul>
  );

  useEffect(() => {
    const isLogged = auth.user ? `cart-${auth.user._id}` : "cart";
    const cart = localStorage.getItem(isLogged);
    const parseCart = JSON.parse(cart);

    setCurrentCart(parseCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartModalOpen]);

  const handleAdminClick = () => {
    navigate("/admin");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Navbar
        className={`sticky top-0 z-10 max-w-full backdrop-blur-none shadow-none backdrop-saturate-100 bg-opacity-100 rounded-none border-0 px-4 py-3 lg:px-8 lg:py-4`}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 text-4xl text-black no-underline"
          >
            EXPRESS <span className="fw-bold"> FOOD</span>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
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
                {/* METTRE ICI LES ELEMENTS DU MENU QUAND TU ES CONNECTÉ */}
                {/* Onglet ADMIN pour accèder à l'interface admin */}
                {auth.user.role === "ADMIN" && (
                  <Button
                    size="sm"
                    className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                    onClick={handleAdminClick}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span> Admin </span>
                  </Button>
                )}
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
        <MobileNav open={openNav}>
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
                className="bg-white text-black border w-full"
                onClick={() => navigate("/register")}
              >
                <span>Inscription</span>
              </Button>
            </>
          ) : (
            <>
              {/* METTRE ICI LES ELEMENTS DU MENU QUAND TU ES CONNECTÉ */}
              {auth.user.role === "ADMIN" && (
                <Button
                  size="sm"
                  className="bg-white text-black border w-full"
                  onClick={handleAdminClick}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span> Admin </span>
                </Button>
              )}
            </>
          )}
        </MobileNav>
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
