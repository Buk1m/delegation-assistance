import { expect } from "chai";
import CreateDelegationPage from "../pageobjects/createdelegation.page";
import { baseUrl, callTimeout } from "../constants";

describe("create delegation form", () => {
  before(() => {
    CreateDelegationPage.loginAsEmployee();
  });

  it("should display required validation errors", () => {
    CreateDelegationPage.open();
    CreateDelegationPage.submit();

    expect(CreateDelegationPage.destinationCountyErrorMsg.getText()).to.equal(
      "This field is required."
    );

    expect(CreateDelegationPage.destinationLocationErrorMsg.getText()).to.equal(
      "This field is required."
    );

    expect(CreateDelegationPage.delegationObjectiveErrorMsg.getText()).to.equal(
      "This field is required."
    );

    expect(CreateDelegationPage.startDateErrorMsg.getText()).to.equal(
      "This field is required."
    );

    expect(CreateDelegationPage.endDateErrorMsg.getText()).to.equal(
      "This field is required."
    );

    expect(CreateDelegationPage.getAllRequiredMsg.length).to.equal(5);
  });

  it("should display invalid date select error", () => {
    CreateDelegationPage.selectStartPickerDay(15);
    CreateDelegationPage.selectEndPickerDay(5);

    expect(CreateDelegationPage.endDateErrorMsg.getText()).to.equal(
      "End date must be later than start date!"
    );
  });

  it("should create delegation", () => {
    CreateDelegationPage.selectStartPickerDay(5);
    CreateDelegationPage.selectEndPickerDay(15);
    CreateDelegationPage.destinationCounty.setValue("Poland");
    browser.keys("Enter");
    CreateDelegationPage.destinationLocation.setValue("Lodz");
    CreateDelegationPage.delegationObjective.setValue(
      "Push all changes before delegation."
    );

    CreateDelegationPage.submit();

    browser.waitUntil(
      () => {
        return browser.getUrl() === baseUrl + "/delegations";
      },
      callTimeout,
      "Create delegation failed. Expected to navigate to page " +
        baseUrl +
        "/delegations"
    );
  });
});
