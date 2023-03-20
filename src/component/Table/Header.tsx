import React from "react";

const TableHead = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-4 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          ID
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Image
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Name
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Start Date
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Period(days)
        </th>
        <th
          scope="col"
          className="px-4 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Status
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Type
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          Member Note
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase"
        >
          Admitter Note
        </th>
        <th
          scope="col"
          className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase"
        >
          get ICS
        </th>
      </tr>
    </thead>
  );
};
export default TableHead;
