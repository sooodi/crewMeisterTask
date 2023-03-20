import FileSaver from "file-saver";
import React from "react";
import { CalculateDateArray, getStatus, truncate } from "utility/Functions";
import { ItemProps } from "utility/types";
const ics = require("ics");

const TableItemBody = ({ item, index }: ItemProps) => {
  const handleEvent = () => {
    const event = {
      start: CalculateDateArray(item.startDate),
      duration: { days: item.duration },
      title: ` Absence Event : user ${item.name}`,
      description: `startDate:${item.startDate} endDate:${item.endDate}  type of Absence:${item.type} admitterNote: ${item.admitterNote} memberNote: ${item.memberNote} `,
      url: "http://www.crewmeister.com/",
      status: getStatus(item.status),
      organizer: { name: item.name },
      attendees: [
        {
          name: "User B",
          email: "userB@example.org",
          rsvp: true,
          role: "Staff",
        },
        {
          name: "Mr/Ms Boss",
          email: "manager@example.org",
          dir: "https://linkedin.com",
          role: "manager",
        },
      ],
    };

    ics.createEvent(event, (error: any, value: any) => {
      if (error) {
        return;
      }
      var file = new File([value], `${__dirname}/event.ics`);

      FileSaver.saveAs(file);
    });
  };
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
      <button
        onClick={handleEvent}
        className="h-6 mt-5 bg-red-200 hover:bg-red-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          className="fill-current w-4 h-4 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z " />
        </svg>
      </button>
    </tr>
  );
};

export default TableItemBody;
