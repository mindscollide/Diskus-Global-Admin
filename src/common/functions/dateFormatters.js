// ================================== function which support end arabic both ======================================== //

import moment from "moment/moment";

// currently using in Session Duration in Login History
export const convertUtcDateAndTimeToCurrentTimeZone = (
  utcDateTimes,
  locale
) => {
  try {
    console.log("convertUTCDateToLocalDate", utcDateTimes);
    console.log("convertUTCDateToLocalDate", typeof utcDateTimes);

    if (!utcDateTimes) {
      return "";
    }

    const date = new Date(
      `${utcDateTimes.slice(0, 4)}-${utcDateTimes.slice(
        4,
        6
      )}-${utcDateTimes.slice(6, 8)}T${utcDateTimes.slice(
        8,
        10
      )}:${utcDateTimes.slice(10, 12)}:${utcDateTimes.slice(12, 14)}.000Z`
    );

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      // timeZoneName: "short",
      numberingSystem: locale === "ar" ? "arab" : "latn",
    };
    return date.toLocaleString(locale, options);
  } catch (error) {
    console.error("Error in convertUtcDateAndTimeToCurrentTimeZone:", error);
    return "";
  }
};

// export const convertUtcDateAndTimeToCurrentTimeZone = (utcDateTime, locale) => {
//   try {
//     if (!utcDateTime) {
//       return "";
//     }

//     const year = utcDateTime.slice(0, 4);
//     const month = utcDateTime.slice(4, 6);
//     const day = utcDateTime.slice(6, 8);
//     const hours = utcDateTime.slice(8, 10);
//     const minutes = utcDateTime.slice(10, 12);
//     const seconds = utcDateTime.slice(12, 14);

//     const utcDate = new Date(
//       Date.UTC(year, month - 1, day, hours, minutes, seconds)
//     );
//     const localDate = new Date(
//       utcDate.toLocaleString("en-US", { timeZone: "UTC" })
//     );

//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//       numberingSystem: locale === "ar" ? "arab" : "latn",
//     };

//     const formattedDate = localDate.toLocaleString(locale, options);
//     return formattedDate;
//   } catch (error) {
//     console.error("Error in convertUtcDateAndTimeToCurrentTimeZone:", error);
//     return "";
//   }
// };

// currently using in Session Duration in Organization List
export const convertUTCDateToLocalDate = (utcDateTime, locale) => {
  try {
    const date = new Date(
      `${utcDateTime.slice(0, 4)}-${utcDateTime.slice(
        4,
        6
      )}-${utcDateTime.slice(6, 8)}T${utcDateTime.slice(
        8,
        10
      )}:${utcDateTime.slice(10, 12)}:${utcDateTime.slice(12, 14)}.000Z`
    );

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      numberingSystem: locale === "ar" ? "arab" : "latn",
    };
    return date.toLocaleString(locale, options);
  } catch {}
};

// currently using in Session Duration in Login History
export function formatSessionDurationArabicAndEng(number, locales) {
  let locale = locales === "ar" ? "ar-SA" : "en-US";
  // Round the number to 2 decimal places
  const roundedNumber = Math.round(number * 100) / 100;

  // Use the appropriate locale for formatting
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedNumber);

  // If the locale is Arabic, convert Western Arabic numerals to Eastern Arabic numerals
  if (locale === "ar") {
    const arabicFormattedNumber = formattedNumber.replace(/[0-9]/g, (digit) =>
      String.fromCharCode(digit.charCodeAt(0) + 1584)
    );

    // Check if the number has decimal values
    if (number % 1 === 0) {
      return arabicFormattedNumber + ".00";
    }

    return arabicFormattedNumber;
  }

  return formattedNumber;
}

export function formatDate(dateString, locale) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat(locale, options).format(
    new Date(`${year}-${month}-${day}`)
  );

  if (locale === "ar") {
    return convertNumbersToArabic(formattedDate);
  }

  return formattedDate;
}

function convertNumbersToArabic(value) {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(value).replace(/\d/g, (digit) => arabicNumbers[digit]);
}

export function convertNumbersInToArabic(value) {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(value).replace(/\d/g, (digit) => arabicNumbers[digit]);
}
// ================================== function which support end arabic both ======================================== //
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

