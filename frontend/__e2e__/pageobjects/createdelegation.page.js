import Page from "./page";

class CreateDelegationPage extends Page {
  open() {
    super.open("delegations/create");
  }

  get submitBtn() {
    return $('form button[type="submit"]');
  }

  get destinationCounty() {
    return $("#react-select-2-input");
  }

  get destinationLocation() {
    return $("#input_destinationLocation");
  }

  get delegationObjective() {
    return $("#input_delegationObjective");
  }

  get createdNotification() {
    return $(".Toastify__toast--success > .Toastify__toast-body");
  }

  submit() {
    this.submitBtn.click();
  }

  selectStartPickerDay(day) {
    const date = "day-" + day;
    $(
      `label[for='input_startDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`
    ).click();
  }

  selectEndPickerDay(day) {
    const date = "day-" + day;
    $(`label[for='input_endDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`).click();
  }

  //getters for error messages
  get destinationCountyErrorMsg() {
    return $("div.select-control > span");
  }
  get destinationLocationErrorMsg() {
    return $("#input_destinationLocation + span");
  }

  get delegationObjectiveErrorMsg() {
    return $("#input_delegationObjective + span");
  }

  get getAllRequiredMsg() {
    return $$("span*=required");
  }

  get startDateErrorMsg() {
    return $("label[for='input_startDate'] + div > span");
  }

  get endDateErrorMsg() {
    return $("label[for='input_endDate'] + div > span");
  }
}

export default new CreateDelegationPage();
