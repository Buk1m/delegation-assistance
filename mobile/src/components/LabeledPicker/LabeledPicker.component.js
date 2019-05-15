import { Text, View, Picker } from "react-native";
import React from "react";
import { Icon } from "expo";
import { string, object, array } from "prop-types";

import styles from "./LabeledPickerStyles.scss";

const renderPickerItems = items => {
  return items.map(item => {
    return <Picker.Item key={item.key} label={item.label} value={item.value} />;
  });
};

const LabeledPicker = ({
  input: { onChange, value },
  style,
  title,
  iconName,
  data,
}) => {
  return (
    <View style={style}>
      <View style={styles.title}>
        <Icon.Ionicons name={iconName} />
        <Text> {title} </Text>
      </View>
      <View style={styles.labeledPicker}>
        <Picker
          style={styles.text}
          selectedValue={value}
          onValueChange={value => onChange(value)}
        >
          {renderPickerItems(data)}
        </Picker>
      </View>
    </View>
  );
};

LabeledPicker.propTypes = {
  input: object,
  style: object,
  title: string,
  iconName: string,
  data: array
};

export default LabeledPicker;
