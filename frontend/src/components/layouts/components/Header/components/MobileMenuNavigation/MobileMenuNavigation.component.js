import React from "react";
import { Link } from "react-router-dom";
import { array, bool, func, string } from "prop-types";
import { ic_menu } from "react-icons-kit/md/ic_menu";
import Icon from "react-icons-kit";

import navigationItems from "../../../../../../config/navigation";
import Button from "../../../../../Button/Button.component";

import profile from "../../../../../../assets/images/profile.png";
import styles from "./MobileMenuNavigation.module.scss";

const MobileMenuNavigation = ({ loggedStatus, roleActive, logout, fullname, roles, changeRole }) => {
  return loggedStatus ? (
    <div className={styles["menu-nav"]}>
      <button
        type="button"
        className={styles["navbar-toggler"]}
        data-toggle="collapse"
        data-target="#header-nav"
        aria-expanded="false"
        aria-controls="header-nav"
      >
        <Icon icon={ic_menu} size={24} />
      </button>
      <div className="collapse" id="header-nav">
        <div className={styles["nav-items"]}>
          <div className={styles["menu-user"]}>
            <img src={profile} alt={fullname} className={styles["profile-img"]} />
            <Link to="/profile" className={styles["menu-item-link"]}>
              {fullname}
            </Link>
          </div>
          {navigationItems.map(navItem => (
            <div className={styles["menu-item"]} key={navItem.text}>
              <div className={styles["menu-item-title"]}>{navItem.text}</div>
              <div className={styles["menu-item-paths"]}>
                {navItem.subItems.map(item =>
                  item.canAccess.includes(roleActive) ? (
                    <Link to={item.to} className={styles["menu-item-link"]} key={item.to}>
                      {item.text}
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          ))}
          <div className={styles["menu-item"]}>
            <div className={styles["menu-item-title"]}>other</div>
            <div className={styles["menu-item-paths"]}>
              <Link to="/profile" className={styles["menu-item-link"]}>
                Profile
              </Link>
              <Link to="/profile/settings" className={styles["menu-item-link"]}>
                Settings
              </Link>
              {roles && roles.length > 1
                ? roles.map(role => (
                    <span className={styles["menu-item-link"]} key={role} onClick={() => changeRole(role)}>
                      Role {role}
                    </span>
                  ))
                : null}
            </div>
          </div>
          <div className={styles["menu-item"]}>
            <Button type="button" text="logout" onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

MobileMenuNavigation.propTypes = {
  loggedStatus: bool,
  roleActive: string,
  logout: func,
  fullname: string,
  roles: array,
  changeRole: func
};

export default MobileMenuNavigation;
