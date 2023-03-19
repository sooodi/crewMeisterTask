import React, { useEffect, useState } from "react";
import absences from "Service/absences.json";
import members from "Service/members.json";
import Pagination from "component/Pagination/Pagination";
// import { useCustomContext } from "store/CustomContext";
import EmptyPage from "component/EmptyPage/EmptyPage";
import { AbsentType, ItemProps } from "utility/types";
import {
  AbsentDuration,
  calculateTotalAbsence,
  filterDataAbsence,
  SortByName,
  truncate,
} from "utility/Functions";
import TableHead from "./Header";
import { useAppDispatch, useAppSelector } from "hook/ReduxHook";
import useAbsentMember from "hook/useAbsentMember";
import TableItemBody from "./TableItemBody";
import TableComponent from "./TableComponent";
import useMember from "hook/useMembers";
import { setMemberList } from "store/memberDataAction";

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
  const stateMember = useAppSelector((state: any) => state.memberData);
  console.log("stateMember", stateMember);
  const dispatch = useAppDispatch();
  // Change page
  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    FilterData();
  }, [stateFilter]);

  const FilterData = () => {
    let resultArray = filterDataAbsence(originList, stateFilter);
    let sortByname = SortByName(resultArray);
    setFiltredList(sortByname);
    setCurrentList(sortByname.slice(0, itemsPerPage));
    TotalAbsent(sortByname);
    setTotalItems(sortByname.length);
    setCurrentPage(1);
  };

  const TotalAbsent = (arr: any) => {
    setTotalUsersAbsent(calculateTotalAbsence(arr));
  };

  // useEffect(() => {
  //   if (originList.length === 0) {
  //     let arrWithUseName: any = [];
  //     const res = absences.payload.map((el, index) => {
  //       let som = members.payload.filter((e) => e.userId === el.userId);
  //       let status = "Requested";
  //       if (el?.confirmedAt !== null) status = "Confirmed";
  //       if (el?.rejectedAt !== null) status = "Rejected";

  //       if (som.length > 0) {
  //         arrWithUseName.push({
  //           ...el,
  //           name: som[0]?.name,
  //           image: som[0].image,
  //           status: status,
  //           duration: AbsentDuration(el),
  //         });
  //       }
  //     });
  //     let sortByname = SortByName(arrWithUseName);
  //     TotalAbsent(arrWithUseName);
  //     setOriginList(sortByname);
  //     setFiltredList(sortByname);

  //     setTotalItems(arrWithUseName.length);
  //     setCurrentList(arrWithUseName.slice(indexOfFirstItem, indexOfLastItem));
  //   } else {
  //     setTotalItems(filteredList.length);
  //     setCurrentList(filteredList.slice(indexOfFirstItem, indexOfLastItem));
  //   }
  // }, [currentPage]);
  const {
    loading: loadingMember,
    error: errorMember,
    sendRequest: fetchMemberDatas,
  } = useMember();
  const { loading, error, sendRequest: fetchDatas } = useAbsentMember();
  useEffect(() => {
    const HandleMemberData = (dataObj: any) => {
      const loadedTasks = [];
      console.log("HandleMemberData", dataObj);
      dispatch(setMemberList(dataObj?.members));
    };
    if (stateMember)
      fetchMemberDatas(
        {
          method: "GET",
          url: `/members`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        },
        HandleMemberData
      );
  }, [fetchMemberDatas, stateMember]);
  useEffect(() => {
    const HandleData = (tasksObj: any) => {
      const loadedTasks = [];
      console.log("HandleData", tasksObj);
      // for (const taskKey in tasksObj) {
      //   loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      // }

      //setTasks(loadedTasks);
    };

    fetchDatas(
      {
        method: "GET",
        url: `/absences?limit=10&page=${currentPage}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
      HandleData
    );
  }, [fetchDatas, currentPage]);

  if (currentList.length <= 0) return <EmptyPage />;

  return (
    <div className="container mx-auto pt-2 s">
      {loading && <p>Loading...</p>}
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle pb-4">
            <div className="overflow-hidden border rounded-lg">
              <TableComponent data={currentList} />
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
