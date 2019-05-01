import React from "react";
import { Icon } from "react-icons-kit";
import { string, object, number } from "prop-types";

import styles from "./RenderTab.module.scss";

const RenderTab = props => {
  const { title, icon, size = 18 } = props;
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
  title: string,
  icon: object,
  size: number
};

export default RenderTab;
