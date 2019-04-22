import React from "react";
import { Text, View } from "react-native";
import { string, object } from "prop-types";

import PropHeader from "../PropHeader/PropHeader.component";

import styles from "./DelegationPropStyles.scss";

const DelegationProp = props => {
  return (
    <View style={props.style}>
      <PropHeader title={props.title} />
      <Text style={styles.propHeaderContent}>{props.content}</Text>
    </View>
  );
};

DelegationProp.propTypes = {
  style: object,
  title: string,
  content: string
};

export default DelegationProp;
