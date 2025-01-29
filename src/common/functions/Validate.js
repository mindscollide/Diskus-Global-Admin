import XRegExp from "xregexp";

//Email supports arabic and english langugae both emails formats
export const validateEmailEnglishAndArabicFormat = (email) => {
  const emailRegex = XRegExp(
    `
  ^
  [\\p{L}0-9._%+-]+@[\\p{L}0-9.-]+\\.[\\p{L}]{2,}$
`,
    "xi"
  );
  return emailRegex.test(email);
};

export const validationEmail = (value) => {
  var mailformat = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (mailformat.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const getActionValue = (url, key) => {
  return url.split(key)[1];
};