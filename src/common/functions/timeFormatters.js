import { utcConvertintoGMT } from "./dateFormatters";

export const getTimeDifference = (dateLogin, dateLogOut) => {
  let loginTime = utcConvertintoGMT(dateLogin).getTime();
  let logoutTime = utcConvertintoGMT(dateLogOut).getTime();

  let timeDifference = logoutTime - loginTime;
  if (timeDifference < 0) {
    return "";
  }

  let hours = Math.floor(timeDifference / (1000 * 60 * 60));
  let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")},${minutes
    .toString()
    .padStart(2, "0")},${seconds.toString().padStart(2, "0")}`;
};
