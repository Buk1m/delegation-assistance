import React from "react";
import { object, string, func, number } from "prop-types";
import { Link } from "react-router-dom";
import Icon from "react-icons-kit";

import styles from "./ButtonLink.module.scss";

const ButtonLink = props => {
  const { href, text, icon, iconSize, onClick, className } = props;
  return (
    <Link onClick={onClick} to={href} className={styles[className] ? styles[className] : styles.primary}>
      {icon ? <Icon icon={icon} size={iconSize} /> : null}
      <span>{text}</span>
    </Link>
  );
};

ButtonLink.defaultProps = {
  iconSize: 20,
  className: "primary"
};

ButtonLink.propTypes = {
  className: string,
  href: string.isRequired,
  icon: object,
  iconSize: number,
  onClick: func,
  text: string.isRequired
};

export default ButtonLink;
