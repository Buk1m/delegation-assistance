import React from "react";
import { bool, func, string } from "prop-types";

import Spinner from "../Spinner/Spinner.component";

import styles from "./Button.module.scss";

const Button = props => {
  const { text, className, onClick, type = "button", disabled = false, submitting = false, ...otherOptions } = props;
  const buttonClass = styles[className] ? styles[className] : styles.primary;
  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick} type={type} {...otherOptions}>
      <span>{submitting ? <Spinner className={styles.spinner} /> : text}</span>
    </button>
  );
};

Button.propTypes = {
  text: string.isRequired,
  onClick: func,
  className: string,
  type: string,
  disabled: bool,
  submitting: bool
};

export default Button;
