import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterClick = () => {
    // Naviguer vers la page d'inscription
    navigate("/Registration"); 
  };

  const handleLoginClick = () => {
    // Naviguer vers la page connexion
    navigate("/login"); 
  };


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const isRegistrationPage = location.pathname === "/Registration";
  const isLoginPage = location.pathname === "/login";


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
              onClick={handleLoginClick}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
            {!isRegistrationPage && !isLoginPage && (
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
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit  active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {/* Your icon code goes here */}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}></MobileNav>
      </Navbar>
    </>
  );}