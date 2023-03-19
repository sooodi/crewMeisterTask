import { TodoModel, TodoArrayModel, FilterModel } from "../models/redux-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbsentType, StateAbsenseType, StateType } from "utility/types";

// const initialTodoState: TodoArrayModel = {
//   all_todos: [],
//   particular_todo: {
//     userId: 0,
//     id: 0,
//     title: "",
//     completed: false,
//   },
// };
export const initalState: StateAbsenseType = {
  originList: [],
  currentList: [],
};

const absenceDataSlice = createSlice({
  name: "absenceData",
  initialState: initalState,
  reducers: {
    setOriginList(state, action: PayloadAction<StateAbsenseType>) {
      return (state = action.payload);
    },
    setCurrentList(state, action: PayloadAction) {
      state = initalState;
    },
  },
});

export default absenceDataSlice;
