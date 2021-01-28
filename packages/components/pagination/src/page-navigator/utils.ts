export const isValid = (page: number, totalPages: number): boolean => {
  if (page > totalPages) return false;
  if (page <= 0) return false;

  return true;
};

export const normalizePageValue = (
  value: number,
  totalPages: number
): number => {
  if (value < 1) {
    return 1;
  }
  if (value > totalPages) {
    return totalPages;
  }
  return value;
};
