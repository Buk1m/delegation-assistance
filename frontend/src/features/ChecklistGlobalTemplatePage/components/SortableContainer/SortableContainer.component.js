import React from "react";
import { sortableContainer } from "react-sortable-hoc";

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="chgt-list">{children}</ul>;
});

export default SortableContainer;
