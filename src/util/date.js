/** @format */

export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

// 이렇게 잘 사용하는 함수들은 따로 util에 빼서 그때마다 불러오면 된다.
