import React from "react";
import { Field } from "redux-form";
import { string, array } from "prop-types";

import styles from "./CheckboxGroup.module.scss";

const renderCheckboxGroup = props => {
  const { required, options, input } = props;
  let { path } = props;
  path = path ? path : "name";
  return options.map((option, index) => (
    <div className={styles["control-checkbox"]} key={option.name}>
      <label className={styles["label"]}>
        <input
          type="checkbox"
          name={`${input.name}[${index}]`}
          value={option[path]}
          className={styles["input"]}
          required={required}
          checked={input.value.indexOf(option[path]) !== -1}
          onChange={event => {
            const newValue = [...input.value];
            if (event.target.checked) {
              newValue.push(option[path]);
            } else {
              newValue.splice(newValue.indexOf(option[path]), 1);
            }
            return input.onChange(newValue);
          }}
        />
        {option.name}
      </label>
    </div>
  ));
};

const CheckboxGroup = props => {
  const { name, options, path } = props;
  return <Field name={name} path={path} component={renderCheckboxGroup} options={options} />;
};

CheckboxGroup.propTypes = {
  name: string,
  options: array,
  path: string
};

export default CheckboxGroup;
