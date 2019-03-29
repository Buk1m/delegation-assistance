import React from "react";
import { string, func } from "prop-types";
import { Link } from "react-router-dom";

import styles from "./ButtonLink.module.scss";

const ButtonLink = props => {
  const { href, text, className = "primary", onClick } = props;
  return (
    <Link onClick={onClick} to={href} className={styles[className] ? styles[className] : styles.primary}>
      <span>{text}</span>
    </Link>
  );
};

ButtonLink.propTypes = {
  text: string.isRequired,
  href: string.isRequired,
  onClick: func,
  className: string
};

export default ButtonLink;
