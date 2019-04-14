import React from "react";
import { string, bool, func } from "prop-types";

import styles from "./Button.module.scss";
import Spinner from "../Spinner/Spinner.component";

const Button = props => {
  const { text, className, onClick, type = "button", disabled = false, submitting = false } = props;
  const buttonClass = styles[className] ? styles[className] : styles.primary;
  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick} type={type}>
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
