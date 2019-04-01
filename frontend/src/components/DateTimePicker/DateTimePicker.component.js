import React from "react";
import DatePicker from "react-datepicker";
import { object } from "prop-types";
import ValidationError from "../ValidationError/ValidationError.component";

const DateTimePicker = ({
  input: { onChange, value },
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <DatePicker
        inline
        dropdownMode="select"
        selected={!value ? undefined : new Date(value)}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        fixedHeight
      />
      <ValidationError touched={touched} error={error} warning={warning} />
    </div>
  );
};

DateTimePicker.propTypes = {
  input: object,
  meta: object
};

export default DateTimePicker;
