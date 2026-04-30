// src/hooks/useMutation.js
import { useState } from "react";
import { getApiClient } from "../config/apiClient";

const useMutation = ({ url, userId, method = "POST" }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
  });

  const mutate = async (data) => {
    setState((prev) => ({ ...prev, isLoading: true, error: "" }));

    try {
      const client = getApiClient(userId);
      await client({ url, method, data });
      setState({ isLoading: false, error: "" });
      return true;
    } catch (error) {
      setState({
        isLoading: false,
        error: error?.message || "Upload failed",
      });
      return false;
    }
  };

  return { mutate, ...state };
};

export default useMutation;