import React, { Dispatch } from "react";
import { StateType, ActionType } from "utility/types";

interface IContextProps {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}

const CustomContext = React.createContext({} as IContextProps);

export function useCustomContext() {
  return React.useContext(CustomContext);
}

export default CustomContext;
