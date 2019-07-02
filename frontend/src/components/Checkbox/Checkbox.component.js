import React from "react";
import { bool, func, string } from "prop-types";

import styles from "./Checkbox.module.scss";

const Checkbox = ({ name, defaultChecked, onClick, disabled }) => (
  <input
    type="checkbox"
    className={styles.input}
    name={name}
    onChange={onClick}
    checked={defaultChecked}
    id={name}
    disabled={disabled}
  />
);

Checkbox.propTypes = {
  defaultChecked: bool,
  disabled: bool,
  name: string.isRequired,
  onClick: func
};

export default Checkbox;
