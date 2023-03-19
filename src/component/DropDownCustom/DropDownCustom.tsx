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
    <div className="relative group  w-full  ">
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="flex items-center w-full whitespace-nowrap  rounded h-12  text-xs font-medium uppercase  leading-normal text-black  transition duration-150 ease-in-out border  motion-reduce:transition-none "
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
              onClick={() => handleSelect(AbsentType.All)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {AbsentType.All}
            </a>
          </li>
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
