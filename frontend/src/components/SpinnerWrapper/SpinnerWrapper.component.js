import React, { Fragment } from "react";
import { array, bool, object, oneOfType, string } from "prop-types";

import Spinner from "../Spinner/Spinner.component";

import styles from "./SpinnerWrapper.module.scss";

const SpinnerWrapper = props => {
  const { children, message, loading } = props;
  return loading ? (
    <div className={styles.full}>
      <Spinner />
      <p className={styles.msg}>{message}</p>
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

SpinnerWrapper.defaultProps = {
  loading: true
};

SpinnerWrapper.propTypes = {
  children: oneOfType([object, array]),
  loading: bool,
  message: string
};

export default SpinnerWrapper;
