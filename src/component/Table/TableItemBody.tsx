import React from "react";
import { truncate } from "utility/Functions";
import { ItemProps } from "utility/types";

const TableItemBody = ({ item, index }: ItemProps) => {
  return (
    <tr key={index}>
      <th className="px-4 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
        {item.userId}
      </th>
      <th className="px-4 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap ">
        <img src={item.image} className="App-logo-b" alt="logo" />
      </th>
      <td className="px-2 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
        {truncate(item.name, 15, item.name.length)}
      </td>
      <td className="px-4 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
        {item.startDate}
      </td>
      <td className="px-4 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
        {item.duration}
      </td>
      <td className="px-4  py-4 text-left text-sm text-gray-800 whitespace-nowrap">
        {item.status}
      </td>
      <td className="px-4 py-4 text-left text-sm text-gray-800 whitespace-nowrap">
        {item.type}
      </td>
      <td className="px-4 py-4 text-left text-sm text-gray-800 whitespace-nowrap">
        <a href="#" data-te-toggle="tooltip" title={item.memberNote}>
          <span>{truncate(item.memberNote, 30, item.memberNote.length)}</span>
        </a>
      </td>
      <td className="px-4 py-4 text-left text-sm text-gray-800 whitespace-nowrap">
        <a href="#" data-te-toggle="tooltip" title={item.admitterNote}>
          <span>
            {truncate(item.admitterNote, 30, item.admitterNote.length)}
          </span>
        </a>
      </td>
    </tr>
  );
};

export default TableItemBody;
