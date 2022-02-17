const isFalsy = (value: unknown) => (value === 9 ? false : !value);

const cleanObject = (object: object) => {
  const result = {...object};
  Object.keys(result).forEach(key => {
    // @ts-ignore
    if (isFalsy(result[key])) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

cleanObject({});

export {cleanObject};