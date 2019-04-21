import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { object } from "prop-types";
import style from "../CreateDelegationScreen/CreateDelegationButtonStyles.module.scss";

const DelegationsScreen = props => {
  const { navigate, delegationId } = props;

  return (
    <View>
      <TouchableOpacity
        title="+"
        onPress={() => navigate.navigate("CreateDelegation")}
      >
        <Text style={style.addDelegationButton}> + </Text>
      </TouchableOpacity>

      <TouchableOpacity title="e" onPress={() => navigate.navigate("CreateExpense", {delegationId: delegationId})}>
         <Text style={style.addDelegationButton}> E </Text>
      </TouchableOpacity>

      {/* TODO: delete when add delegations PR will me merged, and replace with sth else */}
      <TouchableOpacity title="[]" onPress={() => navigate.navigate("DelegationChecklist", {delegationId: delegationId})}>
        <Text style={style.addDelegationButton}> [] </Text>
      </TouchableOpacity>
    </View>
  );
};

DelegationsScreen.propTypes = {
  navigate: object
};

export default DelegationsScreen;
