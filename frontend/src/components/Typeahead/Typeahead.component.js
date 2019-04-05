import React from "react";
import Select from "react-select";
import { bool, array, object, string } from "prop-types";

import colors from "../../static/styles/_constants.scss";
import ValidationError from "../ValidationError/ValidationError.component";

// React Select component - https://react-select.com/home
// documentation for Select component
const Typeahead = ({
  input: { onChange, value },
  meta: { touched, error, warning },
  options,
  isSearchable,
  isMulti,
  placeholder = "Select..."
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
        placeholder={placeholder}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: colors.primary
          }
        })}
      />
      <ValidationError error={error} touched={touched} warning={warning} />
    </div>
  );
};

Typeahead.propTypes = {
  input: object,
  meta: object,
  options: array,
  isSearchable: bool,
  isMulti: bool,
  placeholder: string
};

export default Typeahead;
