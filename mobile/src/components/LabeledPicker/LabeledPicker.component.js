import { Text, View, Picker } from "react-native";
import React from "react";
import { string, object, array } from "prop-types";

import PlatformIcon from "../PlatformIcon/PlatformIcon.component";

import styles from "./LabeledPicker.module.scss";
import colors from "../../assets/styles/_colorPalette";

const pickerIconSize = 18;

const renderPickerItems = items => {
  return items.map(item => {
    return <Picker.Item key={item.key} label={item.label} value={item.value} />;
  });
};

const LabeledPicker = ({ input: { onChange, value }, style, title, iconName, data, pickerStyle }) => {
  return (
    <View style={style}>
      <View style={styles.title}>
        {iconName && <PlatformIcon name={iconName} size={pickerIconSize} color={colors.textColor} />}
        <Text> {title} </Text>
      </View>
      <View style={[styles.labeledPicker, pickerStyle]}>
        <Picker style={styles.text} selectedValue={value} onValueChange={value => onChange(value)}>
          {renderPickerItems(data)}
        </Picker>
      </View>
    </View>
  );
};

LabeledPicker.propTypes = {
  data: array,
  iconName: string,
  input: object,
  pickerStyle: object,
  style: object,
  title: string
};

export default LabeledPicker;
