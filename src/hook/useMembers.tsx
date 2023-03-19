import axios, { AxiosRequestConfig } from "axios";
import { useState, useCallback, useEffect } from "react";

axios.defaults.baseURL = "/api";

const useMember = () => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  const sendRequest = useCallback(
    async (params: AxiosRequestConfig<any>, applyData: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.request(params);

        applyData(response.data);
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

export default useMember;
