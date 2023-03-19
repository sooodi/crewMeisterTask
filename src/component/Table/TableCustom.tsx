import React, { useEffect, useState } from "react";

import Pagination from "component/Pagination/Pagination";
// import { useCustomContext } from "store/CustomContext";
import EmptyPage from "component/EmptyPage/EmptyPage";

import {
  AbsentDuration,
  calculateTotalAbsence,
  filterDataAbsence,
  HandleTableData,
  SortByName,
} from "utility/Functions";

import { useAppDispatch, useAppSelector } from "hook/ReduxHook";
import useAbsentMember from "hook/useAbsentMember";
import TableComponent from "./TableComponent";
import useMember from "hook/useMembers";
import { setMemberList } from "store/memberDataAction";
import { setOriginAndCurrentList } from "store/absenseDataAction";
import { SpinnerCustom } from "component/SpinnerCustom/SpinnerCustom";

type Props = {};

const TableCustom = ({}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  //const [currentList, setCurrentList] = useState([]);
  //const [originList, setOriginList] = useState([]);
  const [filteredList, setFiltredList] = useState<any>([]);
  const [totalUsersAbsent, setTotalUsersAbsent] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  // const { state } = useCustomContext();

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const stateFilter = useAppSelector((state: any) => state.filterData);
  const stateMember = useAppSelector((state: any) => state.memberData);
  const stateAbsense = useAppSelector((state: any) => state.absenceData);
  console.log("stateAbsense", stateAbsense, stateMember);
  const dispatch = useAppDispatch();
  // Change page
  const paginateForward = () => {
    if (currentPage * itemsPerPage <= totalItems)
      setCurrentPage(currentPage + 1);
  };
  const paginateBack = () => {
    if (currentPage - 1 >= 1) setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    FilterData();
  }, [stateFilter]);

  const FilterData = () => {
    let resultArray = filterDataAbsence(stateAbsense.originList, stateFilter);
    let sortByname = SortByName(resultArray);
    setFiltredList(sortByname);
    //setCurrentList(sortByname.slice(0, itemsPerPage));
    TotalAbsent(sortByname);
    setTotalItems(sortByname.length);
    setCurrentPage(1);
  };

  const TotalAbsent = (arr: any) => {
    setTotalUsersAbsent(calculateTotalAbsence(arr));
  };

  const {
    loading: loadingMember,
    error: errorMember,
    sendRequest: fetchMemberDatas,
  } = useMember();
  const { loading, error, sendRequest: fetchDatas } = useAbsentMember();
  useEffect(() => {
    const HandleMemberData = (dataObj: any) => {
      const loadedTasks = [];

      dispatch(setMemberList({ memberList: dataObj?.members }));
    };

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
  }, [fetchMemberDatas]);

  useEffect(() => {
    const HandleData = (dataObj: any) => {
      if (dataObj?.absences) {
        let arrWithUseName = HandleTableData(
          dataObj.absences,
          stateMember.memberList
        );
        console.log("HandleData", currentPage);
        if (currentPage > 1)
          arrWithUseName = [...stateAbsense.originList, ...arrWithUseName];
        console.log("HandleData", arrWithUseName);
        let sortByname: any[] = SortByName(arrWithUseName);
        TotalAbsent(arrWithUseName);
        setFiltredList(sortByname);
        dispatch(
          setOriginAndCurrentList({
            originList: sortByname,
            currentList: sortByname.slice(indexOfFirstItem, indexOfLastItem),
          })
        );
        setTotalItems(dataObj.totlal);
      }
    };
    if (stateMember)
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
  }, [fetchDatas, stateMember, currentPage]);

  if (stateAbsense.currentList.length <= 0) return <EmptyPage />;

  return (
    <div className="container mx-auto pt-2 s">
      <div className="flex flex-col ">
        <div className="p-1.5 w-full inline-block align-middle pb-4">
          <Pagination
            postsPerPage={itemsPerPage}
            totalPosts={totalItems}
            paginateForward={paginateForward}
            paginateBack={paginateBack}
            currentPage={currentPage}
          />
          {(loading || loadingMember) && (
            <div className="flex flex-col items-center">
              <SpinnerCustom />
              <p className="mt-4 text-blue-800">Loading...</p>
            </div>
          )}
          {!loading && !loadingMember && (
            <div className="overflow-hidden border rounded-lg">
              <TableComponent data={stateAbsense?.currentList} />
              {indexOfLastItem >= totalItems && (
                <p className="flex m-2 mt-5 font-medium text-gray-700">
                  Total Absense of{" "}
                  {stateFilter.filterObj.Name !== ""
                    ? stateFilter.filterObj.Name
                    : "All Users"}
                  :<span className="font-medium">{totalUsersAbsent}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableCustom;
