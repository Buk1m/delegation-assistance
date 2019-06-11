import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import { array, bool } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain";
import Card from "../../components/Card/Card.component";
import Spinner from "../../components/Spinner/Spinner.component";
import columns from "../../config/tableColumns/delegations/manage.columns";

const DelegationsManagePage = props => {
  const { delegations = [], fetching } = props;
  return (
    <LayoutMain title="Manage all user delegations">
      <Card title="Manage delegations">
        <BootstrapTable
          bootstrap4
          data={delegations}
          bordered={false}
          columns={columns}
          keyField="id"
          striped
          hover
          pagination={paginationFactory()}
          filter={filterFactory()}
          cellEdit={cellEditFactory({ mode: "click", blurToSave: true })}
          noDataIndication={() => (fetching ? <Spinner /> : <span>No data</span>)}
        />
      </Card>
    </LayoutMain>
  );
};

DelegationsManagePage.propTypes = {
  delegations: array,
  fetching: bool
};

export default DelegationsManagePage;
