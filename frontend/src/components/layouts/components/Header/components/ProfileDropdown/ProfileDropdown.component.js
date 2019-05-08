import React from "react";
import { Link } from "react-router-dom";
import { array, bool, func, string } from "prop-types";

import ButtonLink from "../../../../../ButtonLink/ButtonLink.component";

import profile from "../../../../../../assets/images/profile.png";
import styles from "./ProfileDropdown.module.scss";

const ProfileDropdown = ({ loggedStatus, logout, fullname, roles, changeRole }) => {
  return (
    <div className={styles["navaccount"]}>
      {loggedStatus ? (
        <div className="dropdown">
          <button
            className={styles["usernav-toogle"]}
            type="button"
            id="usernavmenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src={profile} alt={fullname} className={styles["profile-img"]} />
            <span>{fullname}</span>
          </button>
          <div className="dropdown-menu" aria-labelledby="usernavmenu">
            {roles && roles.length > 1
              ? roles.map(role => (
                  <span className="dropdown-item" key={role} onClick={() => changeRole(role)}>
                    Role {role}
                  </span>
                ))
              : null}
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
            <Link to="/profile/settings" className="dropdown-item">
              Settings
            </Link>
            <hr />
            <li className={[styles["logout-item"], "dropdown-item"].join(" ")} onClick={logout}>
              Logout
            </li>
          </div>
        </div>
      ) : (
        <ButtonLink href="/login" text="sign in" />
      )}
    </div>
  );
};

ProfileDropdown.propTypes = {
  loggedStatus: bool,
  logout: func,
  fullname: string,
  roles: array,
  changeRole: func
};

export default ProfileDropdown;
