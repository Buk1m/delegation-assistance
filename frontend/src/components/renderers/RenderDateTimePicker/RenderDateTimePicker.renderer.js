import React from "react";
import DatePicker from "react-datepicker";
import { bool, number, object } from "prop-types";

import ValidationError from "../../ValidationError/ValidationError.component";

const RenderDateTimePicker = props => {
  const {
    input: { value, ...restInput },
    meta: { touched, error, warning },
    inline = true,
    timeIntervals = 1,
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
        timeIntervals={timeIntervals}
        fixedHeight
        className="date-time-picker"
      />
      <ValidationError touched={touched} error={error} warning={warning} />
    </div>
  );
};

RenderDateTimePicker.propTypes = {
  inline: bool,
  input: object,
  meta: object,
  timeIntervals: number
};

export default RenderDateTimePicker;
