import React from "react";
import { Link } from "react-router-dom";
import { array, bool, func, string } from "prop-types";

import ProfileDropdown from "./components/ProfileDropdown/ProfileDropdown.component";
import MobileMenuNavigation from "./components/MobileMenuNavigation/MobileMenuNavigation.component";
import MenuNavigation from "./components/MenuNavigation/MenuNavigation.component";

import sitelogo from "../../../../assets/images/sitelogo.png";
import styles from "./Header.module.scss";

const Header = ({ loggedStatus, logout, fullname, roles, roleActive, changeRole }) => {
  return (
    <header className={styles.header}>
      <div className="h-100 d-flex no-gutters justify-content-between align-items-center">
        <div className="mr-5 mr-md-0 align-items-center d-flex">
          <Link to="/" title="Delegation Assistant">
            <img src={sitelogo} className="d-block mh-100 mw-100 site-logo" alt="Delegation Assistant" />
          </Link>
        </div>
        <MenuNavigation loggedStatus={loggedStatus} roleActive={roleActive} />
        <ProfileDropdown
          loggedStatus={loggedStatus}
          logout={logout}
          fullname={fullname}
          roles={roles}
          changeRole={changeRole}
        />
        <MobileMenuNavigation
          loggedStatus={loggedStatus}
          roleActive={roleActive}
          logout={logout}
          fullname={fullname}
          roles={roles}
          changeRole={changeRole}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  changeRole: func,
  fullname: string,
  loggedStatus: bool,
  logout: func,
  roleActive: string,
  roles: array
};

export default Header;
