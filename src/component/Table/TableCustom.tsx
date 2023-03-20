import React, { useEffect, useState } from "react";

import Pagination from "component/Pagination/Pagination";
import EmptyPage from "component/EmptyPage/EmptyPage";

import {
  calculateTotalAbsence,
  HandleFilterObject,
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
import { actionRequestGet } from "Service/actionRequest";
import { ABSENCE_ENDPOINT, MEMBER_ENDPOINT } from "Service/Api";
import ErrorPage from "component/ErrorPage/ErrorPage";

type Props = {};

const TableCustom = ({}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryFilter, setQueryFilter] = useState("");
  const [totalUsersAbsent, setTotalUsersAbsent] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const stateFilter = useAppSelector((state: any) => state.filterData);
  const stateMember = useAppSelector((state: any) => state.memberData);
  const stateAbsense = useAppSelector((state: any) => state.absenceData);
  const dispatch = useAppDispatch();

  const {
    loading: loadingMember,
    error: errorMember,
    sendRequest: fetchMemberDatas,
  } = useMember();
  const { loading, error, sendRequest: fetchDatas } = useAbsentMember();
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginateForward = () => {
    if (currentPage * itemsPerPage <= totalItems)
      setCurrentPage(currentPage + 1);
  };

  const paginateBack = () => {
    if (currentPage - 1 >= 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
    setQueryFilter(HandleFilterObject(stateFilter, stateMember.memberList));
  }, [stateFilter]);

  useEffect(() => {
    const HandleMemberData = (dataObj: any) => {
      dispatch(setMemberList({ memberList: dataObj?.members }));
    };
    fetchMemberDatas(actionRequestGet(MEMBER_ENDPOINT), HandleMemberData);
  }, [fetchMemberDatas]);

  useEffect(() => {
    const HandleData = (dataObj: any) => HandleListData(dataObj);

    if (stateMember) {
      fetchDatas(
        actionRequestGet(
          `${ABSENCE_ENDPOINT}?limit=${itemsPerPage}&page=${currentPage}${queryFilter}`
        ),
        HandleData
      );
    }
  }, [fetchDatas, stateMember, currentPage, queryFilter]);

  const TotalAbsent = (arr: any) => {
    setTotalUsersAbsent(calculateTotalAbsence(arr));
  };

  const HandleListData = (dataObj: any) => {
    if (dataObj?.absences) {
      let arrWithUseName = HandleTableData(
        dataObj.absences,
        stateMember.memberList
      );

      if (currentPage > 1)
        arrWithUseName = [...stateAbsense.originList, ...arrWithUseName];
      let sortByname: any[] = SortByName(arrWithUseName);
      TotalAbsent(arrWithUseName);
      dispatch(
        setOriginAndCurrentList({
          originList: sortByname,
          currentList: sortByname.slice(indexOfFirstItem, indexOfLastItem),
        })
      );
      setTotalItems(dataObj.totlal);
    }
  };

  if (!loading && !loadingMember && stateAbsense.currentList.length <= 0)
    return <EmptyPage />;
  if (!loading && !loadingMember && (errorMember || error))
    return <ErrorPage />;

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
