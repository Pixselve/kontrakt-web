export const shareCommonElements = (arr1: any[], arr2: any[]): boolean => {
  const [shortArr, longArr] = (arr1.length < arr2.length) ? [arr1, arr2] : [arr2, arr1];
  const longArrSet = new Set(longArr);
  return shortArr.some(el => longArrSet.has(el));
};
