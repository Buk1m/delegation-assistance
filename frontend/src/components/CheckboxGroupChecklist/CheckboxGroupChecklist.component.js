import React from "react";
import { string, array, bool } from "prop-types";

import styles from "./CheckboxGroupChecklist.module.scss";

const CheckboxGroupChecklist = props => {
  const { options, input: { name, value = [], onChange } = {}, required, disabled } = props;
  let { path } = props;
  path = path ? path : "name";
  return options.map((option, index) => (
    <div className={styles["control-checkbox"]} key={option.name}>
      <div className="d-flex justify-content-between align-items-start">
        <label className={styles["label"]} disabled={disabled}>
          <input
            type="checkbox"
            name={`${name}[${index}]`}
            value={option[path]}
            className={styles["input"]}
            required={required}
            disabled={disabled}
            checked={value.indexOf(option[path]) !== -1}
            onChange={event => {
              const newValue = [...value];
              if (event.target.checked) {
                newValue.push(option[path]);
              } else {
                newValue.splice(newValue.indexOf(option[path]), 1);
              }
              return onChange(newValue);
            }}
          />
          {option.name}
        </label>
        <button type="button" className={styles["configurate"]} data-toggle="modal" data-target={"#checklist" + index}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        </button>
        <div
          className="modal fade"
          id={"checklist" + index}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={"checklistModal" + index}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"checklistModal" + index}>
                  {option.name}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{option.description}</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

CheckboxGroupChecklist.propTypes = {
  name: string,
  options: array,
  path: string,
  disabled: bool
};

export default CheckboxGroupChecklist;
