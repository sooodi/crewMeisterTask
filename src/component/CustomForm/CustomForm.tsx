import React, { useState } from "react";
import CheckboxCustom from "component/CheckBox/CheckboxCustom";
import { StyledForm, StyledButton } from "./CustomForm.style";
import { useCustomContext } from "store/CustomContext";
import { initalState } from "store/dataReducer";
import {
  AbsentType,
  filterObjType,
  objFilterHasValue,
  StateType,
} from "utility/types";
import Datepicker from "react-tailwindcss-datepicker";
import { doFilter, resetFilter } from "store/filterDataAction";
import { useAppDispatch } from "hook/ReduxHook";

type Props = {};

const CustomForm = ({}: Props) => {
  const [hasValueFilter, setHasValueFilter] = useState<objFilterHasValue[]>([
    { title: "member Note", selected: false },
    { title: "admitter Note", selected: false },
  ]);
  const [valueDate, setValueDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [valueFilter, setValueFilter] = useState<filterObjType>({
    Name: "",
    Type: AbsentType.All,
    startDate: "",
  });
  //const { state, dispatch } = useCustomContext();
  const dispatch = useAppDispatch();

  const handleValueChange = (newValue: any) => {
    setValueDate(newValue);
  };

  const FilterByComponent = () => {
    return (
      <ul className="items-center w-full text-sm font-medium  bg-white border border-gray-100 rounded-lg sm:flex  dark:border-gray-100 ">
        {hasValueFilter.map((e) => {
          return (
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-100">
              <div className="flex justify-start pl-3 pt-2">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  value=""
                  defaultChecked={e.selected}
                  onClick={() => {
                    setHasValueFilter(
                      hasValueFilter.map((c) => {
                        return c.title !== e.title
                          ? c
                          : { title: e.title, selected: !c.selected };
                      })
                    );
                  }}
                  className="w-4 h-4 mt-1  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="vue-checkbox-list"
                  className="w-full  ml-2 text-sm font-medium text-black-100 dark:text-black-100"
                >
                  {e.title}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  const UpdateValue = (key: any, value: any) => {
    setValueFilter({ ...valueFilter, [key]: value });
  };

  function twMerge(
    className:
      | string
      | number
      | boolean
      | import("react-tailwindcss-datepicker/dist/types").ClassNameParam[]
      | undefined,
    arg1: string
  ): string {
    throw new Error("Function not implemented.");
  }

  return (
    <StyledForm>
      <form>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-start-1 col-span-1 text-left">
            <span className="text-green-700 ">Type:</span>
            <CheckboxCustom
              selectedType={valueFilter.Type}
              setTypeEvent={(value: AbsentType) => UpdateValue("Type", value)}
            />
          </div>
          <div className="col-start-2 col-span-1   text-left">
            <span className="text-green-700">Member Name:</span>
            <input
              type="text"
              id="floating_filled"
              className="block w-full p-4 text-black-100 border-1 border-gray-200 rounded-lg  sm:text-md focus:ring-blue-100 focus:border-blue-100   "
              placeholder="Name"
              value={valueFilter.Name}
              onChange={(event: any) =>
                UpdateValue("Name", event?.target.value)
              }
            />
          </div>
          <div className=" col-start-3 col-span-2 text-left">
            <span className="text-green-700"> Coulmn has value:</span>
            <FilterByComponent />
          </div>
          <div className="col-start-1 col-span-2 text-left">
            <Datepicker
              containerClassName={() => {
                return "dark:bg-slate-100 text-red-400";
              }}
              inputClassName={(className) =>
                twMerge(className, "bg-white dark:bg-gray")
              }
              primaryColor={"fuchsia"}
              showShortcuts
              value={valueDate}
              onChange={handleValueChange}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setValueFilter(initalState.filterObj);
              dispatch(resetFilter());
              // dispatch({
              //   type: "RESET_FILTER",
              //   payload: {},
              // });
            }}
            className=" col-start-3 h-10 bg-white  px-3 border border-red-300 rounded-md shadow-sm text-sm leading-4  text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Filter
          </button>
          <button
            type="button"
            onClick={
              () => {
                dispatch(
                  doFilter({
                    noteValues: hasValueFilter,
                    dateObj: valueDate,
                    filterObj: valueFilter,
                  })
                );
              }
              // dispatch({
              //   type: "OBJ_FILTER",
              //   payload: {
              //     noteValues: hasValueFilter,
              //     dateObj: valueDate,
              //     filterObj: valueFilter,
              //   },
              // })
            }
            className=" col-start-4  h-10 bg-white  px-3 border border-blue-300 rounded-md shadow-sm text-sm leading-4  text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Filter
          </button>
        </div>
      </form>
    </StyledForm>
  );
};

export default CustomForm;
