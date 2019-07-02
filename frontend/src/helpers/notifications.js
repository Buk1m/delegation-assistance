import { toast } from "react-toastify";
import { NO_NETWORK_TOAST_ID } from "../config";

const inProgressNotification = content => {
  if (toast.isActive(NO_NETWORK_TOAST_ID)) return;
  return toast(content, {
    autoClose: 10000,
    progressClassName: "toast-progress-bar"
  });
};

const updateNotification = (toastId, content, type, autoClose = 4000) => {
  if (toast.isActive(NO_NETWORK_TOAST_ID)) return;
  if (toast.isActive(toastId)) {
    toast.update(toastId, {
      type: type,
      render: content,
      autoClose: autoClose,
      progressClassName: ""
    });
  } else {
    toast(content, { type: type });
  }
};

const notify = (content, type, autoClose = 10000) => {
  if (toast.isActive(NO_NETWORK_TOAST_ID)) return;
  toast(content, { type: type }, autoClose);
};

export { inProgressNotification, notify, updateNotification };
