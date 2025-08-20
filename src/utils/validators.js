// src/utils/validators.js
// Small helpers for validating input parameters.

function isNonEmptyString(val, maxLen = 200) {
  return typeof val === 'string' && val.trim().length > 0 && val.trim().length <= maxLen;
}

function isDDMMYYYY(val) {
  if (typeof val !== 'string') return false;
  const re = /^\d{2}-\d{2}-\d{4}$/;
  if (!re.test(val)) return false;
  // basic validity check for month/day
  const [d, m, y] = val.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date && date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}



function cleanRTF(rtfText) {
  if (!rtfText) return "";

  return rtfText
    .replace(/\\[a-z]+\d* ?/g, " ")   // remove RTF tags like \par, \fs20
    .replace(/[{}\\]/g, " ")          // remove { } \
    .replace(/\b(Times New Roman|Arial|Courier New|Calibri|Verdana)\b/gi, "") // remove font names
    .replace(/;+/, " ")               // replace multiple ; with single space
    .replace(/^([;,\s]+)/, "")        // remove starting ; ; ; ; , spaces, commas
    .replace(/\s+/g, " ")             // collapse multiple spaces to one
    .trim();                          // remove spaces at both ends
}


module.exports = {
  cleanRTF,
  isNonEmptyString,
  isDDMMYYYY,
};