export function convertUTCDateToLocalDateDiffFormat(dateString) {
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
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day} - ${month} - ${year}`;
  } else {
    return "Invalid Date";
  }
}

// Function to convert Western Arabic numerals to Eastern Arabic numerals
const convertToEasternArabicNumerals = (number) => {
  return number.replace(/[0-9]/g, (digit) =>
    String.fromCharCode(digit.charCodeAt(0) + 1584)
  );
};

export const ExtractMonthAndYear = (fullDate) => {
  let Month = "";
  let Year = "";
  try {
    let fullDateyear =
      fullDate.slice(0, 4) +
      "-" +
      fullDate.slice(4, 6) +
      "-" +
      fullDate.slice(6, 8) +
      "T" +
      fullDate.slice(8, 10) +
      ":" +
      fullDate.slice(10, 12) +
      ":" +
      fullDate.slice(12, 14) +
      ".000Z";
    let convertIntoGMT = new Date(fullDateyear);
    console.log(convertIntoGMT, "convertIntoGMTconvertIntoGMT");
    if (localStorage.getItem("currentLanguage") === "ar") {
      Month = new Intl.DateTimeFormat("ar", { month: "long" }).format(
        convertIntoGMT
      );
    } else {
      Month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        convertIntoGMT
      );
    }
    // Month = convertIntoGMT.getMonth();
    Year = convertIntoGMT.getFullYear();
  } catch (error) {
    console.log(error);
  }

  return { Month, Year };
};

// currently using in Session Duration in Organization List
export const convertUTCDateToLocalDateView = (utcDateTime, locale) => {
  try {
    // Parse the UTC date string
    const date = new Date(
      Date.UTC(
        parseInt(utcDateTime.slice(0, 4)),
        parseInt(utcDateTime.slice(4, 6)) - 1,
        parseInt(utcDateTime.slice(6, 8)),
        parseInt(utcDateTime.slice(8, 10)),
        parseInt(utcDateTime.slice(10, 12)),
        parseInt(utcDateTime.slice(12, 14))
      )
    );

    // Use moment to format the date
    return moment(date).format("MMM D, YYYY");
  } catch (error) {
    console.error("Error converting UTC date:", error);
    return null;
  }
};

//Audit trial function
export const AuditTrialDateTimeFunction = (dateTime, locale = "en") => {
  console.log({ dateTime, locale }, "localelocale");
  if (!dateTime || dateTime.length !== 14) return "";

  // Construct ISO datetime string
  let isoString =
    dateTime.slice(0, 4) +
    "-" +
    dateTime.slice(4, 6) +
    "-" +
    dateTime.slice(6, 8) +
    "T" +
    dateTime.slice(8, 10) +
    ":" +
    dateTime.slice(10, 12) +
    ":" +
    dateTime.slice(12, 14) +
    "Z";

  const momentObj = moment(isoString).locale(locale);

  if (locale === "en") {
    return momentObj.format("hh:mm A - Do MMMM, YYYY");
  } else if (locale === "ar") {
    return momentObj.format("hh:mm A - Do MMMM, YYYY");
  } else {
    return momentObj.format("hh:mm A - Do MMMM, YYYY");
  }
};

export const AuditTrialDateTimeFunctionViewActionDetails = (
  dateTime,
  locale = "en"
) => {
  console.log({ dateTime, locale }, "localelocale");

  if (!dateTime || dateTime.length !== 14) return "";

  // Construct ISO datetime string
  let isoString =
    dateTime.slice(0, 4) +
    "-" +
    dateTime.slice(4, 6) +
    "-" +
    dateTime.slice(6, 8) +
    "T" +
    dateTime.slice(8, 10) +
    ":" +
    dateTime.slice(10, 12) +
    ":" +
    dateTime.slice(12, 14) +
    "Z";

  const momentObj = moment(isoString).locale(locale);

  // Format: YYYY-MM-DD | hh:mm A
  return momentObj.format("YYYY-MM-DD | hh:mm A");
  // to show date in MMM dd, yyyy HH:mm AM/PM
};

export const newDateForLoginUserHistory = (dateTime) => {
  console.log(dateTime, "newDateForLoginUserHistory");
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
  return moment(_dateTime).format("MMM d, YYYY hh:mm A");
};

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

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
