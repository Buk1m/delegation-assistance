import { Text, View, Picker } from "react-native";
import React from "react";
import { string, object, array } from "prop-types";
import PlatformIcon from "../PlatformIcon/PlatformIcon.component";
import { TextInput } from "react-native-paper";

const pickerIconSize = 18;

const renderPickerItems = items => {
  return items.map(item => {
    return <Picker.Item key={item.key} label={item.label} value={item.value} />;
  });
};

const PaperPicker = ({
  input: { onChange, value },
  style: { containerStyle = null, viewStyle = null, pickerStyle = null },
  title,
  iconName,
  data,
  meta: { touched, error }
}) => {
  return (
    <View style={containerStyle}>
      <View style={viewStyle}>
        <View>
          {iconName && <PlatformIcon name={iconName} size={pickerIconSize} />}
          <Text> {title} </Text>
        </View>
        <View style={[pickerStyle]}>
          <TextInput
            mode="outlined"
            render={() => (
              <Picker selectedValue={value} onValueChange={value => onChange(value)}>
                {renderPickerItems(data)}
              </Picker>
            )}
          />
        </View>
      </View>
    </View>
  );
};

PaperPicker.propTypes = {
  data: array,
  iconName: string,
  input: object,
  meta: object,
  style: object,
  title: string
};

export default PaperPicker;
