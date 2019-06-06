import React from "react";
import { FilePond } from "react-filepond";
import { array, func, object } from "prop-types";

import "filepond/dist/filepond.min.css";
import ValidationError from "../../ValidationError/ValidationError.component";

const RenderFilePond = props => {
  const {
    input: { value, onChange, ...restInput },
    meta: { touched, error, warning },
    ...rest
  } = props;
  return (
    <div>
      <FilePond
        files={value}
        allowMultiple={true}
        onupdatefiles={fileItems => onChange(fileItems.length ? fileItems.map(fileItem => fileItem.file) : null)}
        {...rest}
      />
      <ValidationError touched={touched} error={error} warning={warning} name={restInput.name} />
    </div>
  );
};

RenderFilePond.propTypes = {
  files: array,
  input: object,
  meta: object,
  setFiles: func
};

export default RenderFilePond;
