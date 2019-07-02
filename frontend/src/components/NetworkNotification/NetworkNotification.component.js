import React from "react";
import { toast } from "react-toastify";
import { Icon } from "react-icons-kit";
import { ic_signal_wifi_off } from "react-icons-kit/md/ic_signal_wifi_off";
import { NO_NETWORK_TOAST_ID } from "../../config";

const renderNotification = () => (
  <div className="d-flex flex-row">
    <Icon className="flex-2 m-2" size="28" icon={ic_signal_wifi_off} />
    <div className="flex-10">
      No network detected. <br /> Check your internet connection.
    </div>
  </div>
);

const NetworkNotification = () => {
  toast.isActive(NO_NETWORK_TOAST_ID)
    ? toast.update(NO_NETWORK_TOAST_ID)
    : toast.warn(renderNotification, { toastId: NO_NETWORK_TOAST_ID });
  return null;
};

export default NetworkNotification;
