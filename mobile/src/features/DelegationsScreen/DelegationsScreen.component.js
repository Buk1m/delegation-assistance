import React from "react";
import { TouchableOpacity, View, FlatList, Alert } from "react-native";
import Collapsible from "react-native-collapsible";
import { Icon } from "expo";
import { array, bool, func, object } from "prop-types";

import Delegation from "./components/Delegation/Delegation.component";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.component";
import FilterPanel from "./components/FilterPanel/FilterPanel.component";
import SortPanel from "./components/SortPanel/SortPanel.component";
import IconButton from "../../components/IconButton/IconButton.component";
import styles from "./DelegationsScreen.module.scss";
import style from "../CreateDelegationScreen/CreateDelegationButtonStyles.module.scss";

const renderItem = (delegation, navigate) => {
  return (
    <TouchableOpacity onPress={() => showOptions(delegation.item.id, navigate)}>
      <Delegation data={delegation.item} />
    </TouchableOpacity>
  );
};

const showOptions = (delegationId, navigate) => {
  Alert.alert(
    "Choose action",
    "",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Show Details",
        onPress: () => navigate.navigate("DelegationDetails", { delegationId: delegationId })
      },
      {
        text: "Add Expense",
        onPress: () => navigate.navigate("CreateExpense", { delegationId: delegationId })
      }
    ],
    { cancelable: true }
  );
};

const DelegationsScreen = props => {
  const {
    delegations = [],
    datesAreValid,
    isSortFilterPanelCollapsed,
    changeIsSortFilterPanelCollapsed,
    filter,
    sortItems,
    navigate,
    fetching,
    handleRefresh
  } = props;

  return (
    <View style={styles.container}>
      <Collapsible style={styles.collapsible} collapsed={isSortFilterPanelCollapsed}>
        <View style={styles.filters}>
          <FilterPanel onSubmit={filter} />
          <SortPanel onSubmit={sortItems} />
        </View>
        <IconButton
          style={styles.collapseButton}
          iconStyle={styles.iconStyle}
          iconName={"md-arrow-dropup-circle"}
          onPress={changeIsSortFilterPanelCollapsed}
        />
      </Collapsible>

      <Collapsible collapsed={datesAreValid}>
        <ErrorMessage message="Dates are invalid!" />
      </Collapsible>

      <FlatList
        style={[styles.list, styles.listSideMargins]}
        data={delegations}
        keyExtractor={item => item.id}
        renderItem={delegation => renderItem(delegation, navigate)}
        refreshing={fetching}
        onRefresh={handleRefresh}
        contentContainerStyle={styles["content-container"]}
      />

      <TouchableOpacity
        style={style.addDelegationButton}
        title="+"
        onPress={() => navigate.navigate("CreateDelegation")}
      >
        <Icon.Ionicons name="md-add" style={style.addDelegationButtonText} />
      </TouchableOpacity>
    </View>
  );
};

DelegationsScreen.propTypes = {
  changeIsSortFilterPanelCollapsed: func,
  datesAreValid: bool,
  delegations: array,
  fetching: bool,
  filter: func,
  handleRefresh: func,
  isSortFilterPanelCollapsed: bool,
  navigate: object,
  sortItems: func
};

export default DelegationsScreen;
