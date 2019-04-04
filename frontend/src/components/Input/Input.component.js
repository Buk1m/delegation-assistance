import React, { Fragment } from "react";
import { string, bool, array, func, number, oneOfType } from "prop-types";
import { Field } from "redux-form";

import styles from "./Inputs.module.scss";
import ValidationError from "../ValidationError/ValidationError.component";

const renderField = ({
  input,
  label,
  type,
  disabled,
  className,
  meta: { touched, error, warning }
}) => {
  return (
    <Fragment>
      <div className={styles["render-field"]}>
        <input
          {...input}
          disabled={disabled}
          className={[
            styles[className],
            [touched && error ? styles["invalid"] : ""]
          ].join(" ")}
          placeholder={label}
          type={type}
        />
        <ValidationError touched={touched} error={error} warning={warning} />
      </div>
    </Fragment>
  );
};

const Input = props => {
  const {
    name,
    label = "",
    value = "",
    type = "text",
    placeholder = "",
    validate = null,
    minlength = 0,
    disabled = false,
    className = ""
  } = props;
  return (
    <div className={[styles["field"], styles[className]].join(" ")}>
      <div className={styles["control " + type]}>
        <label className={[styles["label"], styles["label-fluid"]].join(" ")}>
          {label ? (
            <span className={styles["label-bold"]} data-test="label-value">
              {label}
            </span>
          ) : (
            ""
          )}
          <Field
            className={"input"}
            name={name}
            type={type}
            value={value}
            validate={validate}
            label={placeholder}
            component={renderField}
            minlength={minlength}
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: string,
  name: string.isRequired,
  value: oneOfType([number, string]),
  type: string,
  placeholder: string,
  validate: oneOfType([func, array]),
  minlength: number,
  disabled: bool,
  className: string
};

export default Input;
