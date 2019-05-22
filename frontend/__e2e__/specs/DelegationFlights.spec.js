import DelegationFlightsPage from "../pageobjects/delegationFlights.page";
import { expect } from "chai";
import uuidv4 from "uuid";
import { callTimeout } from "../constants";

describe("Delegation Flights", () => {
  const DISPLAY_MODAL_TIMEOUT = 5000;
  const LOCATION_FROM = uuidv4();
  const LOCATION_TO = uuidv4();

  describe("Error scenarios", () => {
    before(function() {
      DelegationFlightsPage.loginAsEmployee();
      //TODO: use delegation created during tests after create delegation is back to its former glory
      DelegationFlightsPage.open(2);
    });

    it("should display message if list is empty", () => {
      if (!DelegationFlightsPage.flights) {
        expect(DelegationFlightsPage.noFlightsMessage.getText()).to.equal("No flights, add a new one!");
      }
    });

    it("should display required errors when modal is submitted without data", () => {
      DelegationFlightsPage.openFlightsTab();
      DelegationFlightsPage.openAddFlightModal();
      DelegationFlightsPage.addFlightModal.waitForDisplayed(DISPLAY_MODAL_TIMEOUT);
      DelegationFlightsPage.submitAddFlightModal();

      expect(DelegationFlightsPage.getAllRequiredMsg.length).to.equal(4);
    });

    it("should dismiss errors when modal was canceled", () => {
      DelegationFlightsPage.closeAddFlightModal();
      DelegationFlightsPage.addFlightModal.waitForDisplayed(DISPLAY_MODAL_TIMEOUT, true);
      DelegationFlightsPage.openAddFlightModal();
      DelegationFlightsPage.addFlightModal.waitForDisplayed(DISPLAY_MODAL_TIMEOUT);

      expect(DelegationFlightsPage.getAllRequiredMsg.length).to.equal(0);
    });

    it("should display error when departureDate is later then arrivalDate", () => {
      DelegationFlightsPage.selectDepartureDate(15);
      DelegationFlightsPage.selectArrivalDate(5);
      DelegationFlightsPage.submitAddFlightModal();
      browser.pause();
      expect(DelegationFlightsPage.dateError.getText()).to.equal("Arrival date must be later than departure date!");
    });
  });

  describe("Success scenarios", () => {
    it("should add new flight", () => {
      const initialFlightsCount = DelegationFlightsPage.flights.length;
      DelegationFlightsPage.locationFrom.setValue(LOCATION_FROM);
      DelegationFlightsPage.locationTo.setValue(LOCATION_TO);
      DelegationFlightsPage.selectDepartureDate(5);
      DelegationFlightsPage.selectArrivalDate(15);
      DelegationFlightsPage.submitAddFlightModal();
      DelegationFlightsPage.flightAddedNotification.waitForDisplayed(callTimeout);
      expect(DelegationFlightsPage.flights.length).to.equal(initialFlightsCount + 1);
      expect(DelegationFlightsPage.findFlightFrom(LOCATION_FROM)).to.exist;
      expect(DelegationFlightsPage.findFlightTo(LOCATION_TO)).to.exist;
    });
  });
});
