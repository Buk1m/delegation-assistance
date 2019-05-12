import React from "react";
import { array, object, string } from "prop-types";

import ValidationError from "../../ValidationError/ValidationError.component";
import styles from "./RenderSelect.module.scss";

const RenderSelect = ({ input, className, meta: { touched, error, warning }, options, rest }) => {
  return (
    <div className={styles["render-field"]}>
      <select
        {...input}
        className={[styles[className], [touched && error ? styles["invalid"] : ""]].join(" ")}
        {...rest}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
      <ValidationError touched={touched} error={error} warning={warning} />
    </div>
  );
};

RenderSelect.propTypes = {
  className: string,
  meta: object,
  input: object,
  options: array.isRequired,
  rest: object
};

export default RenderSelect;
