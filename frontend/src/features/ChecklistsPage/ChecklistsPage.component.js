import React from "react";

import LayoutMain from "../../components/layouts/LayoutMain";
import Card from "../../components/Card/Card.component";

export const ChecklistsPage = props => {
  return (
    <LayoutMain title="Checklist">
      <Card>
        <div className="checklist-list">
          TODO: IDEMIA2019-66 - Jako Travel Manager mogę zobaczyć dostosowaną checkliste dla danego kraju
        </div>
      </Card>
    </LayoutMain>
  );
};

ChecklistsPage.propTypes = {};

export default ChecklistsPage;
