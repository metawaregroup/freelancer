import axios from "libs/axios";
import useSWR from "swr";

export const getJobs = async () => {
  const response = axios.get("/api/hello");

  return response;
};
