import React from "react";
import { Text, View } from "react-native";
import { string } from "prop-types";

import styles from "./PropHeaderStyles.scss";

const PropHeader = props => {
  return (
    <View>
      <Text style={styles.propHeader}>{props.title}</Text>
    </View>
  );
};

PropHeader.propTypes = {
  title: string
};

export default PropHeader;
