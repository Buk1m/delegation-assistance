import React from "react";
import { View, Text } from "react-native";
import { bool, string, object } from "prop-types";

import SpinnerWrapper from "../../SpinnerWrapper/SpinnerWrapper.component";
import styles from "./RenderDetailsRow.module.scss";

const RenderDetailsRow = ({ children, content, icon, title, fetching }) => {
  return (
    <View style={styles.dataRow}>
      <View style={styles.icon}>{icon}</View>
      <SpinnerWrapper spin={fetching}>
        <View>
          <Text style={styles.header}>{title}</Text>
          <View style={[styles.dataRow, styles.location]}>
            <Text>{content}</Text>
          </View>
          {children}
        </View>
      </SpinnerWrapper>
    </View>
  );
};

RenderDetailsRow.propTypes = {
  children: object,
  content: string,
  fetching: bool,
  icon: object,
  title: string
};

export default RenderDetailsRow;
