import React from "react";
import { array, func, bool } from "prop-types";
import Checkbox from "../Checkbox/Checkbox.component";
import Spinner from "../Spinner/Spinner.component";

const ActivitiesList = props => {
  const { activities = [], handleCheck, loading } = props;
  return loading ? (
    <Spinner />
  ) : (
    activities.map(activity => {
      return (
        <div key={activity.id}>
          <Checkbox checked={activity.isDone} onChange={handleCheck} name={"" + activity.id} />
          <label htmlFor={activity.id}>{activity.task}</label>
          <p className={activity.isDone ? "strikethrough-text" : ""}>{activity.description}</p>
        </div>
      );
    })
  );
};

ActivitiesList.propTypes = {
  activities: array,
  handleCheck: func,
  loading: bool
};

export default ActivitiesList;
