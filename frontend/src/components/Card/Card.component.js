import React from "react";
import { string, object, oneOfType, array } from "prop-types";

import styles from "./Card.module.scss";

const Card = props => {
  const { number = "0", color = "default", title = "", children = null, href = "", classes = "" } = props;
  const hrefClass = href ? " link" : "";
  return (
    <div
      onClick={() => {
        if (href) {
          window.location.href = href;
        }
      }}
      className={[
        styles["db-card"],
        styles["card-" + number],
        styles["color-" + color],
        styles[classes + hrefClass]
      ].join(" ")}
    >
      {title ? <h6 className={["db-card-header", styles["db-card-header"]].join(" ")}>{title}</h6> : ""}
      <div className={[styles["db-card-content"], "db-card-content"].join(" ")}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: oneOfType([object, array]),
  classes: string,
  color: string,
  href: string,
  number: string,
  title: string
};

export default Card;
