import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbsentType, StateType } from "utility/types";

// const initialTodoState: TodoArrayModel = {
//   all_todos: [],
//   particular_todo: {
//     userId: 0,
//     id: 0,
//     title: "",
//     completed: false,
//   },
// };
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
      console.log("payLoad", "slice", state);
      return (state = action.payload);
    },
    resetFilter(state, action: PayloadAction) {
      state = initalState;
    },
  },
});

export default filterDataSlice;
