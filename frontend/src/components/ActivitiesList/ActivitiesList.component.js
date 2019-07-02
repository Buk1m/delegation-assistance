import React from "react";
import { array, func, bool } from "prop-types";
import Checkbox from "../Checkbox/Checkbox.component";
import Spinner from "../Spinner/Spinner.component";
import BlurredSpinnerWrapper from "../BlurredSpinnedWrapper/BlurredSpinnerWrapper.component";

import styles from "./ActivitiesList.module.scss";

const ActivitiesList = props => {
  const { activities = [], handleCheck, loading, updating } = props;
  return loading ? (
    <Spinner />
  ) : (
    <BlurredSpinnerWrapper loading={updating} message="saving checklist">
      {activities.map(activity => {
        return (
          <div key={activity.id} className="d-flex flex-column">
            <div className={styles.grow}>
              <Checkbox
                onClick={e => handleCheck(activity, e)}
                defaultChecked={activity.isDone}
                name={activity.id.toString()}
                disabled={updating}
              />
              <label htmlFor={activity.id.toString()}>{activity.task}</label>
              <p className={activity.isDone ? "strikethrough-text" : ""}>{activity.description}</p>
            </div>
          </div>
        );
      })}
    </BlurredSpinnerWrapper>
  );
};

ActivitiesList.propTypes = {
  activities: array,
  handleCheck: func,
  loading: bool,
  updating: bool
};

export default ActivitiesList;
