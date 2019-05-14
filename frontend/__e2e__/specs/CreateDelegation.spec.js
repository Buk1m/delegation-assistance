import { expect } from "chai";
import CreateDelegationPage from "../pageobjects/createDelegation.page";
import { baseUrl, callTimeout, displayTimeout } from "../constants";

describe("create delegation form", () => {
  const COUNTRY = "Poland";
  const LOCATION = "Lodz";
  const OBJECTIVE = "Push all changes before delegation.";
  const CURRENCY = "EUR";
  const DIET = "123";
  const ADVANCE ="123.45";

  before(() => {
    CreateDelegationPage.loginAsEmployee();
  });

  it("should display required validation errors", () => {
    CreateDelegationPage.open();

    CreateDelegationPage.submit();

    expect(CreateDelegationPage.destinationCountyErrorMsg.getText()).to.equal("This field is required.");

    expect(CreateDelegationPage.destinationLocationErrorMsg.getText()).to.equal("This field is required.");

    expect(CreateDelegationPage.delegationObjectiveErrorMsg.getText()).to.equal("This field is required.");

    expect(CreateDelegationPage.startDateErrorMsg.getText()).to.equal("This field is required.");

    expect(CreateDelegationPage.endDateErrorMsg.getText()).to.equal("This field is required.");

    expect(CreateDelegationPage.getAllRequiredMsg.length).to.equal(5);
  });

  it("should display invalid date select error", () => {
    CreateDelegationPage.selectStartPickerDay(15);
    CreateDelegationPage.selectEndPickerDay(5);

    expect(CreateDelegationPage.endDateErrorMsg.getText()).to.equal("End date must be later than start date!");
  });

  it("should create delegation", () => {
    CreateDelegationPage.selectStartPickerDay(5);
    CreateDelegationPage.selectEndPickerDay(15);
    CreateDelegationPage.destinationCounty.setValue(COUNTRY);
    browser.keys("Enter");
    CreateDelegationPage.destinationLocation.setValue(LOCATION);
    CreateDelegationPage.delegationObjective.setValue(OBJECTIVE);
    CreateDelegationPage.currency.setValue(CURRENCY);
    browser.keys("Enter");
    CreateDelegationPage.diet.setValue(DIET);
    CreateDelegationPage.advancement.setValue(ADVANCE);

    CreateDelegationPage.submit();

    browser.waitUntil(
      () => {
        return browser.getUrl() === baseUrl + "/delegations/my";
      },
      callTimeout,
      "Create delegation failed. Expected to navigate to page " + baseUrl + "/delegations/my"
    );
    const notification = CreateDelegationPage.createdNotification;

    notification.waitForDisplayed(displayTimeout, "Create delegation didn't display success notification.");
    expect(notification.getText()).to.include(LOCATION);
  });
});
