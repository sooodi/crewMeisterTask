import { AbsentType, StateType } from "utility/types";

export const initalState: StateType = {
  noteValues: [
    { title: "member Note", selected: false },
    { title: "admitter Note", selected: false },
  ],
  dateObj: {
    startDate: null,
    endDate: null,
  },
  filterObj: {
    Name: "",
    Type: AbsentType.All,
    startDate: "",
  },
};
export const dataReducer = (
  state = initalState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SELECTED_FILTER":
      state = JSON.parse(JSON.stringify(action.payload));
      return state;
    case "OBJ_FILTER":
      state = action.payload;
      return state;
    case "RESET_FILTER":
      state = initalState;
      return state;
    default:
      state = JSON.parse(JSON.stringify(action.payload));
      return state;
  }
};
