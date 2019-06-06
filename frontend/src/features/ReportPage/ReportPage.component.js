import React, { Fragment } from "react";
import { array, bool, func, string, number } from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import Icon from "react-icons-kit";

import LayoutMain from "../../components/layouts/LayoutMain";
import SpinnerWrapper from "../../components/SpinnerWrapper/SpinnerWrapper.component";
import Spinner from "../../components/Spinner/Spinner.component";
import Button from "../../components/Button/Button.component";
import Card from "../../components/Card/Card.component";
import { reportTypes } from "../../config";

import flightsColumns from "../../config/tableColumns/reportFlights.columns";
import accommodationsColumns from "../../config/tableColumns/reportAccommodations.columns";
import expensesColumns from "../../config/tableColumns/reportExpenses.columns";
import dietColumns from "../../config/tableColumns/reportDiet.columns";
import mealsColumns from "../../config/tableColumns/reportMeals.columns";
import diemReturnsColumns from "../../config/tableColumns/reportDiemReturns.columns";
import allowanceColumns from "../../config/tableColumns/reportAllowance.columns";
import detailsColumns from "../../config/tableColumns/reportDetails.columns";

const tableLayout = fetching => ({
  bootstrap4: true,
  striped: true,
  hover: true,
  condensed: true,
  bordered: false,
  noDataIndication: fetching ? <Spinner /> : "No data"
});

const ReportPage = ({
  handleDownloadReport,
  fetching,
  flights,
  accommodations,
  expenses,
  totalRepayment,
  targetCurrency,
  diet,
  meals,
  diemReturns,
  allowance,
  details
}) => {
  return (
    <LayoutMain
      title="Travel and Expense Report"
      buttonsHide={fetching}
      buttons={
        <Fragment>
          {reportTypes.map(report => (
            <Icon
              key={report.type}
              size={report.iconSize}
              icon={report.icon}
              onClick={() => handleDownloadReport(report)}
            />
          ))}
          <Button
            text="Send to Manager"
            onClick={() =>
              window.alert(
                "TODO: IDEMIA2019-171 [Frontend] Jako pracownik mogę wysłać delegację do Travel Managera w celu akceptacji"
              )
            }
          />
        </Fragment>
      }
    >
      <SpinnerWrapper loading={fetching} message="loading report...">
        <div className="r-grid">
          <Card title="Flights">
            <BootstrapTable keyField="id" data={flights} columns={flightsColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Accommodations" number={1}>
            <BootstrapTable
              keyField="id"
              data={accommodations}
              columns={accommodationsColumns}
              {...tableLayout(fetching)}
            />
          </Card>
          <Card title="Expenses" number={2}>
            <BootstrapTable
              keyField="id"
              data={expenses}
              columns={expensesColumns(totalRepayment, targetCurrency)}
              {...tableLayout(fetching)}
            />
          </Card>
          <Card title="Allowance" number={3}>
            <BootstrapTable
              keyField="targetCurrency"
              data={allowance}
              columns={allowanceColumns}
              {...tableLayout(fetching)}
            />
          </Card>
          <Card title="Diet" number={4}>
            <BootstrapTable keyField="perDiem" data={diet} columns={dietColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Meals" number={5}>
            <BootstrapTable keyField="breakfasts" data={meals} columns={mealsColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Details" number={6}>
            <BootstrapTable keyField="startDate" data={details} columns={detailsColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Diem returns" number={7}>
            <BootstrapTable
              keyField="totalDiems"
              data={diemReturns}
              columns={diemReturnsColumns}
              {...tableLayout(fetching)}
            />
          </Card>
        </div>
      </SpinnerWrapper>
    </LayoutMain>
  );
};

ReportPage.propTypes = {
  accommodations: array,
  allowance: array,
  details: array,
  diemReturns: array,
  diet: array,
  expenses: array,
  fetching: bool,
  flights: array,
  handleDownloadReport: func,
  meals: array,
  targetCurrency: string,
  totalRepayment: number
};

export default ReportPage;
