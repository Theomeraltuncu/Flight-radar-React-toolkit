const apiDataCheck = (value) => {
  return value === 0 || value === null || value === undefined || value === ""
    ? "No Data"
    : value;
};

export default apiDataCheck;
