import React from "react";
import { object, func } from "prop-types";

import ChecklistItem from "../ChecklistItem";

const RenderChecklistItem = (checkbox, changeCheckboxState) => {
  return (
    <ChecklistItem
      data={checkbox.item}
      changeCheckboxState={changeCheckboxState}
    />
  );
};

RenderChecklistItem.propTypes = {
  checkbox: object,
  changeCheckboxState: func
};

export default RenderChecklistItem;
