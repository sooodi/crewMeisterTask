import CustomForm from "component/CustomForm/CustomForm";
import TableCustom from "component/Table/TableCustom";

import React from "react";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="relative">
        <input
          type="text"
          id="floating_filled"
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-red-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_filled"
          className="absolute text-lg text-white dark:text-white-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          OOps ,Error!
        </label>
      </div>
      <header className="App-header ">
        <h1 className="text-2xl font-bold underline text-white-600 my-1">
          My assesment
        </h1>
      </header>
      <CustomForm />
      <TableCustom />
    </div>
  );
}

export default App;
