import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const filterDataSlice = createSlice({
  name: "filter",
  initialState: initalState,
  reducers: {
    setFilter(state, action: PayloadAction<StateType>) {
      return (state = action.payload);
    },
  },
});

export default filterDataSlice;
