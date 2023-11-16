import { useEffect, useContext } from "react";
import { useNavigate, useLocation  } from "react-router-dom";

import { AuthContext } from "contexts/AuthContext";

const SecurityGuard = ({
  unloggedRedirectionPath = null,
  loggedRedirectionPath = null,
  children,
}) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (unloggedRedirectionPath && !auth.isAuthenticated) {
      return navigate(unloggedRedirectionPath);
    }

    if (loggedRedirectionPath && auth.isAuthenticated) {
      return navigate(loggedRedirectionPath);
    }

    // Empêcher aux utilisateurs connecté ou nas d'accèder à la page admin
    if (location.pathname.includes('/admin') && (!auth.isAuthenticated || auth.user.role !== "ADMIN")) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default SecurityGuard;
