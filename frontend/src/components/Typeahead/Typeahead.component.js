import React, { Fragment } from "react";
import Select from "react-select";
import { bool, array, object } from "prop-types";

import colors from "../../static/styles/_constants.scss";
import ValidationError from "../ValidationError/ValidationError.component";

// React Select component - https://react-select.com/home
// documentation for Select component
const Typeahead = ({
  input: { onChange, value },
  meta: { touched, error, warning },
  options,
  isSearchable
}) => {
  return (
    <Fragment>
      <div className="select-control">
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={options}
          isSearchable={isSearchable}
          onChange={onChange}
          value={value}
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
    </Fragment>
  );
};

Typeahead.propTypes = {
  input: object,
  meta: object,
  options: array,
  isSearchable: bool
};

export default Typeahead;
