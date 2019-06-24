import React from "react";
import { array, bool, string } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain";
import ButtonLink from "../../components/ButtonLink/ButtonLink.component";
import SpinnerWrapper from "../../components/SpinnerWrapper/SpinnerWrapper.component";
import Card from "../../components/Card/Card.component";
import CountryDetails from "./components/CountryDetails/CountryDetails.component";

const CountryPage = ({ image, fetching, name, nativeName, region, capital, callingCodes, currencies, timezones }) => {
  const title = fetching ? "" : `${name} (${nativeName})`;
  return (
    <LayoutMain title={title} buttons={<ButtonLink href="/checklist" text="Back to all" />}>
      <SpinnerWrapper loading={fetching} message="Loading country...">
        <div className="country-wrapper">
          <div className="country-card-wrapper">
            <div className="country-card-image">
              <img src={image} alt={title} className="img-fluid" height="400" />
            </div>
            <div className="country-card-content">
              <CountryDetails
                region={region}
                capital={capital}
                callingCodes={callingCodes}
                currencies={currencies}
                timezones={timezones}
              />
            </div>
          </div>
          <Card number={0}>
            <span>TODO: IDEMIA2019-66 - Jako Travel Manager mogę zobaczyć dostosowaną checkliste dla danego kraju</span>
          </Card>
        </div>
      </SpinnerWrapper>
    </LayoutMain>
  );
};

CountryPage.propTypes = {
  callingCodes: array,
  capital: string,
  currencies: array,
  fetching: bool,
  image: string,
  name: string,
  nativeName: string,
  region: string,
  timezones: array
};

export default CountryPage;
