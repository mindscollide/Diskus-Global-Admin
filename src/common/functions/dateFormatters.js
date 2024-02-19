import moment from "moment";

export const newTimeFormaterForImportMeetingAgenda = (dateTime) => {
  let fullDateyear =
    dateTime?.slice(0, 4) +
    "-" +
    dateTime?.slice(4, 6) +
    "-" +
    dateTime?.slice(6, 8) +
    "T" +
    dateTime?.slice(8, 10) +
    ":" +
    dateTime?.slice(10, 12) +
    ":" +
    dateTime?.slice(12, 14) +
    ".000Z";
  let _dateTime = new Date(fullDateyear).toString("YYYYMMDDHHmmss");
  return moment(_dateTime).format("h:mm A - DD MMM, YYYY");
};

export const utcConvertintoGMT = (date) => {
  let fullDateyear =
    date?.slice(0, 4) +
    "-" +
    date?.slice(4, 6) +
    "-" +
    date?.slice(6, 8) +
    "T" +
    date?.slice(8, 10) +
    ":" +
    date?.slice(10, 12) +
    ":" +
    date?.slice(12, 14) +
    ".000Z";
  let _dateTime = new Date(fullDateyear);
  return _dateTime;
};

export function convertUTCDateToLocalDate(dateString) {
  const currentLanguage = Number(localStorage.getItem("currentLanguage"));

  const dateTimeString = dateString + "235958";
  const date = new Date(
    Date.UTC(
      parseInt(dateTimeString.substring(0, 4), 10),
      parseInt(dateTimeString.substring(4, 6), 10) - 1,
      parseInt(dateTimeString.substring(6, 8), 10),
      parseInt(dateTimeString.substring(8, 10), 10),
      parseInt(dateTimeString.substring(10, 12), 10),
      parseInt(dateTimeString.substring(12, 14), 10)
    )
  );
  if (date instanceof Date && !isNaN(date)) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString(currentLanguage, options).replace(/ /g, " ");
  } else {
    return "Invalid Date";
  }
}
