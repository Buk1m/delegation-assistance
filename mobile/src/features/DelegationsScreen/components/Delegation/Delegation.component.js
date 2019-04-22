import React from "react";
import { View } from "react-native";
import { object } from "prop-types";

import DelegationProp from "../DelegationProp/DelegationProp.component";

import styles from "./DelegationStyles.scss";

const Delegation = props => {
  const {
    startDate,
    endDate,
    country,
    destinationLocation,
    status,
    delegationObjective
  } = props.data;

  return (
    <View style={styles.delegation}>
      <View style={styles.dataRow}>
        <DelegationProp
          style={styles.flex1}
          title="Date from"
          content={startDate}
        />
        <DelegationProp
          style={styles.flex2}
          title="Date to"
          content={endDate}
        />
      </View>
      <View style={styles.dataRow}>
        <DelegationProp
          style={styles.flex1}
          title="Country"
          content={country}
        />
        <DelegationProp
          style={styles.flex1}
          title="City"
          content={destinationLocation}
        />
        <DelegationProp
          style={styles.flex1}
          title="Status"
          content={status}
        />
      </View>
      <DelegationProp
        style={styles.flex1}
        title="Description"
        content={delegationObjective}
      />
    </View>
  );
};

Delegation.propTypes = {
  data: object
};

export default Delegation;
