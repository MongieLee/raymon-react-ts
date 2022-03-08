// 获取storage
const getItem = (key: string) => {
  return localStorage.getItem(key);
};

// 设置storage
const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export { getItem, setItem };
