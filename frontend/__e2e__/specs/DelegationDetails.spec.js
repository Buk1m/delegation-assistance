import { expect } from "chai";
import CreateDelegationPage from "../pageobjects/createDelegation.page";
import DelegationDetails from "../pageobjects/delegationDetails.page";
import { apiUrl, baseUrl, callTimeout, successCode } from "../constants";

const getTime = date => {
  return new Date(date).getTime();
};

describe("display delegation details", () => {
  let createdDelegation;
  const COUNTRY = "Poland";
  const LOCATION = "Lodz";
  const STATUS = "CREATED";
  const OBJECTIVE = "Push all changes before delegation.";
  const CURRENCY = "EUR";
  const DIET = "1.23";
  const ADVANCE = "123.45";

  before(() => {
    DelegationDetails.loginAsEmployee();
  });

  it("creates delegation", () => {
    const expectedTotalRequests = 2;

    CreateDelegationPage.open();
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

    browser.setupInterceptor();
    browser.expectRequest("POST", `${apiUrl}/delegations`, successCode);
    browser.expectRequest("GET", `${apiUrl}/delegations/my`, successCode);

    CreateDelegationPage.submit();
    browser.waitUntil(
      () => {
        return browser.getUrl() === baseUrl + "/delegations/my";
      },
      callTimeout,
      "Create delegation failed. Expected to navigate to page " + baseUrl + "/delegations/my"
    );

    browser.waitUntil(
      () => {
        return browser.getRequests().length === expectedTotalRequests;
      },
      callTimeout,
      `Excpeted ${expectedTotalRequests} calls but got ${browser.getRequests().length}.
       Excpeted requests : 'POST /delegations' , 'GET /delegations/my'
      `
    );

    createdDelegation = browser.getRequest(0).response.body;

    browser.assertRequests();
  });

  it("should display details of returned created delegation", () => {
    DelegationDetails.open(createdDelegation.id);
    expect(DelegationDetails.destinationCountry.getText()).to.equal(createdDelegation.destinationCountry);
    expect(DelegationDetails.destinationLocation.getText()).to.equal(createdDelegation.destinationLocation);
    expect(DelegationDetails.status.getText()).to.equal(createdDelegation.status);
    expect(DelegationDetails.delegationObjective.getText()).to.equal(createdDelegation.delegationObjective);
    expect(getTime(DelegationDetails.startDate.getText())).to.equal(getTime(createdDelegation.startDate));
    expect(getTime(DelegationDetails.endDate.getText())).to.equal(getTime(createdDelegation.endDate));
    expect(DelegationDetails.diet.getText()).to.equal(
      `${createdDelegation.diet.perDiem} ${createdDelegation.diet.currency}`
    );
  });

  it("should display details that match data from create delegation form", () => {
    DelegationDetails.open(createdDelegation.id);
    expect(DelegationDetails.destinationCountry.getText()).to.equal(COUNTRY);
    expect(DelegationDetails.destinationLocation.getText()).to.equal(LOCATION);
    expect(DelegationDetails.status.getText()).to.equal(STATUS);
    expect(DelegationDetails.delegationObjective.getText()).to.equal(OBJECTIVE);
    expect(DelegationDetails.diet.getText()).to.equal(`${DIET} ${CURRENCY}`);
  });

  it("travel manager should have access to employee's delegation details", () => {
    DelegationDetails.logout();
    DelegationDetails.loginAsManager();
    DelegationDetails.open(createdDelegation.id);
    const detailsUrl = baseUrl + `/delegations/${createdDelegation.id}`;
    browser.waitUntil(
      () => {
        return browser.getUrl() === detailsUrl;
      },
      callTimeout,
      "As TM expected to get access to employee's delegation details page " + detailsUrl
    );
  });
});
