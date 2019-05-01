import React from "react";
import { string, bool } from "prop-types";
import styles from "./Row.module.scss";

const Row = ({ label, content, loading = false }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-5 col-md-4">
          <label className={styles["label-bold"]} htmlFor="row-content">
            {label}
          </label>
        </div>
        <div name="row-content" className="col-sm-7 col-md-8">
          {loading ? <div className={styles["text-line"]} /> : <span className={styles["content"]}>{content}</span>}
        </div>
      </div>
    </div>
  );
};

Row.propTypes = {
  label: string.isRequired,
  content: string,
  loading: bool
};

export default Row;
