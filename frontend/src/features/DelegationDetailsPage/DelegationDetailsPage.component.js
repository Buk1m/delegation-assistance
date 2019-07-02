import React, { Fragment } from "react";
import { bool, number } from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { bed, check, plane } from "react-icons-kit/fa";
import { ic_payment } from "react-icons-kit/md/ic_payment";

import ActivitiesList from "../../components/ActivitiesList/ActivitiesList.container";
import ButtonLink from "../../components/ButtonLink/ButtonLink.component";
import Card from "../../components/Card/Card.component";
import DelegationAccommodations from "./components/DelegationAccommodations";
import DelegationDetails from "./components/DelegationDetails";
import DelegationExpenses from "./components/DelegationExpenses";
import DelegationFlights from "./components/DelegationFlights";
import LayoutMain from "../../components/layouts/LayoutMain";
import RenderTab from "../../components/renderers/RenderTab/RenderTab.renderer";
import UpdateStatus from "./components/UpdateStatus";
import DelegationSteps from "../../components/DelegationSteps/DelegationSteps.container";

import styles from "./DelegationDetailsPage.module.scss";
import "react-tabs/style/react-tabs.css";

const DelegationDetailsPage = ({ delegationId, canEditDelegation }) => {
  return (
    <LayoutMain
      title={"Delegation No. " + delegationId}
      buttons={
        <Fragment>
          <ButtonLink href={`/delegations/${delegationId}/report`} text="Report" />
          <UpdateStatus delegationId={delegationId} />
        </Fragment>
      }
    >
      <div id="delegation-details" className="container">
        <div className={styles.steps}>
          <DelegationSteps />
        </div>
        <Card className="delegation-details" title="Delegation details:">
          <DelegationDetails canEditDelegation={canEditDelegation} />
        </Card>
        <div className="tabs" id="delegation-panels">
          <Card>
            <Tabs forceRenderTabPanel={true}>
              <TabList>
                {canEditDelegation ? (
                  <Tab>
                    <RenderTab icon={check} title="Checklist" />
                  </Tab>
                ) : null}
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
              {canEditDelegation ? (
                <TabPanel>
                  <div className="checklist">
                    <ActivitiesList delegationId={delegationId} canEditDelegation={canEditDelegation} />
                  </div>
                </TabPanel>
              ) : null}
              <TabPanel>
                <div className="expenses">
                  <DelegationExpenses delegationId={delegationId} canEditDelegation={canEditDelegation} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flights">
                  <DelegationFlights delegationId={delegationId} canEditDelegation={canEditDelegation} />
                </div>
              </TabPanel>
              <TabPanel>
                <DelegationAccommodations delegationId={delegationId} canEditDelegation={canEditDelegation} />
              </TabPanel>
            </Tabs>
          </Card>
        </div>
      </div>
    </LayoutMain>
  );
};

DelegationDetailsPage.propTypes = {
  canEditDelegation: bool,
  delegationId: number
};

export default DelegationDetailsPage;
