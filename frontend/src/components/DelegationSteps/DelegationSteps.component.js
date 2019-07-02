import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { string } from "prop-types";

import { delegationStatuses } from "../../config";

import "react-step-progress-bar/styles.css";
import styles from "./DelegationSteps.module.scss";

const calculatePercentage = delegationStatus => {
  const statuses = Object.keys(delegationStatuses);
  const amount = statuses.length;
  const statusIndex = statuses.indexOf(delegationStatus);
  return (100 / (amount - 1)) * statusIndex;
};

const DelegationSteps = props => {
  const { status } = props;
  return (
    <div className={styles.progress}>
      <ProgressBar percent={calculatePercentage(status)} filledBackground="linear-gradient(to right, #b52bff, #430099)">
        {Object.keys(delegationStatuses).map((key, index) => {
          return (
            <Step key={index} transition="scale">
              {({ accomplished }) => (
                <span className={accomplished ? styles.accomplished : styles.pending}>{delegationStatuses[key]}</span>
              )}
            </Step>
          );
        })}
      </ProgressBar>
    </div>
  );
};

DelegationSteps.propTypes = {
  status: string
};

export default DelegationSteps;
