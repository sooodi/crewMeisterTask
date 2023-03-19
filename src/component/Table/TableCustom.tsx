import React, { useEffect, useState } from "react";
import absences from "Service/absences.json";
import members from "Service/members.json";
import Pagination from "component/Pagination/Pagination";
// import { useCustomContext } from "store/CustomContext";
import EmptyPage from "component/EmptyPage/EmptyPage";
import { AbsentType, ItemProps } from "utility/types";
import { AbsentDuration, SortByName, truncate } from "utility/Functions";
import TableHead from "./Header";
import { useAppSelector } from "hook/ReduxHook";

type Props = {};

const TableCustom = ({}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [originList, setOriginList] = useState([]);
  const [filteredList, setFiltredList] = useState([]);
  const [totalUsersAbsent, setTotalUsersAbsent] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  // const { state } = useCustomContext();

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const stateFilter = useAppSelector((state: any) => state.filterData);
  // Change page
  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    FilterData();
  }, [stateFilter]);

  const FilterData = () => {
    let dataArr = [...originList];
    console.log("ddd", stateFilter?.filterObj.Name);
    if (stateFilter.filterObj.Type !== AbsentType.All)
      dataArr = originList.filter(
        (e: any) =>
          e.type.toLocaleLowerCase() ===
          stateFilter.filterObj.Type.toLocaleLowerCase()
      );

    if (stateFilter?.filterObj.Name.trim() !== "")
      dataArr = dataArr.filter(
        (e: any) =>
          e.name.trim().toLocaleLowerCase() ===
          stateFilter.filterObj.Name.trim().toLocaleLowerCase()
      );
    console.log("stateFilter?.filterObj.Name.trim()", dataArr);
    if (stateFilter?.dateObj.startDate !== null)
      dataArr = dataArr.filter((e: any) => {
        if (stateFilter.dateObj.startDate)
          return e.startDate >= stateFilter.dateObj.startDate;
      });
    if (stateFilter?.dateObj.endDate !== null)
      dataArr = dataArr.filter((e: any) => {
        if (stateFilter.dateObj.endDate)
          return e.endDate <= stateFilter.dateObj.endDate;
      });

    let sortByname = SortByName(dataArr);

    setFiltredList(sortByname);
    setCurrentList(sortByname.slice(0, itemsPerPage));
    TotalAbsent(sortByname);
    setTotalItems(sortByname.length);
    setCurrentPage(1);
  };

  const TotalAbsent = (arr: any) => {
    let total = arr.reduce(
      (sum: any, current: any) => sum + current.duration,
      0
    );
    setTotalUsersAbsent(total);
  };

  useEffect(() => {
    if (originList.length === 0) {
      let arrWithUseName: any = [];
      const res = absences.payload.map((el, index) => {
        let som = members.payload.filter((e) => e.userId === el.userId);
        let status = "Requested";
        if (el?.confirmedAt !== null) status = "Confirmed";
        if (el?.rejectedAt !== null) status = "Rejected";

        if (som.length > 0) {
          arrWithUseName.push({
            ...el,
            name: som[0]?.name,
            image: som[0].image,
            status: status,
            duration: AbsentDuration(el),
          });
        }
      });
      let sortByname = SortByName(arrWithUseName);
      TotalAbsent(arrWithUseName);
      setOriginList(sortByname);
      setFiltredList(sortByname);

      setTotalItems(arrWithUseName.length);
      setCurrentList(arrWithUseName.slice(indexOfFirstItem, indexOfLastItem));
    } else {
      setTotalItems(filteredList.length);
      setCurrentList(filteredList.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [currentPage]);

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
        <td className="px-4  py-4 text-left text-sm text-gray-800 whitespace-nowrap">
          {item.type}
        </td>
        <td className="px-4  py-4 text-left text-sm text-gray-800 whitespace-nowrap">
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

  if (currentList.length <= 0) return <EmptyPage />;

  return (
    <div className="container mx-auto pt-2 s">
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle pb-4">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHead />
                <tbody className="divide-y divide-gray-200">
                  {currentList.map((e: any, index: number) => {
                    return <TableItemBody item={e} index={index} />;
                  })}
                </tbody>
              </table>
              <p className="flex m-2 mt-5 font-medium text-gray-700">
                Total Absense of{" "}
                {stateFilter.filterObj.Name !== ""
                  ? stateFilter.filterObj.Name
                  : "All Users"}
                :<span className="font-medium">{totalUsersAbsent}</span>
              </p>
              <Pagination
                postsPerPage={itemsPerPage}
                totalPosts={totalItems}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCustom;
