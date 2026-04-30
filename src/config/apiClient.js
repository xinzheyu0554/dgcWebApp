// src/config/apiClient.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

// Memoize axios instances per userId so we don't recreate them on every render.
const clientCache = new Map();

export function getApiClient(userId) {
  if (!userId) {
    throw new Error("getApiClient(userId) requires a userId");
  }

  if (!clientCache.has(userId)) {
    clientCache.set(
      userId,
      axios.create({
        baseURL,
        headers: {
          "x-user-id": userId,
        },
      })
    );
  }

  return clientCache.get(userId);
}
