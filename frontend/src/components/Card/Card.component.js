import React from "react";
import { string, object, oneOfType, array } from "prop-types";

import styles from "./Card.module.scss";

const Card = props => {
  const { number = "0", color = "default", title = "", children = null, href = "", classes = "" } = props;
  let hrefClass = href ? " link" : "";
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
      {title ? <h6 className={styles["db-card-header"]}>{title}</h6> : ""}
      <div className={styles["db-card-content"]}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: string,
  children: oneOfType([object, array]),
  number: string,
  color: string,
  href: string,
  classes: string
};

export default Card;
