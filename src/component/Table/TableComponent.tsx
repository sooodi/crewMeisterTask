import React from "react";
import TableHead from "./Header";
import TableItemBody from "./TableItemBody";
interface TableProps {
  data: any;
}

const TableComponent = ({ data }: TableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <TableHead />
      <tbody className="divide-y divide-gray-200">
        {data.map((e: any, index: number) => {
          return <TableItemBody item={e} index={index} />;
        })}
      </tbody>
    </table>
  );
};
export default TableComponent;
