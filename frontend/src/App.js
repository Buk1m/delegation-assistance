import React, { Fragment } from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore } from "./store";
import Router from "./hocs/Router/Router.hocs";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/styles/style.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Fragment>
        <Container>
          <Provider store={store}>
            <PersistGate persistor={store.__persistor}>
              <Router store={store}>
                <Component {...pageProps} />
              </Router>
            </PersistGate>
          </Provider>
        </Container>
      </Fragment>
    );
  }
}

export default withRedux(makeStore)(MyApp);
