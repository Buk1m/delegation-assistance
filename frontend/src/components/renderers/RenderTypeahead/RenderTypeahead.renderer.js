import React from "react";
import Select from "react-select";
import { bool, array, object, string } from "prop-types";

import ValidationError from "../../ValidationError/ValidationError.component";

import styles from "./RenderTypeahead.module.scss";

const RenderTypeahead = ({
  input: { onChange, value },
  meta: { touched, error, warning },
  options,
  isSearchable,
  isMulti,
  placeholder = "Select...",
  ...rest
}) => {
  return (
    <div className="select-control">
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        isSearchable={isSearchable}
        isMulti={isMulti}
        onChange={onChange}
        value={value}
        defaultValue={value}
        placeholder={placeholder}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: styles.primary,
            primary25: styles["primary-hf"],
            neutral0: styles.neutral0,
            neutral80: styles.neutral80
          }
        })}
        {...rest}
      />
      <ValidationError error={error} touched={touched} warning={warning} />
    </div>
  );
};

RenderTypeahead.propTypes = {
  input: object,
  meta: object,
  options: array,
  isSearchable: bool,
  isMulti: bool,
  placeholder: string
};

export default RenderTypeahead;
