import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { toast } from "react-toastify";

import { store, persistor } from "./store";
import Router from "./hocs/Router/Router.hoc";
import ThemeProvider from "./hocs/ThemeProvider/ThemeProvider.hoc";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./assets/styles/style.scss";

toast.configure({ position: toast.POSITION.BOTTOM_RIGHT });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
