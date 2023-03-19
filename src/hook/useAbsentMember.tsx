import axios, { AxiosRequestConfig } from "axios";
import { useState, useCallback, useEffect } from "react";
import { setOriginList } from "store/absenseDataAction";
import { useAppDispatch } from "./ReduxHook";

axios.defaults.baseURL = "/api";

const useAbsentMember = () => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const dispatch = useAppDispatch();
  const sendRequest = useCallback(
    async (params: AxiosRequestConfig<any>, applyData: any) => {
      console.log("gere");
      setLoading(true);
      setError(null);
      try {
        const response = await axios.request(params);
        if (response?.data?.absences)
          dispatch(setOriginList(response.data.absences));
        console.log("response", response.data.absences);
        setData(response.data);
        applyData(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("Axios Error with Message: " + error.message);
          console.log("err", error.message);
        } else {
          setError(error);
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    sendRequest,
  };
};

export default useAbsentMember;