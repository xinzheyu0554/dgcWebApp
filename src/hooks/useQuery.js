// src/hooks/useQuery.js
import { useEffect, useState } from "react";
import { getApiClient } from "../config/apiClient";

const useQuery = (url, { userId, refetch = 0 } = {}) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: "",
  });

  useEffect(() => {
    let alive = true;

    const fetch = async () => {
      try {
        const client = getApiClient(userId);
        const { data } = await client.get(url);
        if (!alive) return;
        setState({ data, isLoading: false, error: "" });
      } catch (error) {
        if (!alive) return;
        setState({
          data: null,
          isLoading: false,
          error: error?.message || "Failed to fetch",
        });
      }
    };

    fetch();
    return () => {
      alive = false;
    };
  }, [url, userId, refetch]);

  return state;
};

export default useQuery;