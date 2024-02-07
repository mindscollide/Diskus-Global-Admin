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
