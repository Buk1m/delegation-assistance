import React from 'react';

import LayoutMain from '../../components/layouts/LayoutMain/LayoutMain.container';
import Checkbox from '../../components/Checkbox/Checkbox.component';

const DelegationChecklistPage = props => {
  const {activities, handleCheck, delegationID} = props;
  const showActivities = activities.map((activity) => {
    return (
      <div key={activity.id}>
        <Checkbox
          checked={activity.isDone}
          onChange={handleCheck}
          name={activity.id}
        />
        <label htmlFor={activity.id}>{activity.task}</label>
        <p className={activity.isDone ? "strikethrough-text" : ''}>{activity.description}</p>
      </div>);
  });

  return (
    <LayoutMain title={"Checklist for delegation no.: " + delegationID}>
      <div>
        {showActivities}
        <a href="/delegations">Back to delegations</a>
      </div>
    </LayoutMain>
  );
};

export default DelegationChecklistPage;
