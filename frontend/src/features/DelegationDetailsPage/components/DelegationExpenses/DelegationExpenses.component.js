import React, { Fragment } from "react";
import { array, bool, func, number, string } from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ExpandRow from "./ExpensesTableExpand/ExpandRow.component";
import ExpensesModalForm from "./ExpensesModalForm";
import Spinner from "../../../../components/Spinner/Spinner.component";
import Button from "../../../../components/Button/Button.component";
import expensesColumns from "../../../../config/tableColumns/delegations/expenses.columns";

const DelegationExpenses = ({
  expenses,
  fetching,
  delegationId,
  totalSize,
  onTableChange,
  page,
  sizePerPage,
  sortOrder,
  sortField,
  canEditDelegation
}) => {
  return (
    <Fragment>
      <BootstrapTable
        bootstrap4
        hover
        bordered={false}
        data={expenses}
        columns={expensesColumns}
        remote={{ sort: true, pagination: true }}
        noDataIndication={() => (totalSize === 0 ? <p>No expenses, add a new one!</p> : <Spinner />)}
        loading={fetching}
        keyField="id"
        defaultSorted={[
          {
            dataField: sortField,
            order: sortOrder
          }
        ]}
        expandRow={ExpandRow(delegationId)}
        onTableChange={onTableChange}
        pagination={paginationFactory({ page, sizePerPage, totalSize })}
      />
      <div className="d-flex justify-content-end">
        <Button data-toggle="modal" data-target="#addExpenseModal" text="Add expense" disabled={!canEditDelegation} />
        <ExpensesModalForm
          delegationId={delegationId}
          onTableChange={onTableChange}
          page={page}
          sizePerPage={sizePerPage}
          sortOrder={sortOrder}
          sortField={sortField}
        />
      </div>
    </Fragment>
  );
};

DelegationExpenses.propTypes = {
  canEditDelegation: bool,
  delegationId: number,
  expenses: array,
  fetching: bool,
  onTableChange: func,
  page: number,
  sizePerPage: number,
  sortField: string,
  sortOrder: string,
  totalSize: number
};

export default DelegationExpenses;
