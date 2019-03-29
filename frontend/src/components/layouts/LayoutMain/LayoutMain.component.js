import React, { Fragment } from "react";
import { bool, func, object, string } from "prop-types";

import Header from "../components/Header/Header.container";
import Footer from "../components/Footer/Footer.component";
import Sidebar from "../components/Sidebar/Sidebar.container";
import styles from "./LayoutMain.module.scss";

const LayoutMain = props => {
  const {
    children,
    showSidebar,
    toggleSidebar,
    mobileView,
    title = "",
    forceHideSidebar = false,
    addPadding = true
  } = props;
  return (
    <Fragment>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar className={showSidebar && !forceHideSidebar ? "show" : "hide"} />
      <main
        className={
          styles["main-content"] +
          " " +
          (showSidebar && !mobileView && !forceHideSidebar ? styles["limited"] : "") +
          " " +
          (addPadding ? styles["addPadding"] : "")
        }
      >
        {title ? (
          <div className={styles["page-header"]}>
            <h2>{title}</h2>
          </div>
        ) : null}
        <section>{children}</section>
        <Footer />
      </main>
    </Fragment>
  );
};

LayoutMain.propTypes = {
  children: object.isRequired,
  showSidebar: bool,
  toggleSidebar: func,
  mobileView: bool,
  title: string,
  forceHideSidebar: bool,
  addPadding: bool
};

export default LayoutMain;
