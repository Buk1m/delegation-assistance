import React from "react";
import { string } from "prop-types";

import styles from "./Spinner.module.scss";

const Spinner = props => {
  const { className } = props;
  return <div className={[styles.spinner, className].join(" ")} />;
};

Spinner.propTypes = {
  className: string
};

export default Spinner;
