// ================================== function which support end arabic both ======================================== //

// currently using in Session Duration in Login History
export const convertUtcDateAndTimeToCurrentTimeZone = (utcDateTime, locale) => {
  console.log("convertUTCDateToLocalDate", utcDateTime);
  console.log("convertUTCDateToLocalDate", typeof utcDateTime);
  const date = new Date(
    `${utcDateTime.slice(0, 4)}-${utcDateTime.slice(4, 6)}-${utcDateTime.slice(
      6,
      8
    )}T${utcDateTime.slice(8, 10)}:${utcDateTime.slice(
      10,
      12
    )}:${utcDateTime.slice(12, 14)}.000Z`
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
};

// currently using in Session Duration in Organization List
export const convertUTCDateToLocalDate = (utcDateTime, locale) => {
  console.log("convertUTCDateToLocalDate", utcDateTime);
  console.log("convertUTCDateToLocalDate", typeof utcDateTime);
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
