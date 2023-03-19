/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useState } from "react";
import { AbsentType } from "utility/types";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
type Props = {
  setTypeEvent: (type: AbsentType) => void;
  selectedType: AbsentType;
};

const CheckboxCustom = ({ setTypeEvent, selectedType }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleSelect = (value: AbsentType) => {
    setTypeEvent(value);
    setOpen(false);
  };

  // query === ""
  //   ? people
  //   : people.filter((person) => {
  //       return person.name.toLowerCase().includes(query.toLowerCase());
  //     });

  return (
    <div className="relative group h-10 w-full rounded-lg">
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="flex items-center w-full whitespace-nowrap rounded-lg rounded h-10   text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none "
        type="button"
        // value={}
        onClick={() => handleOpen()}
      >
        <div className="grid grid-cols-7 w-full  ">
          <div className="col-span-6 ...">
            <label>{selectedType}</label>
          </div>
          <div className="col-span-1 ...">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </button>

      <div
        id="dropdownHover"
        className={`${
          open ? "shown" : "hidden"
        } z-10 bg-white w-full  mt-1 absolute group-hover:block rounded-b border-t-0 divide-y divide-gray-100 rounded-lg shadow w-44`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-700"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <a
              onClick={() => handleSelect(AbsentType.Sickness)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {AbsentType.Sickness}
            </a>
          </li>
          <li>
            <a
              onClick={() => handleSelect(AbsentType.Vacation)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {AbsentType.Vacation}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CheckboxCustom;
