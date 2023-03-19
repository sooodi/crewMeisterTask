import { TodoModel, TodoArrayModel, FilterModel } from "../models/redux-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AbsentType,
  memberListType,
  StateAbsenseType,
  StateType,
} from "utility/types";

// const initialTodoState: TodoArrayModel = {
//   all_todos: [],
//   particular_todo: {
//     userId: 0,
//     id: 0,
//     title: "",
//     completed: false,
//   },
// };
export const initalState: memberListType = {
  memberList: [],
};

const memberDataSlice = createSlice({
  name: "memberData",
  initialState: initalState,
  reducers: {
    setMemberList(state, action: PayloadAction<memberListType>) {
      return (state = action.payload);
    },
  },
});

export default memberDataSlice;
