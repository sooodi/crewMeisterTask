export const AbsentDuration = (obj: any) => {
  var start = new Date(obj?.startDate).getTime();
  var end = new Date(obj?.endDate).getTime();
  let TotalDays = Math.ceil((end - start) / (1000 * 3600 * 24)) + 1;
  return TotalDays;
};
export const SortByName = (array: any) => {
  array.sort(function (a: any, b: any) {
    var itemA = a.name.toUpperCase();
    var itemB = b.name.toUpperCase();
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  });
  return array;
};
export const truncate = (str: string, max: number, len: number) => {
  return str.length > max ? str.substring(0, max) + "..." : str;
};
