import React from "react";
import { View, Text } from "react-native";
import { string, object } from "prop-types";

import PlatformIcon from "../../../../../components/PlatformIcon/PlatformIcon.component";

import styles from "./PaymentIcon.module.scss";
import colors from "../../../../../assets/styles/_constants.scss";

const PaymentIcon = props => {
  const { paymentType, style } = props;
  const paymentTypeInLower = paymentType.toLowerCase();
  const paymentIconSize = 26;

  return (
    <View style={style}>
      <View style={styles.circleContainer}>
        <PlatformIcon name={`${paymentTypeInLower}`} size={paymentIconSize} color={colors[paymentTypeInLower]} />
        <Text style={styles[`${paymentTypeInLower}PaymentType`]}>{paymentType}</Text>
      </View>
    </View>
  );
};

PaymentIcon.propTypes = {
  paymentType: string,
  style: object
};

export default PaymentIcon;
