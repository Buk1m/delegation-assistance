import React from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { bool, number, object } from "prop-types";

import Delegation from "../DelegationsScreen/components/Delegation/Delegation.component";
import SpinnerWrapper from "../../components/SpinnerWrapper/SpinnerWrapper.component";
import TextView from "../../components/TextView/TextView.component";

import styles from "./HomeScreen.module.scss";

const HomeScreen = props => {
  const { navigate, delegation, fetching, imageUri } = props;
  return (
    <View style={styles.container}>
      <SpinnerWrapper spin={fetching} message="loading data" containerStyle={styles.spinner}>
        <ImageBackground style={styles.image} source={imageUri}>
          <TextView textStyle={styles.welcomeText} viewStyle={styles.welcomeTextBackgroundStyle} title="Welcome!" />

          <TextView
            textStyle={styles.latestDelegationText}
            viewStyle={styles.textBackgroundStyle}
            title="Latest delegation"
          />
          {delegation ? (
            <TextView
              textStyle={styles.latestDelegationText}
              viewStyle={styles.noDelegationsTextBackgroundStyle}
              title="No delegations"
            />
          ) : (
            <TouchableOpacity
              style={styles.delegation}
              onPress={() => navigate.navigate("DelegationDetails", { delegationId: delegation.id })}
            >
              <Delegation data={delegation} />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </SpinnerWrapper>
    </View>
  );
};

HomeScreen.propTypes = {
  delegation: object,
  fetching: bool,
  imageUri: number,
  navigate: object
};

export default HomeScreen;
