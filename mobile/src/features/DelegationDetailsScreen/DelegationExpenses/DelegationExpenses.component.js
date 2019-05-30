import React from "react";
import { FlatList, Text, View } from "react-native";
import { array, bool, func, number, object, string } from "prop-types";
import Modal from "react-native-modal";
import { FAB } from "react-native-paper";

import DelegationExpense from "./components/DelegationExpense";
import IconButton from "../../../components/IconButton/IconButton.component";
import SpinnerWrapper from "../../../components/SpinnerWrapper/SpinnerWrapper.component";
import SortPanel from "./components/SortPanel/SortPanel.component";
import { extractKey } from "../../../helpers/extractors";

import styles from "./DelegationExpenses.module.scss";

const renderDelegationExpense = (delegationId, expense) => {
  return <DelegationExpense expense={expense.item} delegationId={delegationId} />;
};

const distanceBetweenBottomOfScreenAndBottomOfList = 0.000001;

const DelegationExpenses = props => {
  const {
    delegationId,
    expenses,
    fetching,
    handleLoadMoreExpenses,
    changeIsSortFilterPanelCollapsed,
    isSortFilterPanelCollapsed,
    navigate,
    sortItems,
    sortDirection,
    changeSortDirection
  } = props;

  return (
    <View style={styles.container}>
      <Modal isVisible={!isSortFilterPanelCollapsed}>
        <View style={styles.modal} collapsed={isSortFilterPanelCollapsed}>
          <View style={styles.filters}>
            <SortPanel onSubmit={sortItems} sortDirection={sortDirection} changeSortDirection={changeSortDirection} />
          </View>
          <IconButton
            style={styles.collapseButton}
            iconStyle={styles.iconStyle}
            iconName="close-circle"
            onPress={changeIsSortFilterPanelCollapsed}
          />
        </View>
      </Modal>

      <FlatList
        data={expenses}
        keyExtractor={extractKey}
        renderItem={expense => renderDelegationExpense(delegationId, expense)}
        refreshing={fetching}
        onEndReached={handleLoadMoreExpenses}
        onEndReachedThreshold={distanceBetweenBottomOfScreenAndBottomOfList}
        ListEmptyComponent={!fetching && <Text style={styles.messageText}>Expenses list is empty.</Text>}
        ListFooterComponent={
          <SpinnerWrapper spin={fetching} message="loading expenses" containerStyle={styles.spinner} />
        }
      />

      <FAB
        style={styles.addExpenseButton}
        large
        icon="add"
        onPress={() => navigate.navigate("CreateExpense", { delegationId: delegationId })}
      />
    </View>
  );
};

DelegationExpenses.propTypes = {
  changeIsSortFilterPanelCollapsed: func,
  changeSortDirection: func,
  delegationId: number,
  expenses: array,
  fetching: bool,
  handleLoadMoreExpenses: func,
  isSortFilterPanelCollapsed: bool,
  navigate: object,
  sortDirection: string,
  sortItems: func
};

export default DelegationExpenses;
