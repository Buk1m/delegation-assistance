import React, { Fragment } from "react";
import styles from "./ValidationError.module.scss";
import { string, bool } from "prop-types";

const ValidationError = ({ touched, error, warning }) => {
  return (
    <Fragment>
      {touched &&
        ((error && (
          <span
            className={[["text-danger"], styles["error-message"]].join(" ")}
          >
            {error}
          </span>
        )) ||
          (warning && <span className="error-message">{warning}</span>))}
    </Fragment>
  );
};
ValidationError.propTypes = {
  touched: bool,
  error: string,
  warning: string
};

export default ValidationError;
