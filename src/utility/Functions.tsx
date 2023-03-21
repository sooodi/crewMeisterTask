import {
  absenseListType,
  AbsentType,
  memberType,
  StateType,
  statusAbsense,
} from "./types";

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
export const HandleTableData = (
  absenceArray: absenseListType[],
  memberArray: memberType[]
) => {
  let arrWithUseName: any = [];

  const result = absenceArray.map((el, index) => {
    let som = memberArray.filter((e) => e.userId === el.userId);
    let status = "Requested";
    if (el.confirmedAt !== null) status = "Confirmed";
    if (el?.rejectedAt !== null) status = "Rejected";

    if (som.length > 0) {
      arrWithUseName.push({
        ...el,
        name: som[0]?.name,
        image: som[0].image,
        status: status,
        duration: AbsentDuration(el),
      });
    }
  });
  return arrWithUseName;
};

export const HandleFilterObject = (
  stateFilter: StateType,
  memberList: memberType[]
) => {
  let urlQuery = ``;
  if (stateFilter.filterObj.Type !== "All")
    urlQuery += `&type=${stateFilter.filterObj.Type.toLocaleLowerCase()}`;
  if (stateFilter.dateObj.startDate !== null)
    urlQuery += `&startDate=${stateFilter.dateObj.startDate}`;
  if (stateFilter.dateObj.endDate !== null)
    urlQuery += `&endDate=${stateFilter.dateObj.endDate}`;
  if (stateFilter.filterObj.Name !== "") {
    let userId = memberList.find(
      (e) => e.name === stateFilter.filterObj.Name
    )?.userId;

    urlQuery += `&userId=${userId}`;
  }
  if (stateFilter.noteValues[0].selected === true)
    urlQuery += `&memberNote=true`;
  if (stateFilter.noteValues[1].selected === true)
    urlQuery += `&admitterNote=true`;

  return urlQuery;
};

export function twMerge(
  className:
    | string
    | number
    | boolean
    | import("react-tailwindcss-datepicker/dist/types").ClassNameParam[]
    | undefined,
  arg1: string
): string {
  throw new Error("Function not implemented.");
}
export const CalculateDateArray = (dateValue: string) => {
  let val = "2021-02-04";
  let dateArray = val.split("-");
  return dateArray.map((e) => parseInt(e));
};
export function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
export function getStatus(status: string) {
  if (status === "Rejected") return "CANCELLED";
  else if (status === "Requested") return "ENTATIVE";
  else return "CONFIRMED";
}
