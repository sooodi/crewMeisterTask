import { AbsentType, StateType } from "./types";

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
export const calculateTotalAbsence = (arr: any) => {
  if (arr)
    return arr.reduce((sum: any, current: any) => sum + current.duration, 0);
  return 0;
};
export const filterDataAbsence = (arr: any, stateFilter: StateType) => {
  let dataArr = [...arr];

  if (stateFilter.filterObj.Type !== AbsentType.All)
    dataArr = arr.filter(
      (e: any) =>
        e.type.toLocaleLowerCase() ===
        stateFilter.filterObj.Type.toLocaleLowerCase()
    );

  if (stateFilter?.filterObj.Name.trim() !== "")
    dataArr = dataArr.filter(
      (e: any) =>
        e.name.trim().toLocaleLowerCase() ===
        stateFilter.filterObj.Name.trim().toLocaleLowerCase()
    );

  if (stateFilter?.dateObj.startDate !== null)
    dataArr = dataArr.filter((e: any) => {
      if (stateFilter.dateObj.startDate)
        return e.startDate >= stateFilter.dateObj.startDate;
    });
  if (stateFilter?.dateObj.endDate !== null)
    dataArr = dataArr.filter((e: any) => {
      if (stateFilter.dateObj.endDate)
        return e.endDate <= stateFilter.dateObj.endDate;
    });
  return dataArr;
};
