import React, { Fragment } from "react";
import { func, number } from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { bed, check, plane } from "react-icons-kit/fa";
import { ic_payment } from "react-icons-kit/md/ic_payment";

import ActivitiesList from "../../components/ActivitiesList/ActivitiesList.container";
import Button from "../../components/Button/Button.component";
import Card from "../../components/Card/Card.component";
import DelegationAccommodations from "./components/DelegationAccommodations";
import DelegationDetails from "./components/DelegationDetails";
import DelegationExpenses from "./components/DelegationExpenses";
import DelegationFlights from "./components/DelegationFlights";
import LayoutMain from "../../components/layouts/LayoutMain";
import RenderTab from "../../components/renderers/RenderTab/RenderTab.renderer";

import "react-tabs/style/react-tabs.css";

const DelegationDetailsPage = props => {
  const { delegationId, onDelete, onSend } = props;
  return (
    <LayoutMain
      title={"Delegation No. " + delegationId}
      buttons={
        <Fragment>
          <Button className="primary" text="Preview Report" />
          <Button className="primary" text="Send to Manager" onClick={onSend} />
          <Button className="warning" text="Delete" onClick={onDelete} />
        </Fragment>
      }
    >
      <div id="delegation-details" className="container">
        <Card className="delegation-details" title="Delegation details:">
          <DelegationDetails delegationId={delegationId} />
        </Card>
        <div className="tabs">
          <Card>
            <Tabs forceRenderTabPanel={true}>
              <TabList>
                <Tab>
                  <RenderTab icon={check} title="Checklist" />
                </Tab>
                <Tab>
                  <RenderTab icon={ic_payment} title="Expenses" />
                </Tab>
                <Tab>
                  <RenderTab icon={plane} title="Flights" />
                </Tab>
                <Tab>
                  <RenderTab icon={bed} title="Accommodation" />
                </Tab>
              </TabList>
              <TabPanel>
                <div className="checklist">
                  <ActivitiesList delegationId={delegationId} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="expenses">
                  <DelegationExpenses delegationId={delegationId} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flights">
                  <DelegationFlights delegationId={delegationId} />
                </div>
              </TabPanel>
              <TabPanel>
                <DelegationAccommodations delegationId={delegationId} />
              </TabPanel>
            </Tabs>
          </Card>
        </div>
      </div>
    </LayoutMain>
  );
};

DelegationDetailsPage.propTypes = {
  delegationId: number,
  onDelete: func,
  onSend: func
};

export default DelegationDetailsPage;
