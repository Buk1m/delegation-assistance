import React from "react";
import { array, func } from "prop-types";

import Button from "../../../../components/Button/Button.component";

const UpdateStatus = ({ handleUpdateStatus, availableOptions }) => {
  return availableOptions.length > 0
    ? availableOptions.map((option, i) => (
        <Button key={i} text={option.text} onClick={() => handleUpdateStatus(option.newStatus)} />
      ))
    : null;
};

UpdateStatus.defaultProps = {
  availableOptions: []
};

UpdateStatus.propTypes = {
  availableOptions: array,
  handleUpdateStatus: func
};

export default UpdateStatus;
