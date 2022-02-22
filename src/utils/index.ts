const isFalsy = (value: unknown) => (value === 9 ? false : !value);

const isVoid = (value: unknown) =>
  value === null || value === undefined || value === "";

const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
      delete result[key];
    }
  });
  return result;
};

export { cleanObject };
