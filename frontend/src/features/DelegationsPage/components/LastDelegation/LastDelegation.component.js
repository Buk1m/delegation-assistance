import React from "react";
import { object } from "prop-types";
import Icon from "react-icons-kit";
import {
  ic_map,
  ic_place,
  ic_date_range,
  ic_description,
  ic_playlist_add_check,
  ic_info_outline
} from "react-icons-kit/md";

import { formatISODateWithoutTime } from "../../../../helpers/formatters";
import ButtonLink from "../../../../components/ButtonLink/ButtonLink.component";

import styles from "./LastDelegation.module.scss";

const LastDelegation = ({ closest: { image, delegation, type, urls } }) => {
  const delegationTo = `Delegation to: ${delegation ? delegation.destinationCountry : ""}`;
  return delegation ? (
    <div className={styles["wrapper"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["image"]}>
          <img src={image} alt={delegationTo} className="img-fluid" height="400" />
        </div>
        <div className={styles["content"]}>
          <div className={styles["info"]}>
            <span className={[styles["type"], styles[`type-${type.type.toLowerCase()}`]].join(" ")}>{type.type}</span>
            <h4>{delegationTo}</h4>
            <div className={styles["description"]}>{delegation.delegationObjective}</div>
            <div className={styles["details-wrapper"]}>
              <div className={styles["location"]}>
                <Icon icon={ic_place} size={16} />
                <span>{delegation.destinationLocation}</span>
              </div>
              <div className={styles["country"]}>
                <Icon icon={ic_map} size={16} />
                <span>{delegation.destinationCountry}</span>
              </div>
              <div className={styles["date"]}>
                <Icon icon={ic_date_range} size={16} />
                <span>
                  {formatISODateWithoutTime(delegation.startDate)}
                  &nbsp;–&nbsp;
                  {formatISODateWithoutTime(delegation.endDate)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles["buttons"]}>
            {type.buttons.report ? (
              <ButtonLink href={urls.report} text="report" className="last-deleg-report" icon={ic_description} />
            ) : null}
            {type.buttons.checklist ? (
              <ButtonLink
                href={urls.checklist}
                text="checklist"
                className="last-deleg-checklist"
                icon={ic_playlist_add_check}
              />
            ) : null}
            {type.buttons.details ? (
              <ButtonLink href={urls.details} text="details" className="last-deleg-details" icon={ic_info_outline} />
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles["hr"]} />
    </div>
  ) : null;
};

LastDelegation.propTypes = {
  closest: object
};

export default LastDelegation;
