import React from "react";

import LayoutMain from "../../components/layouts/LayoutMain";
import ButtonLink from "../../components/ButtonLink/ButtonLink.component";

const ErrorPage = () => {
  return (
    <LayoutMain>
      <div className="d-flex justify-content-center align-items-center flex-column h-100 mt-5">
        <h1>404</h1>
        <h4 className="mb-3">Whoops... Page Not Found.</h4>
        <ButtonLink href="/" text="Back to Home" />
      </div>
    </LayoutMain>
  );
};

export default ErrorPage;
