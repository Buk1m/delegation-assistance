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
    return $("input[placeholder='Destination Location']");
  }

  get delegationObjective() {
    return $("input[placeholder='Delegation Objective']");
  }

  submit() {
    this.submitBtn.click();
  }

  selectStartPickerDay(day) {
    let date = "day-" + day;
    $(
      `label[for='startDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`
    ).click();
  }

  selectEndPickerDay(day) {
    let date = "day-" + day;
    $(
      `label[for='endDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`
    ).click();
  }

  //getters for error messages
  get destinationCountyErrorMsg() {
    return $("div.select-control > span");
  }
  get destinationLocationErrorMsg() {
    return $("input[placeholder='Destination Location'] + span");
  }

  get delegationObjectiveErrorMsg() {
    return $("input[placeholder='Delegation Objective'] + span");
  }

  get getAllRequiredMsg() {
    return $$("span*=required");
  }

  get startDateErrorMsg() {
    return $("label[for='startDate'] + div > span");
  }

  get endDateErrorMsg() {
    return $("label[for='endDate'] + div > span");
  }
}

export default new CreateDelegationPage();
