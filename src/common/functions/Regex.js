// For Only Number Regex
export const regexOnlyNumbers = (data) => {
  return data.replace(/^\s/, "").replace(/\D/g, "");
};

// its allow only character  space and number and also didnt allow space as a first character
export const regexOnlyForNumberNCharacters = (data) => {
  return data.replace(/^\s/, "").replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, "");
};

// its allow only character  space and also didnt allow space as a first character
export const regexOnlyCharacters = (data) => {
  return data.replace(/^\s/, "").replace(/[^a-zA-Z\s]/g, "");
};

// for global level setting
export const onlyNumbersPattern = /^[0-9]+$/;
export const onlyNumberNCharactersPattern = /^\s*|[^\u0600-\u06FFa-zA-Z0-9\s]/g;
export const onlyCharactersPattern = /^\s*|[^a-zA-Z\s]/g;

export function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}
