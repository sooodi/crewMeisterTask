import axios, { AxiosRequestConfig } from "axios";
import { useState, useCallback, useEffect } from "react";
import { BASE_URL } from "Service/Api";

axios.defaults.baseURL = BASE_URL;

const useAbsentMember = () => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
