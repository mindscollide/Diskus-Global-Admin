import { notification } from "antd";
import "./Snack_bar.css";
export const showNotification = (
  type = "info",
  description = "",
  customClass = "notification-custom"
) => {
  notification[type]({
    message: "",
    description,
    placement: "topRight",
    duration: 3,
    className: customClass, // 👈 important
  });
};
