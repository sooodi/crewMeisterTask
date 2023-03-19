import filterDataSlice from "./filterDataSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { StateType } from "utility/types";

export const filterActions = filterDataSlice.actions;

export const doFilter = (
  payLoad: StateType
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    console.log("payLoad", payLoad);
    // if (getState().filterData) {
    dispatch(filterActions.setFilter(payLoad));
    // }
  };
};
export const resetFilter = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    if (getState().filterData) {
      dispatch(filterActions.resetFilter());
    }
  };
};
