import React, { Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import localStyles from "./FileListStyles.module.scss";

const PaymentType = ({ payType, choosePayType }) => {
  const iconSize = 32;
  return (
    <View style={localStyles.container}>
      {payType === "CREDIT_CARD" ? (
        <Fragment>
          <TouchableOpacity>
            <Text style={localStyles["left-button-active"]}>
              <Ionicons name="ios-card" size={iconSize} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              choosePayType("CASH");
            }}
          >
            <Text style={localStyles["right-button-inactive"]}>
              <Ionicons name="ios-cash" size={iconSize} />
            </Text>
          </TouchableOpacity>
        </Fragment>
      ) : (
        <Fragment>
          <TouchableOpacity
            onPress={() => {
              choosePayType("CREDIT_CARD");
            }}
          >
            <Text style={localStyles["left-button-inactive"]}>
              <Ionicons name="ios-card" size={iconSize} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={localStyles["right-button-active"]}>
              <Ionicons name="ios-cash" size={iconSize} />
            </Text>
          </TouchableOpacity>
        </Fragment>
      )}
    </View>
  );
};

export default PaymentType;
