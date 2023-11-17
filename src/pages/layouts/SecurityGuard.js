import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "contexts/AuthContext";

const SecurityGuard = ({
  unloggedRedirectionPath = null,
  loggedRedirectionPath = null,
  adminRedirectionPath = null,
  deliveryRedirectionPath = null,
  children,
}) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (unloggedRedirectionPath && !auth.isAuthenticated) {
      return navigate(unloggedRedirectionPath);
    }

    if (loggedRedirectionPath && auth.isAuthenticated) {
      return navigate(loggedRedirectionPath);
    }

    if (
      adminRedirectionPath &&
      ((auth.isAuthenticated && auth.user.role !== "ADMIN") ||
        !auth.isAuthenticated)
    ) {
      return navigate(adminRedirectionPath);
    }
    if (
      deliveryRedirectionPath &&
      ((auth.isAuthenticated &&
        auth.user.role !== "DELIVERY_PERSON" &&
        auth.user.role !== "ADMIN") ||
        !auth.isAuthenticated)
    ) {
      return navigate(deliveryRedirectionPath);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default SecurityGuard;
