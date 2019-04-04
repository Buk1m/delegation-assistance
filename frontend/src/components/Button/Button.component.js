import React from "react";
import { string, bool, func } from "prop-types";

import styles from "./Button.module.scss";

const Button = props => {
  const { text, type = "button", className, disabled = false, onClick } = props;
  return (
    <button
      className={styles[className] ? styles[className] : styles.primary}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

Button.propTypes = {
  text: string.isRequired,
  onClick: func,
  className: string,
  type: string,
  disabled: bool
};

export default Button;
