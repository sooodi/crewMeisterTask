import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AbsentType,
  memberListType,
  StateAbsenseType,
  StateType,
} from "utility/types";

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
