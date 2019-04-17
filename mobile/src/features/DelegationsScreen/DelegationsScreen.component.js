import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { object } from "prop-types";
import style from "../CreateDelegationScreen/CreateDelegationButtonStyles.module.scss";

const DelegationsScreen = props => {
  const { navigate } = props;

  return (
    <View>
      <TouchableOpacity
        title="+"
        onPress={() => navigate.navigate("CreateDelegation")}
      >
        <Text style={style.addDelegationButton}> + </Text>
      </TouchableOpacity>
    </View>
  );
};

DelegationsScreen.propTypes = {
  navigate: object
};

export default DelegationsScreen;
