import Page from "./page";

class DelegationDetailsPage extends Page {
  open(delegationId) {
    super.open(`delegations/${delegationId}`);
  }

  get destinationCountry() {
    return $("//label[text() = 'Country:']/parent::div/following-sibling::div/span");
  }

  get destinationLocation() {
    return $("//label[text() = 'Location:']/parent::div/following-sibling::div/span");
  }

  get status() {
    return $("//label[text() = 'Status:']/parent::div/following-sibling::div/span");
  }

  get startDate() {
    return $("//label[text() = 'Date from:']/parent::div/following-sibling::div/span");
  }

  get endDate() {
    return $("//label[text() = 'Date to:']/parent::div/following-sibling::div/span");
  }

  get delegationObjective() {
    return $("//label[text() = 'Objective:']/parent::div/following-sibling::div/span");
  }

  //TODO: check after IDEMIA2019-79 Jako pracownik moge dodac diete i walute do delegacji
  get diet() {
    return $("//label[text() = 'Diet:']/parent::div/following-sibling::div/span");
  }
}

export default new DelegationDetailsPage();
