import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { array, bool } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain";
import Card from "../../components/Card/Card.component";
import Spinner from "../../components/Spinner/Spinner.component";

const DelegationsMyPage = props => {
  const { delegations = [], columns, fetching = false } = props;
  return (
    <LayoutMain title="My delegations">
      <Card>
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
          noDataIndication={() => (fetching ? <Spinner /> : <span>No data</span>)}
        />
      </Card>
    </LayoutMain>
  );
};

DelegationsMyPage.propTypes = {
  columns: array,
  delegations: array,
  fetching: bool
};

export default DelegationsMyPage;
