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
export type absenseListType = {
  _id: string;
  admitterId: string | null;
  admitterNote: string;
  confirmedAt: string | null;
  createdAt: string;
  crewId: number;
  endDate: string;
  memberNote: string;
  rejectedAt: string;
  startDate: string;
  type: string;
  userId: number;
};
export type memberType = {
  _id: string;
  name: string;
  image: string;
  crewId: 352;
  createdAt: string;
  updatedAt: string;
  userId: number;
};
export type StateAbsenseType = {
  originList: any[];
  currentList: any[];
};
export type memberListType = {
  memberList: memberType[];
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
