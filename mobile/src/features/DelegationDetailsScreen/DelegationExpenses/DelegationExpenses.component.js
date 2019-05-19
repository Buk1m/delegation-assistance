import React from "react";
import { FlatList, Text, View } from "react-native";
import { array, bool, func, number, string } from "prop-types";
import Modal from "react-native-modal";

import DelegationExpense from "./components/DelegationExpense";
import IconButton from "../../../components/IconButton/IconButton.component";
import SpinnerWrapper from "../../../components/SpinnerWrapper/SpinnerWrapper.component";
import SortPanel from "./components/SortPanel/SortPanel.component";

import styles from "./DelegationExpenses.module.scss";

const renderDelegationExpense = (delegationId, expense) => {
  return <DelegationExpense expense={expense.item} delegationId={delegationId} />;
};

const isExpensesListEmpty = expenses => {
  return expenses && expenses.length === 0;
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
    sortItems,
    sortDirection,
    changeSortDirection
  } = props;

  return (
    <View>
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

      {isExpensesListEmpty(expenses) && !fetching ? (
        <Text>Expenses list is empty.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id.toString()}
          renderItem={expense => renderDelegationExpense(delegationId, expense)}
          refreshing={fetching}
          onEndReached={handleLoadMoreExpenses}
          onEndReachedThreshold={distanceBetweenBottomOfScreenAndBottomOfList}
          ListFooterComponent={<SpinnerWrapper spin={fetching} />}
        />
      )}
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
  sortDirection: string,
  sortItems: func
};

export default DelegationExpenses;
