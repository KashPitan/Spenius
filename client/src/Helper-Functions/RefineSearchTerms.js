//removes characters in brackets from search strings
//to improve accuracy of search
const refineSearchTerms = (s) => {
  if (s.includes("(")) {
    s = s.substring(0, s.indexOf("("));
  }
  if (s.includes("-")) {
    s = s.substring(0, s.indexOf("-"));
  }
  return s;
};

export default refineSearchTerms;
