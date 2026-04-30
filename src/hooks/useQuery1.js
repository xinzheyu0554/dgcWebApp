// src/hooks/useQuery1.js
import { getGalleryAlbum } from "../config/galleryAlbums";
import useQuery from "./useQuery";

// Backward-compatible wrapper for the Events album.
const useQuery1 = (url, refetch) => {
  const album = getGalleryAlbum("events");
  return useQuery(url, { userId: album.userId, refetch });
};

export default useQuery1;