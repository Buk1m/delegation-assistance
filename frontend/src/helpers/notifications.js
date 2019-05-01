import { toast } from "react-toastify";
const inProgressNotification = content =>
  toast(content, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 10000, progressClassName: "toast-progress-bar" });

const updateNotification = (toastId, content, type, autoClose = 4000) => {
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

export { inProgressNotification, updateNotification };
