import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";
import moment from "moment";

import { fetchMyDelegations } from "../../actions/delegations.actions";
import { getDelegations, getDelegationsFetching } from "../../selectors/delegations.selectors";
import HomeScreen from "./HomeScreen.component";

const loginImage = require("../../assets/images/login.jpg");

class HomeScreenContainer extends Component {
  static navigationOptions = {
    title: "Home"
  };

  static propTypes = {
    delegations: array,
    fetchMyDelegations: func,
    fetching: bool
  };

  componentDidMount() {
    this.props.fetchMyDelegations();
  }

  _getClosestDelegation = delegations => {
    if (delegations.length > 1) {
      delegations.sort((a, b) => moment(new Date(b.startDate)) - moment(new Date(a.startDate)));
    }

    return delegations[0];
  };

  render() {
    return (
      <HomeScreen
        navigate={this.props.navigation}
        fetching={this.props.fetching}
        delegation={this._getClosestDelegation(this.props.delegations)}
        imageUri={loginImage}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    delegations: getDelegations(state),
    fetching: getDelegationsFetching(state)
  };
};

const mapDispatchToProps = {
  fetchMyDelegations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenContainer);
