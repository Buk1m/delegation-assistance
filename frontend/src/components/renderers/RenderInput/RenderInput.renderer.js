import React from "react";
import { string, bool, object } from "prop-types";

import ValidationError from "../../ValidationError/ValidationError.component";
import styles from "./RenderInput.module.scss";

const RenderInput = ({
  input: { value, onChange, name, ...restInput },
  label,
  type,
  disabled,
  className,
  meta: { touched, error, warning },
  ...rest
}) => {
  return (
    <div className={styles["render-field"]}>
      <input
        {...restInput}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={[styles[className], [touched && error ? styles["invalid"] : ""]].join(" ")}
        placeholder={label}
        type={type}
        {...rest}
      />
      <ValidationError touched={touched} error={error} warning={warning} name={name} />
    </div>
  );
};

RenderInput.defaultProps = {
  type: "text"
};

RenderInput.propTypes = {
  className: string,
  disabled: bool,
  input: object,
  label: string,
  meta: object,
  type: string.isRequired
};

export default RenderInput;
