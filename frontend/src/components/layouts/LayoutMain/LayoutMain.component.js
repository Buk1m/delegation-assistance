import React, { Fragment } from "react";

import Header from "../components/Header/Header.component";
import Footer from "../components/Footer/Footer.component";

const LayoutMain = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default LayoutMain;
