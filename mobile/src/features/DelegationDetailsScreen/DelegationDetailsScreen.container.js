import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { showMessage } from "react-native-flash-message";

import DelegationDetailsScreen from "./DelegationDetailsScreen.component";
import OptionsMenu from "./OptionsMenu/OptionsMenu.component";
import { fetchDelegation } from "../../actions/delegations.actions";
import { fetchDelegationChecklist } from "../../actions/delegationChecklist.actions";
import colors from "../../assets/styles/_colorPalette.scss";

export class DelegationDetailsScreenContainer extends Component {
  static propTypes = {
    fetchDelegation: func,
    fetchDelegationChecklist: func
  };

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  handleSendToTravelManager = () => {
    this.hideMenu();
    showMessage({
      message: "TODO: IDEMIA2019-25 Jako pracownik mogę wysłać delegację do Travel Managera w celu akceptacji",
      type: "info"
    });
  };

  handleEdit = () => {
    this.hideMenu();
    showMessage({ message: "TODO: IDEMIA22 Jako pracownik mogę edytować swoje delegacje", type: "info" });
  };

  handleDelete = () => {
    this.hideMenu();
    showMessage({ message: "TODO: IDEMIA23 Jako pracownik mogę usunąć moje delegacje", type: "info" });
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Delegation no. ${navigation.getParam("delegationId")}`,
      headerTintColor: colors.primary,
      headerRight: <OptionsMenu navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.delegationId = props.navigation.getParam("delegationId");
  }

  componentDidMount = () => {
    this.props.fetchDelegation(this.delegationId);
    this.props.fetchDelegationChecklist(this.delegationId);
    this.props.navigation.setParams({
      handleSend: this.handleSendToTravelManager,
      handleEdit: this.handleEdit,
      handleDelete: this.handleDelete,
      setMenuRef: this.setMenuRef,
      showMenu: this.showMenu
    });
  };

  render() {
    return <DelegationDetailsScreen />;
  }
}

const mapDispatchToProps = {
  fetchDelegation,
  fetchDelegationChecklist
};

export default connect(
  null,
  mapDispatchToProps
)(DelegationDetailsScreenContainer);
