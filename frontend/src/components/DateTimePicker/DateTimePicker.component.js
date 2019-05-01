import React from "react";
import DatePicker from "react-datepicker";
import { object, bool } from "prop-types";
import ValidationError from "../ValidationError/ValidationError.component";

const DateTimePicker = ({ input: { onChange, value }, meta: { touched, error, warning }, inline = true }) => {
  return (
    <div>
      <DatePicker
        inline={inline}
        dropdownMode="select"
        selected={!value ? undefined : new Date(value)}
        onChange={onChange}
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

DateTimePicker.propTypes = {
  input: object,
  meta: object,
  inline: bool
};

export default DateTimePicker;
