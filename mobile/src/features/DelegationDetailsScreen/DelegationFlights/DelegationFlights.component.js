import React from "react";
import { View, Text, FlatList } from "react-native";
import { array, bool, number, object } from "prop-types";
import { FAB } from "react-native-paper";

import SpinnerWrapper from "../../../components/SpinnerWrapper/SpinnerWrapper.component";
import RenderFlightItem from "../../../components/renderers/RenderFlightItem.renderer";
import { extractKey } from "../../../helpers/extractors";

import styles from "./DelegationFlights.module.scss";

const DelegationFlights = props => {
  const { delegationId, fetching, flights, navigate } = props;
  return (
    <View style={styles.container}>
      <SpinnerWrapper spin={fetching} message="loading flights" containerStyle={styles.spinner}>
        <FlatList
          style={styles.list}
          data={flights}
          keyExtractor={extractKey}
          renderItem={RenderFlightItem}
          ListEmptyComponent={<Text style={styles.messageText}>Flights list is empty.</Text>}
        />
      </SpinnerWrapper>

      <FAB
        style={styles.addFlightButton}
        large
        icon="add"
        onPress={() => navigate.navigate("CreateDelegationFlight", { delegationId: delegationId })}
      />
    </View>
  );
};

DelegationFlights.propTypes = {
  delegationId: number,
  fetching: bool,
  flights: array,
  navigate: object
};

export default DelegationFlights;
