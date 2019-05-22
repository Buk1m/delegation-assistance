import DelegationAccommodationsPage from "../pageobjects/delegationAccommodations.page";
import { expect } from "chai";
import uuidv4 from "uuid";
import { callTimeout } from "../constants";

describe("Delegation Accommodations", () => {
  const DISPLAY_MODAL_TIMEOUT = 5000;
  const HOTEL_NAME = uuidv4();

  describe("Error scenarios", () => {
    before(function() {
      DelegationAccommodationsPage.loginAsEmployee();
      //TODO: use delegation created during tests after create delegation is back to its former glory
      DelegationAccommodationsPage.open(2);
    });

    it("should display message if accommodations list is empty", () => {
      if (!DelegationAccommodationsPage.accommodations) {
        expect(DelegationAccommodationsPage.noAccommodationsMessage.getText()).to.equal(
          "No accommodations, add a new one!"
        );
      }
    });

    it("should display required errors when add accommodation modal is submitted without data", () => {
      DelegationAccommodationsPage.openAccommodationTab();
      DelegationAccommodationsPage.openAddAccommodationModal();
      DelegationAccommodationsPage.addAccommodationModal.waitForDisplayed(DISPLAY_MODAL_TIMEOUT);
      DelegationAccommodationsPage.submitAddAccommodationModal();

      expect(DelegationAccommodationsPage.getAllRequiredMsg.length).to.equal(3);
    });

    it("should dismiss errors when modal was canceled", () => {
      DelegationAccommodationsPage.closeAddAddommodationModal();
      DelegationAccommodationsPage.addAccommodationModal.waitForDisplayed(DISPLAY_MODAL_TIMEOUT, true);
      DelegationAccommodationsPage.openAddAccommodationModal();
      DelegationAccommodationsPage.addAccommodationModal.waitForDisplayed(DISPLAY_MODAL_TIMEOUT);

      expect(DelegationAccommodationsPage.getAllRequiredMsg.length).to.equal(0);
    });

    it("should display error when checkInDate is later then checkOutDate", () => {
      DelegationAccommodationsPage.selectCheckInDate(15);
      DelegationAccommodationsPage.selectCheckOutDate(5);
      DelegationAccommodationsPage.submitAddAccommodationModal();
      browser.pause();
      expect(DelegationAccommodationsPage.dateError.getText()).to.equal(
        "Check out date must be later than check in date!"
      );
    });
  });

  describe("Success scenarios", () => {
    it("should add new accommodation", () => {
      const initialAccommodationsCount = DelegationAccommodationsPage.accommodations.length;
      DelegationAccommodationsPage.hotel.setValue(HOTEL_NAME);
      DelegationAccommodationsPage.selectCheckInDate(5);
      DelegationAccommodationsPage.selectCheckOutDate(15);
      DelegationAccommodationsPage.submitAddAccommodationModal();
      DelegationAccommodationsPage.accommodationAddedNotification.waitForDisplayed(callTimeout);
      expect(DelegationAccommodationsPage.accommodations.length).to.equal(initialAccommodationsCount + 1);
      expect(DelegationAccommodationsPage.findAccommodation(HOTEL_NAME)).to.exist;
    });
  });
});
