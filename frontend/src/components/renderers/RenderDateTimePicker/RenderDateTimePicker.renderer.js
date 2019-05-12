import React from "react";
import DatePicker from "react-datepicker";
import { bool, object } from "prop-types";

import ValidationError from "../../ValidationError/ValidationError.component";

const RenderDateTimePicker = props => {
  const {
    input: { value, ...restInput },
    meta: { touched, error, warning },
    inline = true,
    ...rest
  } = props;
  return (
    <div className="date-picker">
      <DatePicker
        {...restInput}
        {...rest}
        inline={inline}
        dropdownMode="select"
        selected={!value ? undefined : new Date(value)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        fixedHeight
        className="date-time-picker"
      />
      <ValidationError touched={touched} error={error} warning={warning} />
    </div>
  );
};

RenderDateTimePicker.propTypes = {
  input: object,
  meta: object,
  inline: bool
};

export default RenderDateTimePicker;
