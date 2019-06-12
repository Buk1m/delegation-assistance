import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, number, object, string } from "prop-types";
import { toast } from "react-toastify";

import ReportPage from "./ReportPage.component";
import { fetchReport, downloadReport } from "../../actions/report.actions";
import { updateDelegationStatus } from "../../actions/delegations.actions";
import {
  getReportFetching,
  getReportFlights,
  getReportAccommodations,
  getReportExpenses,
  getReportMeals,
  getReportDiet,
  getReportDiemReturns,
  getReportTotalRepayment,
  getReportTargetCurrency,
  getReportAllowance,
  getReportStartDate,
  getReportEndDate,
  getReportDuration,
  getReportPlace,
  getReportDelegationStatus,
  getReportDelegationVersion
} from "../../selectors/report.selectors";
import { downloadFileFromResponse } from "../../helpers";
import { delegationStatusCodes } from "../../config";
import { confirmationModal } from "../../helpers/confirmationModal";

export class ReportPageContainer extends Component {
  static propTypes = {
    accommodations: array,
    allowance: array,
    delegationStatus: string,
    delegationVersion: number,
    details: array,
    diemReturns: array,
    diet: array,
    downloadReport: func,
    expenses: array,
    fetchReport: func,
    fetching: bool,
    flights: array,
    history: object,
    match: object,
    meals: array,
    targetCurrency: string,
    totalRepayment: number,
    updateDelegationStatus: func
  };

  constructor(props) {
    super(props);

    this.delegationId = this.props.match.params.delegationId;
    if (isNaN(parseInt(this.delegationId))) {
      this._rejected();
    }
  }

  _rejected = () => {
    toast.error(`Invalid delegation with id: ${this.delegationId}`);
    this._redirectToDelegationsPage();
  };

  _redirectToDelegationsPage = () => this.props.history.push("/delegations/my");

  _handleSendToManager = () => {
    const action = () =>
      this.props
        .updateDelegationStatus(this.delegationId, delegationStatusCodes.PREPARED, this.props.delegationVersion)
        .then(() => {
          this._redirectToDelegationsPage();
        });
    confirmationModal("Send delegatiion", "This delegation will be sent to travel manager.", action);
  };

  _handleDownloadReport = report => {
    if (report) {
      return this.props
        .downloadReport(this.delegationId, report.type)
        .then(response => downloadFileFromResponse(response, report.filename(this.delegationId)));
    } else {
      toast.error("Invalid report type");
    }
  };

  componentDidMount = () => {
    this.props.fetchReport(this.delegationId).catch(() => this._rejected());
  };

  render() {
    return (
      <ReportPage
        handleDownloadReport={this._handleDownloadReport}
        handleSendToManager={this._handleSendToManager}
        fetching={this.props.fetching}
        flights={this.props.flights}
        accommodations={this.props.accommodations}
        expenses={this.props.expenses}
        totalRepayment={this.props.totalRepayment}
        targetCurrency={this.props.targetCurrency}
        diet={this.props.diet}
        diemReturns={this.props.diemReturns}
        allowance={this.props.allowance}
        meals={this.props.meals}
        details={this.props.details}
        delegationStatus={this.props.delegationStatus}
      />
    );
  }
}

const mapStateToProps = state => ({
  fetching: getReportFetching(state),
  flights: getReportFlights(state),
  accommodations: getReportAccommodations(state),
  expenses: getReportExpenses(state),
  meals: getReportMeals(state),
  diet: getReportDiet(state),
  diemReturns: getReportDiemReturns(state),
  allowance: getReportAllowance(state),
  totalRepayment: getReportTotalRepayment(state),
  targetCurrency: getReportTargetCurrency(state),
  delegationStatus: getReportDelegationStatus(state),
  delegationVersion: getReportDelegationVersion(state),
  details: [
    {
      startDate: getReportStartDate(state),
      endDate: getReportEndDate(state),
      duration: getReportDuration(state),
      place: getReportPlace(state)
    }
  ]
});

const mapDispatchToProps = {
  fetchReport,
  downloadReport,
  updateDelegationStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPageContainer);
