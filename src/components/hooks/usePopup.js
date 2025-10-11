import { useState } from "react";

export const usePopup = () => {
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "info", // success, error, warning
  });

  const showPopup = (message, type = "info") => {
    setPopup({ show: true, message, type });

    // auto close after 3 seconds
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "info" });
    }, 3000);
  };

  const hidePopup = () => {
    setPopup({ show: false, message: "", type: "info" });
  };

  return { popup, showPopup, hidePopup };
};
