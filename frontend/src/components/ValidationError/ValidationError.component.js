import React, { Fragment } from "react";
import styles from "./ValidationError.module.scss";
import { string, bool } from "prop-types";

const ValidationError = ({ touched, error, warning, name }) => {
  return (
    <Fragment>
      {touched &&
        ((error && (
          <span className={[["text-danger"], styles["error-message"]].join(" ")} title={"error_" + name}>
            {error}
          </span>
        )) ||
          (warning && <span className="error-message">{warning}</span>))}
    </Fragment>
  );
};
ValidationError.propTypes = {
  error: string,
  name: string,
  touched: bool,
  warning: string
};

export default ValidationError;
