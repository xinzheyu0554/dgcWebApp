// src/hooks/useMutation1.js
import { getGalleryAlbum } from "../config/galleryAlbums";
import useMutation from "./useMutation";

// Backward-compatible wrapper for the Events album.
const useMutation1 = ({ url, method = "POST" }) => {
  const album = getGalleryAlbum("events");
  return useMutation({ url, method, userId: album.userId });
};

export default useMutation1;