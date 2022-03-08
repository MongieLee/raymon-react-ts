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

// 回到根路径
const resteRoute = () => (window.location.href = window.location.origin);
export { cleanObject, resteRoute };
