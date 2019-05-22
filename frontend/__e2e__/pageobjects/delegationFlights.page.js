import Page from "./page";

class DelegationFlightsPage extends Page {
  open(delegationId) {
    super.open(`delegations/${delegationId}`);
  }

  openAddFlightModal() {
    $("button[data-target='#addFlightModal']").click();
  }

  get locationFrom() {
    return $("//input[@id='input_departurePlace']");
  }

  get locationTo() {
    return $("//input[@id='input_arrivalPlace']");
  }

  get getAllRequiredMsg() {
    return $$("span*=required");
  }

  get addFlightModal() {
    return $("//*[@id='addFlightModal']");
  }

  get flights() {
    return $$("div.flight");
  }

  get noFlightsMessage() {
    return $(".flights p");
  }

  get flightAddedNotification() {
    return $(".Toastify__toast--success > .Toastify__toast-body");
  }

  get dateError() {
    return $("span.text-danger[title='error_arrivalDate']");
  }

  findFlightFrom(location) {
    return $(`//div[@class='flight']/div/div[1]//div[text()='${location}']`);
  }
  findFlightTo(location) {
    return $(`//div[@class='flight']/div/div[2]//div[text()='${location}']`);
  }

  openFlightsTab() {
    $("#react-tabs-4").click();
  }

  closeAddFlightModal() {
    $("//*[@id='addFlightModal']//button[@data-dismiss='modal']").click();
  }

  submitAddFlightModal() {
    $("//*[@id='addFlightModal']//button[@type='submit']").click();
  }

  selectDepartureDate(day) {
    const date = "day-" + day;
    $(
      `label[for='input_departureDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`
    ).click();
  }

  selectArrivalDate(day) {
    const date = "day-" + day;
    $(
      `label[for='input_arrivalDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`
    ).click();
  }
}

export default new DelegationFlightsPage();
