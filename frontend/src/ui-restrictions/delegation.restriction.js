import { delegationStatusCodes } from "../config/index";

const canSendToTravelManager = status =>
  status === delegationStatusCodes.CREATED || status === delegationStatusCodes.NEEDS_WORK;

export { canSendToTravelManager };
