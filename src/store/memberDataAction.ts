import memberDataSlice from "./memberDataSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { memberListType } from "utility/types";

export const memberActions = memberDataSlice.actions;

export const setMemberList = (
  payLoad: memberListType
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    if (getState().absenceData) {
      dispatch(memberActions.setMemberList(payLoad));
    }
  };
};
