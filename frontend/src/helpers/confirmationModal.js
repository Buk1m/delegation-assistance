import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const confirmationModal = (title, message, action) =>
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: () => action()
      },
      {
        label: "No",
        onClick: () => false
      }
    ]
  });

export { confirmationModal };
