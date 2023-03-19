import absenceDataSlice from "./absenceDataSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { StateAbsenseType } from "utility/types";

export const absensActions = absenceDataSlice.actions;

export const setOriginList = (
  payLoad: StateAbsenseType
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    console.log("payLoad", payLoad);
    // if (getState().absenceData) {
    dispatch(absensActions.setOriginList(payLoad));
    // }
  };
};
export const setCurrentList = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    if (getState().absenceData) {
      dispatch(absensActions.setCurrentList());
    }
  };
};
