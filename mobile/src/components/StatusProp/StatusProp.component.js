import React from "react";
import { View, Text } from "react-native";

import { string } from "prop-types";
import styles from "./StatusProp.module.scss";

const StatusProp = props => {
  const { status } = props;

  return (
    <View style={[styles.status, styles[status]]}>
      <View style={styles.indicator} />
      <Text style={styles["content-" + status]}> {status} </Text>
    </View>
  );
};

StatusProp.propTypes = {
  status: string
};

export default StatusProp;
