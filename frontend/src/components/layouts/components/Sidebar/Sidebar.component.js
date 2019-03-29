import React from "react";
import { array, string } from "prop-types";

import styles from "./Sidebar.module.scss";
import SidebarNavItem from "../../../SidebarNavItem/SidebarNavItem.component";

const Sidebar = props => {
  const { className, navigationItems = [] } = props;
  return (
    <aside className={[styles.sidebar, styles[className]].join(" ")}>
      <ul className="list-group list-group-flush" role="navigation">
        {navigationItems.map(item => (
          <SidebarNavItem key={item.to} to={item.to} text={item.text} subitems={item.subitems} />
        ))}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  className: string,
  navigationItems: array
};

export default Sidebar;
