import React from "react";
import { FilePond } from "react-filepond";
import { array,func, object } from "prop-types";

import "filepond/dist/filepond.min.css";
import ValidationError from "../../ValidationError/ValidationError.component";

const RenderFilePond = props => {
  const {
    input: { value, ...restInput },
    meta: { touched, error, warning },
    setFiles,
    files,
    ...rest
  } = props;
  return (
    <div>
       <FilePond
            files={files}
            allowMultiple={true}
            required={true}
            onupdatefiles={fileItems => {
                setFiles(fileItems.map(fileItem => fileItem.file));
            }}
            {...rest}
        />
      <ValidationError touched={touched} error={error} warning={warning} name={restInput.name} />
    </div>
  );
};

RenderFilePond.propTypes = {
  input: object,
  meta: object,
  setFiles: func,
  files: array
};

export default RenderFilePond;
