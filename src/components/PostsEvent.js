// src/components/PostsEvent.js
import React from "react";
import { getGalleryAlbum } from "../config/galleryAlbums";
import Posts from "./Posts";

// Backward-compatible wrapper (Events album)
function PostsEvent() {
  return <Posts album={getGalleryAlbum("events")} />;
}

export default PostsEvent;