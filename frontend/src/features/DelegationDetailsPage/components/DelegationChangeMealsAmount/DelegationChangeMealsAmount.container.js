import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bool, func, string, object } from "prop-types";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";

import { getFormatedDelegation, getDelegationObject } from "../../../../selectors/delegations.selectors";

import DelegationChangeMealsAmount from "./DelegationChangeMealsAmount.component";
import { updateDelegationMeals } from "../../../../actions/delegations.actions";
export class DelegationChangeMealsAmountContainer extends PureComponent {
  static propTypes = {
    canEditDelegation: bool,
    changeEditingMeal: func,
    delegation: object,
    delegationUnformatted: object,
    editingMealLabel: string,
    mealType: string,
    updateDelegationMeals: func
  };

  constructor(props) {
    super(props);
    this.delayedCallback = debounce(this.delayedHandleChangeMealsAmount, 500);
    this.fetchingMeals = false;
    this.editingMeal = "";
    this.delegationDiffDays = "";
  }

  state = {
    copyMeals: {}
  };

  componentDidMount = () => {
    this.setState({ copyMeals: { ...this.props.delegation.meals } });
  };

  updateMeals = () => {
    if (this.state.copyMeals.version !== this.props.delegation.meals.version) {
      this.setState({ copyMeals: this.props.delegation.meals });
    }
  };

  diffDays = (startDate, endDate) => {
    return Math.ceil((endDate - startDate) / 1000 / 60 / 60 / 24);
  };

  changeFetchingState = label => {
    this.fetchingMeals = !this.fetchingMeals;
    this.editingMeal = label;
  };

  stringToMathOperation = (firstArgument, signOperation, secondArgument) => {
    return Number(`${Number(firstArgument) + parseInt(signOperation + Number(secondArgument))}`);
  };

  handleChangeMealsAmount = async (label, signOperation) => {
    this.props.changeEditingMeal(this.props.mealType);
    await this.updateMeals();
    const copyOfCopyMeals = { ...this.state.copyMeals };
    const mealsNo = this.state.copyMeals[label];
    if (signOperation === "+" || signOperation === "-") {
      copyOfCopyMeals[label] = this.stringToMathOperation(mealsNo, signOperation, 1);
      this.setState({ copyMeals: copyOfCopyMeals });
      this.delayedCallback(label);
    } else {
      toast.error("Can't add or delete meal.");
      this.changeFetchingState("");
    }
  };

  handleOnChangeTyping = (event, label) => {
    let mealsAmount = parseInt(event.target.value, 10);
    if (mealsAmount < 0) {
      toast.error(`Incorrect amount of meals. Setting amount to 0.`);
      mealsAmount = 0;
    }
    if (mealsAmount > this.delegationDiffDays) {
      toast.error(`Incorrect amount of meals. Setting to the maximum allowed amount. `);
      mealsAmount = this.delegationDiffDays;
    }
    if (event.target.value.trim() === "") {
      mealsAmount = 0;
    }

    const copyOfCopyMeals = { ...this.state.copyMeals };
    copyOfCopyMeals[label] = mealsAmount;

    this.setState({ copyMeals: copyOfCopyMeals });
  };

  delayedHandleChangeMealsAmount = label => {
    if (!isEqual(this.state.copyMeals, this.props.delegation.meals)) {
      this.changeFetchingState(label);
      this.props.updateDelegationMeals(this.state.copyMeals, this.props.delegation.id).finally(() => {
        this.setState({ copyMeals: this.props.delegation.meals });
      });
      this.changeFetchingState("");
    }
    this.props.changeEditingMeal(undefined);
  };

  handleOnBlurTyping = async (event, label) => {
    event.persist();
    const newAmount = parseInt(event.target.value, 10);
    await this.updateMeals();
    const copyOfCopyMeals = { ...this.state.copyMeals };
    copyOfCopyMeals[label] = newAmount;
    this.setState({ copyMeals: copyOfCopyMeals });
    this.delayedHandleChangeMealsAmount(label);
  };

  isDisabledPlus = mealsAmount => {
    return (
      mealsAmount >= this.delegationDiffDays ||
      (this.props.editingMealLabel && this.props.editingMealLabel !== this.props.mealType)
    );
  };

  isDisabledMinus = mealsAmount => {
    return mealsAmount <= 0 || (this.props.editingMealLabel && this.props.editingMealLabel !== this.props.mealType);
  };

  render() {
    const diffDays = this.diffDays(
      this.props.delegationUnformatted.startDate,
      this.props.delegationUnformatted.endDate
    );

    this.delegationDiffDays = diffDays;
    return (
      <DelegationChangeMealsAmount
        mealAmount={this.state.copyMeals[this.props.mealType]}
        mealType={this.props.mealType}
        fetchingMeals={this.fetchingMeals}
        editingMeal={this.editingMeal}
        onClick={this.handleChangeMealsAmount}
        handleOnChangeTyping={this.handleOnChangeTyping}
        handleOnBlurTyping={this.handleOnBlurTyping}
        isDisabledPlus={this.isDisabledPlus}
        isDisabledMinus={this.isDisabledMinus}
        disabled={!this.props.canEditDelegation}
      />
    );
  }
}

const mapStateToProps = state => ({
  delegation: getFormatedDelegation(state),
  delegationUnformatted: getDelegationObject(state)
});

const mapDispatchToProps = {
  updateDelegationMeals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationChangeMealsAmountContainer);
