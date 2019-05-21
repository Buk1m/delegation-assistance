import React from "react";
import { View, Text } from "react-native";
import { string, object } from "prop-types";

import PlatformIcon from "../../../../../components/PlatformIcon/PlatformIcon.component";

import styles from "./PaymentIcon.module.scss";
import colors from "../../../../../assets/styles/_constants.scss";

const getPaymentTypeName = paymentType => {
  switch (paymentType.toLowerCase()) {
    case "credit_card":
      return "card";
    case "cash":
      return "cash";
    default:
      return "default";
  }
};

const PaymentIcon = props => {
  const { paymentType, style } = props;
  const paymentTypeName = getPaymentTypeName(paymentType);
  const paymentIconSize = 26;

  return (
    <View style={style}>
      <View style={styles.circleContainer}>
        <PlatformIcon name={`${paymentTypeName}`} size={paymentIconSize} color={colors[paymentTypeName]} />
        <Text style={styles[`${paymentTypeName}PaymentType`]}>{paymentTypeName.toUpperCase()}</Text>
      </View>
    </View>
  );
};

PaymentIcon.propTypes = {
  paymentType: string,
  style: object
};

export default PaymentIcon;
