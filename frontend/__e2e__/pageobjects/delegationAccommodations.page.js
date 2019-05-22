import Page from "./page";

class DelegationAccommodationsPage extends Page {
  open(delegationId) {
    super.open(`delegations/${delegationId}`);
  }

  openAddAccommodationModal() {
    $("button[data-target='#addAccommodationModal']").click();
  }

  get getAllRequiredMsg() {
    return $$("span*=required");
  }

  get addAccommodationModal() {
    return $("//*[@id='addAccommodationModal']");
  }

  get accommodations() {
    return $$("div.accommodation");
  }

  get noAccommodationsMessage() {
    return $(".accommodations p");
  }

  get accommodationAddedNotification() {
    return $(".Toastify__toast--success > .Toastify__toast-body");
  }

  get dateError() {
    return $("span.text-danger[title='error_checkOutDate']");
  }

  get hotel() {
    return $("#input_hotelName");
  }

  findAccommodation(hotelName) {
    return $(`//div[@class='accommodation']/div/div//div[text()='${hotelName}']`);
  }

  openAccommodationTab() {
    $("#react-tabs-6").click();
  }

  closeAddAddommodationModal() {
    $("//*[@id='addAccommodationModal']//button[@data-dismiss='modal']").click();
  }

  submitAddAccommodationModal() {
    $("//*[@id='addAccommodationModal']//button[@type='submit']").click();
  }

  selectCheckInDate(day) {
    const date = "day-" + day;
    $(
      `label[for='input_checkInDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`
    ).click();
  }

  selectCheckOutDate(day) {
    const date = "day-" + day;
    $(
      `label[for='input_checkOutDate'] + div div[aria-label='${date}']:not(.react-datepicker__day--outside-month)`
    ).click();
  }
}

export default new DelegationAccommodationsPage();
