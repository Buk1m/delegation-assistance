import React from "react";
import { string, bool, object } from "prop-types";

import ValidationError from "../../ValidationError/ValidationError.component";
import styles from "./RenderInput.module.scss";

const RenderInput = ({ input, label, type, disabled, className, meta: { touched, error, warning }, ...rest }) => {
  return (
    <div className={styles["render-field"]}>
      <input
        {...input}
        disabled={disabled}
        className={[styles[className], [touched && error ? styles["invalid"] : ""]].join(" ")}
        placeholder={label}
        type={type}
        {...rest}
      />
      <ValidationError touched={touched} error={error} warning={warning} />
    </div>
  );
};

RenderInput.propTypes = {
  type: string.isRequired,
  label: string,
  disabled: bool,
  className: string,
  meta: object,
  input: object
};

export default RenderInput;
