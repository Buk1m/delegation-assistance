import React, { Component } from "react";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";

import DelegationDetailsScreen from "./DelegationDetailsScreen.component";
import OptionsMenu from "./OptionsMenu/OptionsMenu.component";
import IconButton from "../../components/IconButton/IconButton.component";

import styles from "./DelegationDetailsScreen.module.scss";
import colors from "../../assets/styles/_colorPalette.scss";

export class DelegationDetailsScreenContainer extends Component {
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
      headerRight: (
        <View style={styles.navigationOptions}>
          <IconButton
            style={styles.filterButton}
            iconStyle={styles.iconStyle}
            iconName="filter-outline"
            iconPackName="MaterialCommunityIcons"
            onPress={navigation.getParam("changeIsSortFilterPanelCollapsed")}
          />
          <OptionsMenu navigation={navigation} />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.delegationId = props.navigation.getParam("delegationId");
    this.state = {
      isExpensesSortFilterPanelCollapsed: true,
      changeIsSortFilterPanelCollapsedFunctionsMap: {},
      currentTabName: ""
    };
  }

  setFunctionForCollapsing = (passedFunction, tabName) => {
    const functions = this.state.changeIsSortFilterPanelCollapsedFunctionsMap;
    functions[tabName] = passedFunction;
    this.setState({ changeIsSortFilterPanelCollapsedFunctionsMap: functions });
  };

  setCurrentTabName = tabName => {
    this.setState({ currentTabName: tabName });
  };

  _changeIsSortFilterPanelCollapsed = () => {
    if (this._isMethodKnown(this.state.currentTabName)) {
      this.state.changeIsSortFilterPanelCollapsedFunctionsMap[this.state.currentTabName]();
    }
  };

  _isMethodKnown = tabName => {
    return this.state.changeIsSortFilterPanelCollapsedFunctionsMap[tabName] !== undefined;
  };

  componentDidMount = () => {
    this.props.navigation.setParams({
      changeIsSortFilterPanelCollapsed: this._changeIsSortFilterPanelCollapsed,
      handleSend: this.handleSendToTravelManager,
      handleEdit: this.handleEdit,
      handleDelete: this.handleDelete,
      setMenuRef: this.setMenuRef,
      showMenu: this.showMenu
    });
  };

  render() {
    return (
      <DelegationDetailsScreen
        delegationId={this.delegationId}
        navigate={this.props.navigation}
        setFunctionForCollapsing={this.setFunctionForCollapsing}
        setCurrentTabName={this.setCurrentTabName}
      />
    );
  }
}

export default DelegationDetailsScreenContainer;
