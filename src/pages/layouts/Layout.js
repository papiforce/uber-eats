import { useEffect } from "react";

import Nav from "components/Nav";

const Layout = ({
  title = "Express Food",
  description = "Site permettant de commander des plats fait par les chefs d'Express Food",
  children,
}) => {
  useEffect(() => {
    document.title = title;
    document.getElementsByTagName("META")[3].content = description;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
