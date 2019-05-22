import React from "react";
import Select from "react-select";
import { array, bool, object, string } from "prop-types";

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
        styles={{
          control: provided => ({
            ...provided,
            height: styles.selectHeight,
            margin: styles.selectMargin,
            borderColor: touched && error ? styles.errorBorder : styles.defaultBorder
          })
        }}
        {...rest}
      />
      <ValidationError error={error} touched={touched} warning={warning} name={rest.name} />
    </div>
  );
};

RenderTypeahead.propTypes = {
  input: object,
  isMulti: bool,
  isSearchable: bool,
  meta: object,
  options: array,
  placeholder: string
};

export default RenderTypeahead;
