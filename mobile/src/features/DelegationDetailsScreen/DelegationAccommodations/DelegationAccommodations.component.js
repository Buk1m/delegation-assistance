import React from "react";
import { View, Text, FlatList } from "react-native";
import { array, bool, number, object } from "prop-types";
import { FAB } from "react-native-paper";

import SpinnerWrapper from "../../../components/SpinnerWrapper/SpinnerWrapper.component";
import RenderAccommodationItem from "../../../components/renderers/RenderAccommodationItem.renderer";
import { extractKey } from "../../../helpers/extractors";

import styles from "./DelegationAccommodations.module.scss";

const DelegationAccommodations = props => {
  const { accommodations, delegationId, fetching, navigate } = props;
  return (
    <View style={styles.container}>
      <SpinnerWrapper spin={fetching} message="loading accommodations" containerStyle={styles.spinner}>
        <FlatList
          style={styles.list}
          data={accommodations}
          keyExtractor={extractKey}
          ListEmptyComponent={<Text style={styles.messageText}>Accommodations list is empty.</Text>}
          renderItem={RenderAccommodationItem}
        />
      </SpinnerWrapper>

      <FAB
        style={styles.addAccommodationButton}
        large
        icon="add"
        onPress={() => navigate.navigate("CreateDelegationAccommodation", { delegationId: delegationId })}
      />
    </View>
  );
};

DelegationAccommodations.propTypes = {
  accommodations: array,
  delegationId: number,
  fetching: bool,
  navigate: object
};

export default DelegationAccommodations;
