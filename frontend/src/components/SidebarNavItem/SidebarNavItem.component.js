import React from "react";
import { string, array } from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./SidebarNavItem.module.scss";

const SidebarNavItem = props => {
  const { to, text, subitems = [] } = props;
  let haveSubItems = subitems.length > 0;
  return (
    <li className={styles["sidebar-list-item"]}>
      <div className={[["d-flex justify-content-between"], styles["nav-item-wrapper"]].join(" ")}>
        <NavLink to={to} activeClassName={styles.active} className={styles["nav-item"]}>
          {text}
        </NavLink>
        {haveSubItems ? (
          <button
            className={styles["nav-toggle"]}
            type="button"
            data-toggle="collapse"
            data-target={"#collapse" + text}
            aria-expanded="false"
            aria-controls={"collapse" + text}
          >
            <span className={styles["toggle-arrow"]}>
              <span className={styles["toggle-line"]} />
              <span className={styles["toggle-line"]} />
            </span>
          </button>
        ) : null}
      </div>
      {haveSubItems ? (
        <div className="collapse" id={"collapse" + text}>
          <ul className="list-group">
            {subitems.map(elem => (
              <SidebarNavItem key={elem.text} to={elem.to} text={elem.text} />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
};

SidebarNavItem.propTypes = {
  text: string.isRequired,
  to: string.isRequired,
  subitems: array
};

export default SidebarNavItem;
