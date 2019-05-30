import React from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import Collapsible from "react-native-collapsible";
import { array, bool, func, object } from "prop-types";
import { FAB } from "react-native-paper";

import Delegation from "./components/Delegation/Delegation.component";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.component";
import FilterPanel from "./components/FilterPanel/FilterPanel.component";
import SortPanel from "./components/SortPanel/SortPanel.component";
import IconButton from "../../components/IconButton/IconButton.component";
import { extractKey } from "../../helpers/extractors";

import styles from "./DelegationsScreen.module.scss";

const renderItem = (delegation, navigate) => {
  return (
    <TouchableOpacity onPress={() => navigate.navigate("DelegationDetails", { delegationId: delegation.item.id })}>
      <Delegation data={delegation.item} />
    </TouchableOpacity>
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
          iconName="arrow-dropup-circle"
          onPress={changeIsSortFilterPanelCollapsed}
        />
      </Collapsible>

      <Collapsible collapsed={datesAreValid}>
        <ErrorMessage message="Dates are invalid!" />
      </Collapsible>

      <FlatList
        style={[styles.list, styles.listSideMargins]}
        data={delegations}
        keyExtractor={extractKey}
        renderItem={delegation => renderItem(delegation, navigate)}
        refreshing={fetching}
        onRefresh={handleRefresh}
        contentContainerStyle={styles["content-container"]}
      />

      <FAB style={styles.addDelegationButton} large icon="add" onPress={() => navigate.navigate("CreateDelegation")} />
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
