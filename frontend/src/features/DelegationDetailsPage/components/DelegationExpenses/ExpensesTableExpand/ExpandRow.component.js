import React from "react";
import { bool } from "prop-types";
import { ic_expand_more, ic_expand_less, ic_more_horiz, ic_more_vert } from "react-icons-kit/md";
import { Icon } from "react-icons-kit";

import ExpenseItem from "../ExpenseItem/ExpenseItem.container";

const expandHeaderColumnRenderer = ({ isAnyExpands }) =>
  isAnyExpands ? <Icon icon={ic_more_vert} size={20} /> : <Icon icon={ic_more_horiz} size={20} />;

expandHeaderColumnRenderer.propTypes = {
  isAnyExpands: bool
};

const expandColumnRenderer = ({ expanded }) =>
  expanded ? <Icon icon={ic_expand_less} size={20} /> : <Icon icon={ic_expand_more} size={20} />;

expandColumnRenderer.propTypes = {
  expanded: bool
};

const ExpandRow = delegationId => ({
  renderer: row => <ExpenseItem data={row} delegationId={delegationId} />,
  showExpandColumn: true,
  expandColumnPosition: "right",
  expandHeaderColumnRenderer: expandHeaderColumnRenderer,
  expandColumnRenderer: expandColumnRenderer
});

export default ExpandRow;
