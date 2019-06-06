import React from "react";
import { array, number, object, oneOfType, string } from "prop-types";

import styles from "./Card.module.scss";

const Card = props => {
  const { children = null, title, number, classes } = props;
  return (
    <div className={[styles["db-card"], "card-" + number, styles[classes]].join(" ")}>
      {title ? <h6 className={["db-card-header", styles["db-card-header"]].join(" ")}>{title}</h6> : null}
      <div className={[styles["db-card-content"], "db-card-content"].join(" ")}>{children}</div>
    </div>
  );
};

Card.defaultProps = {
  title: "",
  number: 0,
  classes: ""
};

Card.propTypes = {
  children: oneOfType([object, array, string]).isRequired,
  classes: string,
  number: number,
  title: string
};

export default Card;
