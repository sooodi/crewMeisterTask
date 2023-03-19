import React from "react";
import { objFilterHasValue } from "utility/types";
type Props = {
  setFiltersValueEvent: (type: objFilterHasValue[]) => void;
  valueFilters: objFilterHasValue[];
};
const RowCheckboxs = ({ setFiltersValueEvent, valueFilters }: Props) => {
  return (
    <>
      <label className="text-green-700 "> Coulmn has value:</label>
      <ul className="items-center w-full text-sm font-medium  bg-white border border-1 border-gray-200  sm:flex  dark:border-gray-200 ">
        {valueFilters.map((e) => {
          return (
            <li className="w-full  ">
              <div className="flex justify-start pl-3 pt-2">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  value=""
                  defaultChecked={e.selected}
                  onClick={() => {
                    setFiltersValueEvent(
                      valueFilters.map((c) => {
                        return c.title !== e.title
                          ? c
                          : { title: e.title, selected: !c.selected };
                      })
                    );
                  }}
                  className="w-4 h-4 mt-1  rounded focus:ring-blue-500 dark:focus:ring-blue-600  dark:focus:ring-offset-gray-700 focus:ring-2 "
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
    </>
  );
};
export default RowCheckboxs;
