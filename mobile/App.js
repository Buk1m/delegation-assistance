import React, { Component } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./src/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
        <FlashMessage position="top" />
      </Provider>
    );
  }
}

export default App;
