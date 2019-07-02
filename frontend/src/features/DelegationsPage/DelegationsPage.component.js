import React from "react";
import { array, bool, string } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain";
import LastDelegation from "./components/LastDelegation";
import ButtonLink from "../../components/ButtonLink/ButtonLink.component";

import RejectedDelegations from "./components/RejectedDelegations/RejectedDelegations.component";
import WaitingDelegations from "./components/WaitingDelegations/WaitingDelegations.component";
import PendingDelegations from "./components/PendingDelegations/PendingDelegations.component";

const DelegationsPage = ({ isEmployee, fetching, delegations, rejectedDelegations, waitingDelegations, title }) => {
  return (
    <LayoutMain title="My dashboard">
      {isEmployee ? (
        <div className="dashboard-employee">
          <LastDelegation delegations={delegations} />
          <RejectedDelegations fetching={fetching} delegations={rejectedDelegations} />
          <WaitingDelegations fetching={fetching} delegations={waitingDelegations} />
          <div className="dashboard-e-buttons-wrapper">
            <ButtonLink href="/delegations/create" text="Create delegation" />
            <ButtonLink href="/checklist" text="Check countries" className="secondary" />
          </div>
        </div>
      ) : (
        <PendingDelegations fetching={fetching} delegations={waitingDelegations} title={title} />
      )}
    </LayoutMain>
  );
};

DelegationsPage.defaultProps = {
  rejectedDelegations: [],
  waitingDelegations: []
};

DelegationsPage.propTypes = {
  delegations: array,
  fetching: bool,
  isEmployee: bool,
  rejectedDelegations: array,
  title: string,
  waitingDelegations: array
};

export default DelegationsPage;
