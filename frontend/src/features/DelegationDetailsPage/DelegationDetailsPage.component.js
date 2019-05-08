import React from "react";
import { string, func } from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { bed } from "react-icons-kit/fa/bed";
import { plane } from "react-icons-kit/fa/plane";
import { check } from "react-icons-kit/fa/check";
import { ic_payment } from "react-icons-kit/md/ic_payment";

import LayoutMain from "../../components/layouts/LayoutMain";
import Card from "../../components/Card/Card.component";
import Button from "../../components/Button/Button.component";
import DelegationDetails from "./components/DelegationDetails/DelegationDetails.container";
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList.container";
import RenderTab from "../../components/renderers/RenderTab/RenderTab.renderer";

import "react-tabs/style/react-tabs.css";

const DelegationDetailsPage = props => {
  const { delegationId, onDelete, onSend } = props;
  return (
    <LayoutMain title={"Delegation No. " + delegationId}>
      <div id="delegation-details" className="container">
        <div className="actions">
          <div className="preview-btn">
            <Button className="primary" text="Preview Raport" />
          </div>
          <div className="send-btn">
            <Button className="primary" text="Send to Travel Manager" onClick={onSend} />
          </div>
          <div className="delete-btn">
            <Button className="warning" text="Delete" onClick={onDelete} />
          </div>
        </div>
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
                  <h1>TODO: IDEMIA2019-119 Jako pracownik moge zobaczyć wydatki w delegacji</h1>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flights">
                  <h1>TODO: IDEMIA2019-195 Jako pracownik mogę dodać lot do mojej delegacji</h1>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="accommodation">
                  <h1>TODO: IDEMIA2019-198 Jako pracownik mogę dodać zakwaterowanie do mojej delegacji</h1>
                </div>
              </TabPanel>
            </Tabs>
          </Card>
        </div>
      </div>
    </LayoutMain>
  );
};

DelegationDetailsPage.propTypes = {
  delegationId: string,
  onDelete: func,
  onSend: func
};

export default DelegationDetailsPage;
