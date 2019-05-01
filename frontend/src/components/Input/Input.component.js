import React from "react";
import { string, bool, array, func, number, oneOfType } from "prop-types";
import { Field } from "redux-form";

import RenderInput from "../renderers/RenderInput/RenderInput.renderer";

import styles from "./Inputs.module.scss";

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
    className = "",
    component = null,
    ...options
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
            component={component === null ? RenderInput : component}
            minlength={minlength}
            disabled={disabled}
            {...options}
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
  className: string,
  options: array,
  component: func
};

export default Input;
