import React from "react";
import { View } from "react-native";
import { bool, object } from "prop-types";
import { Icon } from "expo";

import StatusProp from "../../../components/StatusProp/StatusProp.component";
import Button from "../../../components/Button/Button.component";
import RenderDetailsRow from "../../../components/renderers/RenderDetailsRow/RenderDetailsRow.renderer";
import styles from "./DelegationDetails.module.scss";

const DelegationDetails = props => {
  const {
    delegationObjective,
    destinationCountry,
    destinationLocation,
    diet,
    endDate,
    startDate,
    status
  } = props.delegation;
  return (
    <View style={[styles.delegation, styles[status]]}>
      <View style={styles.status}>
        <StatusProp status={status} />
      </View>
      <RenderDetailsRow
        title={"Destination:"}
        content={`${destinationCountry} - ${destinationLocation}`}
        icon={<Icon.Ionicons size={24} color="white" name="md-pin" s tyle={styles.pin} />}
        fetching={props.fetching}
      />
      <RenderDetailsRow
        title={"Delegation period:"}
        content={`${startDate} - ${endDate}`}
        icon={<Icon.MaterialIcons size={24} color="white" name="date-range" />}
        fetching={props.fetching}
      />
      <RenderDetailsRow
        title={"Diet:"}
        content={`${diet.perDiem} ${diet.currency}`}
        icon={<Icon.MaterialCommunityIcons size={24} color="white" name="food-apple" />}
        fetching={props.fetching}
      />
      <RenderDetailsRow
        title={"Objective:"}
        content={`${delegationObjective}`}
        icon={<Icon.MaterialCommunityIcons size={24} color="white" name="target" />}
        fetching={props.fetching}
      />
      <View style={styles.submit}>
        <Button title="Submit delegation" icon={<Icon.FontAwesome size={20} color="white" name="send" />} />
      </View>
    </View>
  );
};

DelegationDetails.propTypes = {
  delegation: object,
  fetching: bool
};

export default DelegationDetails;
