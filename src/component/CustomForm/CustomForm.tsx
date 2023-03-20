import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { useAppDispatch } from "hook/ReduxHook";
import DropDownCustom from "component/DropDownCustom/DropDownCustom";
import RowCheckboxs from "component/RowCheckboxs/RowCheckboxs";

import { initalState } from "store/dataReducer";
import { doFilter } from "store/filterDataAction";

import { twMerge } from "utility/Functions";
import {
  AbsentType,
  dateObjType,
  filterObjType,
  objFilterHasValue,
} from "utility/types";

import { StyledForm } from "./CustomForm.style";
type Props = {};

const CustomForm = ({}: Props) => {
  const [hasValueFilter, setHasValueFilter] = useState<objFilterHasValue[]>([
    { title: "member Note", selected: false },
    { title: "admitter Note", selected: false },
  ]);
  const [valueDate, setValueDate] = useState<dateObjType>({
    startDate: null,
    endDate: null,
  });
  const [valueFilter, setValueFilter] = useState<filterObjType>({
    Name: "",
    Type: AbsentType.All,
    startDate: "",
  });

  const dispatch = useAppDispatch();

  const handleValueChange = (newValue: any) => {
    setValueDate(newValue);
  };

  const UpdateValue = (key: any, value: any) => {
    setValueFilter({ ...valueFilter, [key]: value });
  };

  const handleFilter = () => {
    dispatch(
      doFilter({
        noteValues: hasValueFilter,
        dateObj: valueDate,
        filterObj: valueFilter,
      })
    );
  };
  const handleResetFilter = () => {
    setValueFilter(initalState.filterObj);
    setValueDate(initalState.dateObj);
    setHasValueFilter(initalState.noteValues);
    dispatch(doFilter(initalState));
  };

  return (
    <StyledForm>
      <form>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-start-1 col-span-1 text-left">
            <label className="text-green-700 ">Member Name:</label>
            <input
              type="text"
              id="floating_filled"
              className=" w-full text-black-100 border border-gray-100  dark:border-gray-100   sm:text-md focus:ring-blue-100 focus:border-blue-100   "
              placeholder="Name"
              value={valueFilter.Name}
              onChange={(event: any) =>
                UpdateValue("Name", event?.target.value)
              }
            />
          </div>
          <div className="col-start-2 col-span-1 text-left">
            <label className="text-green-700 mb-2">Type:</label>
            <DropDownCustom
              selectedType={valueFilter.Type}
              setTypeEvent={(value: AbsentType) => UpdateValue("Type", value)}
            />
          </div>
          <div className=" col-start-3 col-span-2 text-left">
            <RowCheckboxs
              setFiltersValueEvent={(type: objFilterHasValue[]) =>
                setHasValueFilter(type)
              }
              valueFilters={hasValueFilter}
            />
          </div>
          <div className="col-start-1 col-span-1 text-left">
            <Datepicker
              containerClassName={() => {
                return "dark:bg-slate-100 text-red-400";
              }}
              inputClassName={(className) =>
                twMerge(className, "bg-white dark:bg-gray")
              }
              primaryColor={"sky"}
              showShortcuts
              value={valueDate}
              onChange={handleValueChange}
            />
          </div>
          <button
            type="button"
            onClick={handleResetFilter}
            className="col-start-3 h-10 bg-white  px-3 border border-red-300 rounded-md shadow-sm text-sm leading-4  text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Filter
          </button>
          <button
            type="button"
            onClick={handleFilter}
            className="col-start-4 bg-sky-900 h-10  px-3 border border-blue-300 rounded-md shadow-sm text-sm leading-4  text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Filter
          </button>
        </div>
      </form>
    </StyledForm>
  );
};

export default CustomForm;
