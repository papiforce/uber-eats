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
import CartModal from "./CartModal"; // Adjust the path based on your project structure

import { AuthContext } from "contexts/AuthContext";

export default function Nav() {
  const { auth } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Your list items go here */}
    </ul>
  );

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
            <Button
              size="sm"
              className="bg-transparant text-dark rounded-full"
              onClick={
                !auth.isAuthenticated ? handleLoginClick : toggleCartModal
              }
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
            {!auth.isAuthenticated ? (
              <div className="flex items-center gap-x-1">
                <Button
                  size="sm"
                  className="hidden rounded-full bg-white text-black border lg:inline-block w-44"
                  onClick={handleLoginClick}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span> Connexion</span>
                </Button>

                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden rounded-full lg:inline-block w-44"
                  onClick={handleRegisterClick}
                >
                  <span>Inscription</span>
                </Button>
              </div>
            ) : (
              <>{/* METTRE ICI LES ELEMENTS DU MENU QUAND TU ES CONNECTÉ */}</>
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
                onClick={handleLoginClick}
              >
                <FontAwesomeIcon icon={faUser} />
                <span> Connexion</span>
              </Button>
              <Button
                variant="sm"
                className="bg-white text-black border w-full"
                onClick={handleRegisterClick}
              >
                <span>Inscription</span>
              </Button>
            </>
          ) : (
            <>{/* METTRE ICI LES ELEMENTS DU MENU QUAND TU ES CONNECTÉ */}</>
          )}
        </MobileNav>
      </Navbar>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={toggleCartModal}
        cartItems={cartItems}
      />
    </>
  );
}
