import { delegationStatusCodes } from "../config/index";

const canSendToTravelManager = status => {
  return status === delegationStatusCodes.CREATED || status === delegationStatusCodes.NEEDS_WORK;
};

export { canSendToTravelManager };
