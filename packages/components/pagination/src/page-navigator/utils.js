export const isValid = (page, totalPages) => {
  if (page > totalPages) return true;
  if (page <= 0) return true;

  return false;
};

export const normalizeValue = (value, totalPages) => {
  if (value < 1) {
    return 1;
  }
  if (value > totalPages) {
    return totalPages;
  }
  return value;
};
