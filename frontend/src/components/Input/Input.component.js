import React, { Fragment } from "react";
import { string, bool, array, func, number, oneOfType } from "prop-types";
import { Field } from "redux-form";
import "./Inputs.module.scss";

const renderField = ({ input, label, type, disabled, className, meta: { touched, error, warning } }) => {
  return (
    <Fragment>
      <input
        {...input}
        disabled={disabled}
        className={className + (touched && error ? " invalid" : "valid")}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span className={"text-danger " + (touched && error ? " invalid" : "valid")}>{error}</span>) ||
          (warning && <span className="text-warning">{warning}</span>))}
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
    <div className={"field " + className}>
      <div className={"control " + type}>
        <label className="label label-fluid">
          {label ? <span className="label-bold">{label}</span> : ""}
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
  value: string,
  type: string,
  placeholder: string,
  validate: oneOfType([func, array]),
  minlength: number,
  disabled: bool,
  className: string
};

export default Input;
