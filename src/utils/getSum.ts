export const getSum = <T extends Record<string, unknown>>(
  list: Array<T>,
  field: string
) => {
  return list.reduce((sum, el) => {
    if (typeof el[field] === 'number') {
      sum += el[field];
    }
    return sum;
  }, 0);
};
