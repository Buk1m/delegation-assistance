import React from "react";
import { array, bool, object, oneOfType, string } from "prop-types";

import Header from "../components/Header";
import Footer from "../components/Footer/Footer.component";

import styles from "./LayoutMain.module.scss";

const LayoutMain = props => {
  const { children, title = "", fullContent = false, hideTitle = false, buttons = null } = props;
  return (
    <div>
      <Header />
      <main className={[styles["main-content"], fullContent ? styles["full-content"] : ""].join(" ")}>
        {title && !hideTitle ? (
          <div className={styles["page-header"]}>
            <h2>{title}</h2>
            {buttons ? <div className={styles["buttons"]}>{buttons}</div> : null}
          </div>
        ) : null}
        <section>{children}</section>
      </main>
      <Footer />
    </div>
  );
};

LayoutMain.propTypes = {
  children: object.isRequired,
  hideTitle: bool,
  fullContent: bool,
  title: string,
  buttons: oneOfType([array, object])
};

export default LayoutMain;
