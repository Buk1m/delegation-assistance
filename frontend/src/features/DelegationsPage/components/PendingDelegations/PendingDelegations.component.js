import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { array, bool, string } from "prop-types";

import columns from "../../../../config/tableColumns/dashboard/userspending.columns";
import ButtonLink from "../../../../components/ButtonLink/ButtonLink.component";
import Card from "../../../../components/Card/Card.component";
import Spinner from "../../../../components/Spinner/Spinner.component";

const PendingDelegations = ({ fetching, delegations, title }) => {
  return (
    <Card
      title={`${title} (${delegations.length})`}
      number={1}
      footer={<ButtonLink href="/delegations/manage" text="Manage all delegations" />}
    >
      <BootstrapTable
        keyField="id"
        data={delegations}
        columns={columns}
        bootstrap4={true}
        hover={true}
        condensed={true}
        bordered={false}
        defaultSorted={[{ dataField: "startDate", order: "desc" }]}
        noDataIndication={() => (fetching ? <Spinner /> : <span>You do not have any pending delegations</span>)}
      />
    </Card>
  );
};

PendingDelegations.propTypes = {
  delegations: array,
  fetching: bool,
  title: string
};

export default PendingDelegations;
