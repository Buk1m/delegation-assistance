import React, { Fragment } from "react";
import { func, number, string } from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { bed, check, plane } from "react-icons-kit/fa";
import { ic_payment } from "react-icons-kit/md/ic_payment";

import ActivitiesList from "../../components/ActivitiesList/ActivitiesList.container";
import Button from "../../components/Button/Button.component";
import ButtonLink from "../../components/ButtonLink/ButtonLink.component";
import Card from "../../components/Card/Card.component";
import DelegationAccommodations from "./components/DelegationAccommodations";
import DelegationDetails from "./components/DelegationDetails";
import DelegationExpenses from "./components/DelegationExpenses";
import DelegationFlights from "./components/DelegationFlights";
import LayoutMain from "../../components/layouts/LayoutMain";
import RenderTab from "../../components/renderers/RenderTab/RenderTab.renderer";
import { canSendToTravelManager } from "../../ui-restrictions/delegation.restriction";

import "react-tabs/style/react-tabs.css";

const DelegationDetailsPage = props => {
  const { delegationId, handleDelete, handleSendToManager, status } = props;
  return (
    <LayoutMain
      title={"Delegation No. " + delegationId}
      buttons={
        <Fragment>
          <ButtonLink href={`/delegations/${delegationId}/report`} className="primary" text="Preview Report" />
          <Button
            className={canSendToTravelManager(status) ? "primary" : "disabled"}
            text="Send to Manager"
            onClick={handleSendToManager}
            disabled={!canSendToTravelManager(status)}
          />
          <Button className="warning" text="Delete" onClick={handleDelete} />
        </Fragment>
      }
    >
      <div id="delegation-details" className="container">
        <Card className="delegation-details" title="Delegation details:">
          <DelegationDetails delegationId={delegationId} />
        </Card>
        <div className="tabs" id="delegation-panels">
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
  handleDelete: func,
  handleSendToManager: func,
  status: string
};

export default DelegationDetailsPage;
