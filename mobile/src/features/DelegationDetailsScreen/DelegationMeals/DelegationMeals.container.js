import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, number, object } from "prop-types";
import { showMessage } from "react-native-flash-message";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";

import { fetchDelegation, updateDelegationMeals } from "../../../actions/delegations.actions";
import {
  getDelegationFetching,
  getDelegation,
  getDelegationUpdatingMeals
} from "../../../selectors/delegations.selectors";
import DelegationMeals from "./DelegationMeals.component";

class DelegationMealsContainer extends Component {
  static propTypes = {
    delegationId: number,
    delegationUnformatted: object,
    fetchDelegation: func,
    fetching: bool,
    fetchingMeals: bool,
    updateDelegationMeals: func
  };

  constructor(props) {
    super(props);
    this.delayedCallback = debounce(this.delayedHandleChangeMealsAmount, 1000);
    this.delegationDiffDays = "";
  }

  state = {
    copyMeals: {}
  };

  componentDidMount = () => {
    this.props.fetchDelegation(this.props.delegationId);
    this.setState({ copyMeals: { ...this.props.delegationUnformatted.meals } });
  };

  diffDays = (startDate, endDate) => {
    return Math.ceil((new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24);
  };

  isDisabledPlus = mealsAmount => {
    return mealsAmount >= this.delegationDiffDays || this.props.fetchingMeals;
  };

  isDisabledMinus = mealsAmount => {
    return mealsAmount <= 0 || this.props.fetchingMeals;
  };

  isDisableInput = () => {
    return this.props.fetchingMeals;
  };

  stringToMathOperation = (firstArgument, signOperation, secondArgument) => {
    return Number(`${Number(firstArgument) + parseInt(signOperation + Number(secondArgument))}`);
  };

  handleChangeMealsAmount = (label, signOperation) => {
    const copyOfCopyMeals = { ...this.state.copyMeals };
    const mealsNo = this.state.copyMeals[label];
    if (signOperation === "+" || signOperation === "-") {
      copyOfCopyMeals[label] = this.stringToMathOperation(mealsNo, signOperation, 1);
      this.setState({ copyMeals: copyOfCopyMeals });
      this.delayedCallback();
    } else {
      showMessage({ message: "Can't add or delete meal.", type: "danger" });
    }
  };

  handleOnChangeTyping = (event, label) => {
    let mealsAmount = parseInt(event.nativeEvent.text, 10);
    if (mealsAmount < 0) {
      showMessage({ message: "Incorrect amount of meals. Setting amount to 0.", type: "danger" });
      mealsAmount = 0;
    }
    if (mealsAmount > this.delegationDiffDays) {
      showMessage({ message: "Incorrect amount of meals. Setting to the maximum allowed amount.", type: "danger" });
      mealsAmount = this.delegationDiffDays;
    }
    if (event.nativeEvent.text.trim() === "") {
      mealsAmount = 0;
    }

    const copyOfCopyMeals = { ...this.state.copyMeals };
    copyOfCopyMeals[label] = mealsAmount;

    this.setState({ copyMeals: copyOfCopyMeals });
  };

  handleOnBlurTyping = (event, label) => {
    const newAmount = parseInt(event.nativeEvent.text, 10);
    const copyOfCopyMeals = { ...this.state.copyMeals };
    copyOfCopyMeals[label] = newAmount;
    this.setState({ copyMeals: copyOfCopyMeals });
    this.delayedHandleChangeMealsAmount();
  };

  delayedHandleChangeMealsAmount = () => {
    if (!isEqual(this.state.copyMeals, this.props.delegationUnformatted.meals)) {
      this.props.updateDelegationMeals(this.state.copyMeals, this.props.delegationId).finally(() => {
        this.setState({ copyMeals: this.props.delegationUnformatted.meals });
      });
    }
  };

  render() {
    this.delegationDiffDays = this.diffDays(
      this.props.delegationUnformatted.startDate,
      this.props.delegationUnformatted.endDate
    );

    return (
      <DelegationMeals
        copyMeals={this.state.copyMeals}
        fetching={this.props.fetching}
        isDisabledPlus={this.isDisabledPlus}
        isDisabledMinus={this.isDisabledMinus}
        handleChangeMealsAmount={this.handleChangeMealsAmount}
        handleOnChangeTyping={this.handleOnChangeTyping}
        handleOnBlurTyping={this.handleOnBlurTyping}
        isDisableInput={this.isDisableInput}
        fetchingMeals={this.props.fetchingMeals}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: getDelegationFetching(state),
    delegationUnformatted: getDelegation(state),
    fetchingMeals: getDelegationUpdatingMeals(state)
  };
};

const mapDispatchToProps = {
  fetchDelegation,
  updateDelegationMeals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationMealsContainer);
