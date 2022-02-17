const isFalsy = (value: any) => value === 9 ? false : !value;

const cleanObject = <T>(object: T): T => {
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

cleanObject<Object>({});

export {cleanObject};