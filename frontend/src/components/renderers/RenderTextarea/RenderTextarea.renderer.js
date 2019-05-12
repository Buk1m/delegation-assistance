import React from "react";
import { string, bool, object, number } from "prop-types";

import ValidationError from "../../ValidationError/ValidationError.component";

import styles from "./RenderTextarea.module.scss";

const RenderTextarea = ({
  input,
  minlength,
  label,
  disabled,
  className,
  meta: { touched, error, warning },
  rows = 5,
  columns = 5,
  ...rest
}) => {
  return (
    <div>
      <textarea
        {...input}
        minLength={minlength}
        disabled={disabled}
        className={[styles[className], [touched && error ? styles["invalid"] : styles["valid"]]].join(" ")}
        placeholder={label}
        rows={rows}
        columns={columns}
        {...rest}
      />
      <ValidationError touched={touched} error={error} warning={warning} />
    </div>
  );
};

RenderTextarea.propTypes = {
  input: object,
  minlength: number,
  autofocus: bool,
  label: string,
  disabled: bool,
  className: string,
  meta: object,
  rows: number,
  columns: number
};

export default RenderTextarea;
