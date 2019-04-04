import React, { Fragment } from "react";
import { string, bool, array, func, number, oneOfType } from "prop-types";
import { Field } from "redux-form";

import styles from "./Textarea.module.scss";
import ValidationError from "../ValidationError/ValidationError.component";

const renderField = ({ input, rows, columns, label, type, disabled, className, meta: { touched, error, warning } }) => {
  return (
    <Fragment>
      <div className={styles["render-field"]}>
        <textarea
          {...input}
          rows={rows}
          columns={columns}
          disabled={disabled}
          className={[styles[className], [touched && error ? styles["invalid"] : ""]].join(" ")}
          placeholder={label}
          type={type}
        />
        <ValidationError touched={touched} error={error} warning={warning} />
      </div>
    </Fragment>
  );
};

const Textarea = props => {
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
    rows = 5,
    columns = 5
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
            rows={rows}
            columns={columns}
            className={"textarea"}
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

Textarea.propTypes = {
  label: string,
  name: string.isRequired,
  value: oneOfType([number, string]),
  type: string,
  placeholder: string,
  validate: oneOfType([func, array]),
  minlength: number,
  disabled: bool,
  className: string,
  rows: number,
  columns: number
};

export default Textarea;
