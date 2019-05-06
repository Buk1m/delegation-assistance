import React from "react";
import { Text } from "react-native";
import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";

import DelegationChecklist from "./DelegationChecklist/DelegationChecklist.container";
import DelegationDetails from "./DelegationDetails/DelegationDetails.container";
import styles from "./DelegationDetailsScreen.module.scss";

const DelegationDetailsScreen = () => {
  return (
    <ScrollableTabView
      tabBarBackgroundColor={styles.primary}
      tabBarUnderlineStyle={styles.underline}
      tabBarActiveTextColor={styles.primaryTextColor}
      tabBarTextStyle={styles["tab-label"]}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
    >
      <DelegationDetails tabLabel="Details" />
      <DelegationChecklist tabLabel="Checklist" />
      <Text tabLabel="Expenses">
        TODO: IDEMIA2019-174 [Mobile] Jako pracownik mogę zobaczyć wydatki w delegacji
        https://atlas.it.p.lodz.pl/jira/browse/IDEMIA2019-174
      </Text>
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

export default DelegationDetailsScreen;
