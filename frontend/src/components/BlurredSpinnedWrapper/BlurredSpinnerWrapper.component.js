import React from "react";
import { array, bool, object, oneOfType, string } from "prop-types";

import Spinner from "../Spinner/Spinner.component";

import styles from "./BlurredSpinnerWrapper.module.scss";

const BlurredSpinnerWrapper = props => {
  const { children, message, loading } = props;
  return (
    <div className="w-100 h-100 position-relative">
      <div className={styles.spinner}>
        {loading ? (
          <div className={styles["spinner-container"]}>
            <Spinner />
            <p className={styles.msg}>{message}</p>
          </div>
        ) : null}
      </div>
      <div className={loading ? styles.blur : ""}>{children}</div>
    </div>
  );
};

BlurredSpinnerWrapper.defaultProps = {
  loading: true,
  message: "loading"
};

BlurredSpinnerWrapper.propTypes = {
  children: oneOfType([object, array]),
  loading: bool,
  message: string
};

export default BlurredSpinnerWrapper;
