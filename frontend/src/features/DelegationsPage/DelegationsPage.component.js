import React, { Fragment } from "react";
import { bool } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";
import Card from "../../components/Card/Card.component";
import ButtonLink from "../../components/ButtonLink/ButtonLink.component";

const DelegationsPage = props => {
  const { isManager, isEmployee } = props;
  return (
    <LayoutMain title="Delegations dashboard">
      <Fragment>
        <Card title="Statistics">
          {isManager ? (
            <div>
              <ButtonLink href="/delegations/manage" text="Manage delegations" />
            </div>
          ) : null}
          {isEmployee ? (
            <Fragment>
              <div>
                <ButtonLink href="/delegations/my" text="My delegations" />
              </div>
              <div>
                <ButtonLink href="/delegations/create" text="Create delegation" />
              </div>
            </Fragment>
          ) : null}
        </Card>
      </Fragment>
    </LayoutMain>
  );
};

DelegationsPage.propTypes = {
  isManager: bool,
  isEmployee: bool
};

export default DelegationsPage;
