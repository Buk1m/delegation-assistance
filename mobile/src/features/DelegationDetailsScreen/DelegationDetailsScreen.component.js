import React from "react";
import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import { func, number, object } from "prop-types";
import DelegationChecklist from "./DelegationChecklist/DelegationChecklist.container";
import DelegationDetails from "./DelegationDetails/DelegationDetails.container";
import DelegationExpenses from "./DelegationExpenses/DelegationExpenses.container";
import DelegationAccommodations from "./DelegationAccommodations/DelegationAccommodations.container";
import DelegationFlights from "./DelegationFlights/DelegationFlights.container";
import styles from "./DelegationDetailsScreen.module.scss";

const tabsNames = [
  "DelegationDetails",
  "DelegationChecklist",
  "DelegationExpenses",
  "DelegationAccommodations",
  "DelegationFlights"
];

const handleChangeTab = (tabIndex, setCurrentTabName) => {
  setCurrentTabName(tabsNames[tabIndex]);
};

const initialTabIndex = 0;

const DelegationDetailsScreen = props => {
  const { delegationId, navigate, setFunctionForCollapsing, setCurrentTabName } = props;

  return (
    <ScrollableTabView
      tabBarBackgroundColor={styles.primary}
      tabBarUnderlineStyle={styles.underline}
      tabBarActiveTextColor={styles.primaryTextColor}
      tabBarTextStyle={styles["tab-label"]}
      initialPage={initialTabIndex}
      renderTabBar={() => <ScrollableTabBar />}
      onChangeTab={({ i }) => handleChangeTab(i, setCurrentTabName)}
    >
      <DelegationDetails delegationId={delegationId} tabLabel="Details" />
      <DelegationChecklist delegationId={delegationId} tabLabel="Checklist" />
      <DelegationExpenses
        delegationId={delegationId}
        navigate={navigate}
        tabLabel="Expenses"
        setFunctionForCollapsing={setFunctionForCollapsing}
      />
      <DelegationAccommodations delegationId={delegationId} navigate={navigate} tabLabel="Accommodations" />
      <DelegationFlights delegationId={delegationId} navigate={navigate} tabLabel="Flights" />
    </ScrollableTabView>
  );
};

DelegationDetailsScreen.propTypes = {
  delegationId: number,
  navigate: object,
  setCurrentTabName: func,
  setFunctionForCollapsing: func
};

export default DelegationDetailsScreen;
