import React from "react";
import { bool, string, func } from "prop-types";

import styles from "./Checkbox.module.scss";

const Checkbox = ({ name, checked, onChange }) => (
  <input type="checkbox" className={styles.input} name={name} checked={checked} onChange={onChange} id={name} />
);

Checkbox.propTypes = {
  name: string.isRequired,
  checked: bool,
  onChange: func.isRequired
};

export default Checkbox;
