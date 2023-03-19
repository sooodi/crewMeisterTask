import filterDataSlice from "./filterDataSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";

import TodoService from "Service/TodoService";
import { FilterModel, TodoModel } from "models/redux-models";
import { RootState } from "./store";
import { StateType } from "utility/types";

export const todoActions = filterDataSlice.actions;

export const doFilter = (
  payLoad: StateType
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    console.log("payLoad", payLoad);
    // if (getState().filterData) {
    // const response: FilterModel = await TodoService.getAllTodos();
    dispatch(todoActions.setFilter(payLoad));
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
      // const response: FilterModel = await TodoService.getAllTodos();
      dispatch(todoActions.resetFilter());
    }
  };
};
// export const fetchParticularTodo=(todo_id:number):ThunkAction<void,RootState,unknown,AnyAction>=>{
//     return async(dispatch,getState)=>{
//         const response:TodoModel=await TodoService.getParticularTodo(todo_id);
//         dispatch(todoActions.setParticularTodo(response))
// }
//}
