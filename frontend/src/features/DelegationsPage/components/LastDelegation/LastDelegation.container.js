import React, { Component } from "react";
import { connect } from "react-redux";
import { array } from "prop-types";
import moment from "moment";

import LastDelegation from "./LastDelegation.component";

import delegationImage1 from "../../../../assets/images/delegations/delegation1.jpg";
import delegationImage2 from "../../../../assets/images/delegations/delegation2.jpg";
import delegationImage3 from "../../../../assets/images/delegations/delegation3.jpg";
import delegationImage4 from "../../../../assets/images/delegations/delegation4.jpg";

const images = [delegationImage1, delegationImage2, delegationImage3, delegationImage4];

const closestTypes = {
  NONE: {
    type: "None",
    buttons: {}
  },
  ACTIVE: {
    type: "Active",
    buttons: {
      details: true
    }
  },
  NEXT: {
    type: "Next",
    buttons: {
      checklist: true
    }
  },
  PREV: {
    type: "Previous",
    buttons: {
      report: true,
      details: true
    }
  }
};

export class LastDelegationContainer extends Component {
  static propTypes = {
    delegations: array
  };

  _getClosestDelegation = delegations => {
    if (delegations.length > 1) {
      delegations.sort((a, b) => moment(b.startDate) - moment(a.startDate));
      let type = closestTypes.ACTIVE;
      const closestDelegation = delegations[0];
      if (moment(closestDelegation.startDate).isBefore()) {
        type = closestTypes.PREV;
      } else if (moment(closestDelegation.startDate).isAfter()) {
        type = closestTypes.NEXT;
      }
      return {
        type: type,
        delegation: closestDelegation,
        urls: {
          report: `delegations/${closestDelegation.id}/report`,
          checklist: `delegations/${closestDelegation.id}#delegation-panels`,
          details: `delegations/${closestDelegation.id}`
        },
        image: this._randomPhoto(images)
      };
    }
    return {
      type: closestTypes.NONE,
      delegation: null,
      urls: null,
      image: this._randomPhoto(images)
    };
  };

  _randomPhoto = photos => photos[Math.floor(Math.random() * photos.length)];

  render() {
    return <LastDelegation closest={this._getClosestDelegation(this.props.delegations)} />;
  }
}

export default connect(
  null,
  null
)(LastDelegationContainer);
