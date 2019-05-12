import React from "react";
import { array, bool, object, string, oneOfType } from "prop-types";

import styles from "./Row.module.scss";

const Row = ({ label, children, loading = false }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-5 col-md-4 col-xl-3">
          <label className={styles["label-bold"]} htmlFor="row-content">
            {label}
          </label>
        </div>
        <div name="row-content" className="col-sm-7 col-md-8 col-xl-9">
          {loading ? <div className={styles["text-line"]} /> : <span className={styles["content"]}>{children}</span>}
        </div>
      </div>
    </div>
  );
};

Row.propTypes = {
  label: string.isRequired,
  children: oneOfType([array, object, string]),
  loading: bool
};

export default Row;
