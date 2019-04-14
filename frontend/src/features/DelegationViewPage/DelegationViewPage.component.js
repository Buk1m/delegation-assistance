import React from "react";
import { string } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";
import Card from "../../components/Card/Card.component";

const DelegationViewPage = props => {
  const { destinationLocation = "" } = props;
  return (
    <LayoutMain title={"Delegation to: " + destinationLocation}>
      <Card>
        <span>Delegation</span>
      </Card>
    </LayoutMain>
  );
};

DelegationViewPage.propTypes = {
  destinationLocation: string
};

export default DelegationViewPage;
