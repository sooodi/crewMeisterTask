import CustomForm from "component/CustomForm/CustomForm";
import TableCustom from "component/Table/TableCustom";

import React from "react";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="flex-row flex mt-4">
        <img
          src={require("./asset/crewmeister.jpg")}
          className="App-logo-b mr-4 ml-8"
          alt="logo"
        />
        <h1 className="text-2xl font-bold underline text-sky-800 my-1">
          Soodabeh
        </h1>
      </header>
      <CustomForm />
      <TableCustom />
    </div>
  );
}

export default App;
