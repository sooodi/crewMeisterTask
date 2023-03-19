export type ItemProps = {
  item: any;
  index: number;
};
export type dateObjType = {
  startDate: Date | null;
  endDate: Date | null;
};
export type StateType = {
  noteValues: objFilterHasValue[];
  dateObj: dateObjType;
  filterObj: filterObjType;
};

export type ActionType = {
  type: string;
  payload: any;
};
export type filterObjType = {
  Name: string;
  Type: AbsentType;
  startDate: string;
};
export type objFilterHasValue = {
  title: string;
  selected: boolean;
};
export enum statusAbsense {
  "Requested",
  "Confirmed",
  "Rejected",
}
export enum AbsentType {
  All = "All",
  Sickness = "Sickness",
  Vacation = "Vacation",
}
