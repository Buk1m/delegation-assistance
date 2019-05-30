import React from "react";
import { View, Text } from "react-native";
import { array, string, object, oneOfType } from "prop-types";

const TextView = props => {
  const { title, textStyle, viewStyle } = props;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

TextView.propTypes = {
  textStyle: oneOfType([object, array]),
  title: string,
  viewStyle: oneOfType([object, array])
};

export default TextView;
