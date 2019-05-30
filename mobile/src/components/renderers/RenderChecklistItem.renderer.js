import React from "react";

import ChecklistItem from "../ChecklistItem";

const RenderChecklistItem = (checkbox, changeCheckboxState) => {
  return <ChecklistItem data={checkbox.item} changeCheckboxState={changeCheckboxState} />;
};

export default RenderChecklistItem;
