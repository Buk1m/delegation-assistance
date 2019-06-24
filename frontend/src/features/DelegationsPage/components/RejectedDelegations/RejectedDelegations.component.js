import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { array, bool } from "prop-types";

import columns from "../../../../config/tableColumns/dashboard/myrejected.columns";
import ButtonLink from "../../../../components/ButtonLink/ButtonLink.component";
import Card from "../../../../components/Card/Card.component";
import Spinner from "../../../../components/Spinner/Spinner.component";

const RejectedDelegations = ({ fetching, delegations }) => {
  return (
    <Card
      title={`Rejected delegations (${delegations.length})`}
      number={0}
      footer={<ButtonLink href="/delegations/my" text="See all" />}
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
        noDataIndication={() => (fetching ? <Spinner /> : <span>You do not have any rejected delegations</span>)}
      />
    </Card>
  );
};

RejectedDelegations.propTypes = {
  delegations: array,
  fetching: bool
};

export default RejectedDelegations;
