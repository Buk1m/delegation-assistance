import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import { logoutUser } from "../../actions/user.actions";
import ProfileScreen from "./ProfileScreen.component";
import Button from "../../components/Button/Button.component";

import styles from "./ProfileScreen.module.scss";

class ProfileScreenContainer extends Component {
  static propTypes = {
    logoutUser: func
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerTintColor: styles.primary,
      headerRight: <Button style={styles.logoutButton} onPress={navigation.getParam("logoutUser")} title="Logout" />
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      logoutUser: this._handleLogoutUser
    });
  }

  _handleLogoutUser = () => {
    this.props.logoutUser();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return <ProfileScreen />;
  }
}

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  null,
  mapDispatchToProps
)(ProfileScreenContainer);
