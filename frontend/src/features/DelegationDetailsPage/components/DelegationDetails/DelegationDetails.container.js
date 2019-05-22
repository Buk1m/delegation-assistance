/* eslint no-eval: 0 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { number, object, func, bool } from "prop-types";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import debounce from "lodash";

import {
  getFormatedDelegation,
  getDelegationFetching,
  getDelegationObject
} from "../../../../selectors/delegations.selectors";
import { fetchDelegation, updateDelegationMeals } from "../../../../actions/delegations.actions";
import DelegationDetails from "./DelegationDetails.component";

class DelegationDetailsContainer extends Component {
  static propTypes = {
    delegation: object,
    delegationId: number,
    delegationUnformatted: object,
    fetchDelegation: func,
    fetching: bool,
    history: object,
    updateDelegationMeals: func
  };

  constructor(props) {
    super(props);
    this.delayedCallback = debounce.debounce(this.delayedHandleChangeMealsAmount, 0);
    this.delayedCallbackTyping = debounce.debounce(this.delayedHandleChangeMealsAmountTyping, 800);
    this.fetchingMeals = false;
    this.editingMeal = "";
    this.delegationDiffDays = "";
  }

  _redirectToDelegationsPage = () => this.props.history.push("/delegations");

  componentDidMount = () => {
    this.props.fetchDelegation(this.props.delegationId).then(
      () => {},
      error => {
        if (!error.response) {
          toast.error(error.message);
          return;
        }
        switch (error.response.status) {
          case 401:
            toast.error("Unauthorized.");
            break;
          case 404:
            toast.error(`Delegation with id "${this.delegationId}" not found.`);
            break;
          default:
            toast.error(`Unexpected error.`);
            break;
        }
        this._redirectToDelegationsPage();
      }
    );
  };

  diffDays = (startDate, endDate) => {
    return Math.ceil((endDate - startDate) / 1000 / 60 / 60 / 24);
  };

  changeFetchingState = label => {
    this.fetchingMeals = !this.fetchingMeals;
    this.editingMeal = label;
  };

  handleChangeMealsAmount = (label, signOperation) => {
    this.delayedCallback(label, signOperation);
  };

  handleChangeMealsAmountTyping = (event, label) => {
    const newDelegationMeals = { ...this.props.delegation };
    newDelegationMeals.meals[label] = event.target.value;
    this.setState({ delegation: newDelegationMeals });
    event.persist();
    this.delayedCallbackTyping(event.target.value, label);
  };

  delayedHandleChangeMealsAmount = (label, signOperation) => {
    const newDelegationMeals = { ...this.props.delegation.meals };
    this.changeFetchingState(label);
    const mealNo = newDelegationMeals[label];
    switch (signOperation) {
      case "+":
      case "-":
        newDelegationMeals[label] = eval(`${mealNo} ${signOperation} 1`);
        if (newDelegationMeals[label] >= 0 && newDelegationMeals[label] <= this.delegationDiffDays) {
          this.props.updateDelegationMeals(newDelegationMeals, this.props.delegationId);
        }
        this.changeFetchingState("");
        break;
      default:
        toast.error("Can't add or delete meal.");
        this.changeFetchingState("");
        break;
    }
  };

  delayedHandleChangeMealsAmountTyping = (value, label) => {
    this.changeFetchingState(label);
    const newDelegationMeals = { ...this.props.delegation.meals };
    let mealsAmount = parseInt(value, 10);
    if (mealsAmount < 0) {
      toast.error(`Incorrect amount of meals. Setting amount to 0.`);
      mealsAmount = 0;
    }
    if (mealsAmount > this.delegationDiffDays) {
      toast.error(`Incorrect amount of meals. Setting to the maximum allowed amount. `);
      mealsAmount = this.delegationDiffDays;
    }
    if (value.trim() === "") {
      mealsAmount = 0;
    }
    newDelegationMeals[label] = mealsAmount;
    this.props.updateDelegationMeals(newDelegationMeals, this.props.delegationId);
    this.changeFetchingState("");
  };

  render() {
    const diffDays = this.diffDays(
      this.props.delegationUnformatted.startDate,
      this.props.delegationUnformatted.endDate
    );
    this.delegationDiffDays = diffDays;
    return (
      <DelegationDetails
        delegation={this.props.delegation}
        initialValues={this.props.delegation}
        fetching={this.props.fetching}
        handleChangeMealsAmount={this.handleChangeMealsAmount}
        handleChangeMealsAmountTyping={this.handleChangeMealsAmountTyping}
        maxMealsAmount={this.delegationDiffDays}
        fetchingMeals={this.fetchingMeals}
        editingMeal={this.editingMeal}
      />
    );
  }
}

const mapStateToProps = state => ({
  delegation: getFormatedDelegation(state),
  delegationUnformatted: getDelegationObject(state),
  fetching: getDelegationFetching(state)
});

const mapDispatchToProps = {
  fetchDelegation,
  updateDelegationMeals
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DelegationDetailsContainer)
);
