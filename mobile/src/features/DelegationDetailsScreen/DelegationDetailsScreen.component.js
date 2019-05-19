import React from "react";
import { Text } from "react-native";
import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import { func, number } from "prop-types";
import DelegationChecklist from "./DelegationChecklist/DelegationChecklist.container";
import DelegationDetails from "./DelegationDetails/DelegationDetails.container";
import DelegationExpenses from "./DelegationExpenses/DelegationExpenses.container";
import styles from "./DelegationDetailsScreen.module.scss";

const tabsNames = [
  "DelegationDetails",
  "DelegationChecklist",
  "DelegationExpenses",
  "DelegationAccommodation",
  "DelegationFlights"
];

const handleChangeTab = (tabIndex, setCurrentTabName) => {
  setCurrentTabName(tabsNames[tabIndex]);
};

const initialTabIndex = 0;

const DelegationDetailsScreen = props => {
  const { delegationId, setFunctionForCollapsing, setCurrentTabName } = props;

  return (
    <ScrollableTabView
      tabBarBackgroundColor={styles.primary}
      tabBarUnderlineStyle={styles.underline}
      tabBarActiveTextColor={styles.primaryTextColor}
      tabBarTextStyle={styles["tab-label"]}
      initialPage={initialTabIndex}
      renderTabBar={() => <ScrollableTabBar />}
      // eslint-disable-next-line no-unused-vars
      onChangeTab={({ i, ref }) => handleChangeTab(i, setCurrentTabName)}
    >
      <DelegationDetails delegationId={delegationId} tabLabel="Details" />
      <DelegationChecklist delegationId={delegationId} tabLabel="Checklist" />
      <DelegationExpenses
        delegationId={delegationId}
        tabLabel="Expenses"
        setFunctionForCollapsing={setFunctionForCollapsing}
      />
      <Text tabLabel="Accommodation">
        TODO: IDEMIA2019-199 [Mobile] Jako pracownik mogę dodać zakwaterowanie do mojej delegacji
        https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-199
      </Text>
      <Text tabLabel="Flights">
        TODO: IDEMIA2019-196 [MOBILE] Jako pracownik mogę dodać lot do mojej delegacji
        https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-196
      </Text>
    </ScrollableTabView>
  );
};

DelegationDetailsScreen.propTypes = {
  delegationId: number,
  setCurrentTabName: func,
  setFunctionForCollapsing: func
};

export default DelegationDetailsScreen;
