import React from "react";
import { Icon } from "react-icons-kit";
import { string, object, number } from "prop-types";

import styles from "./RenderTab.module.scss";

const RenderTab = ({ title, icon, size = 18 }) => {
  return (
    <div className={styles.tab}>
      <div className={styles.icon}>
        <Icon size={size} icon={icon} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

RenderTab.propTypes = {
  icon: object,
  size: number,
  title: string
};

export default RenderTab;
