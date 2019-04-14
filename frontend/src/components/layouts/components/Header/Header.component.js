import React from "react";
import { bool, func, string } from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";
import sitelogo from "../../../../static/assets/images/sitelogo.png";
import ButtonLink from "../../../ButtonLink/ButtonLink.component";

const Header = props => {
  const { loggedStatus, logout, fullname, toggleSidebar } = props;
  return (
    <header className={styles.header}>
      <div className={[styles.header_items, "d-flex no-gutters justify-content-between align-items-center"].join(" ")}>
        <div id="sitelogo" className="col-8 col-sm-6 align-items-center d-flex">
          <button className={styles["sidebar-toggle"]} onClick={toggleSidebar}>
            <span className={styles["st-1"]} />
            <span className={styles["st-2"]} />
            <span className={styles["st-3"]} />
          </button>
          <NavLink to="/" title="Delegation Assistant">
            <img src={sitelogo} className={styles.sitelogo} alt="Delegation Assistant" />
          </NavLink>
        </div>
        <div className="navaccount d-flex justify-content-end col-4 col-sm-6">
          {loggedStatus === true ? (
            <div className="dropdown">
              <button
                className={[styles["usernav-toogle"], "dropdown-toggle"].join(" ")}
                type="button"
                id="usernavmenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {fullname}
              </button>
              <div className="dropdown-menu" aria-labelledby="usernavmenu">
                <NavLink to="/profile" activeClassName={styles.active} className="dropdown-item">
                  Profile
                </NavLink>
                <NavLink to="/delegations" activeClassName={styles.active} className="dropdown-item">
                  Delegations
                </NavLink>
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
      </div>
    </header>
  );
};

Header.propTypes = {
  loggedStatus: bool,
  fullname: string,
  logout: func,
  toggleSidebar: func
};

export default Header;
