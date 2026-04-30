// src/config/galleryAlbums.js

export const GALLERY_ALBUMS = {
  plants: {
    key: "plants",
    route: "/gallery",
    userId: 123,
    heroTitle: "Gallery",
    heroSubtitle: "Browse and upload photos from our community.",
    albumTitle: "Plants",
    albumDescription: "Share your favourite plants, flowers and garden discoveries.",
    uploadTitle: "Upload plant photos",
    tips: [
      "Use clear, well-lit photos for best results",
      "JPG and PNG formats only",
    ],
  },
  events: {
    key: "events",
    route: "/eventgallery",
    userId: 345,
    heroTitle: "Gallery",
    heroSubtitle: "Browse and upload photos from our community.",
    albumTitle: "Events",
    albumDescription: "Photos from meetings, talks, outings and club activities.",
    uploadTitle: "Upload event photos",
    tips: [
      "Upload photos from meetings and outings",
      "JPG and PNG formats only",
    ],
  },
};

export function getGalleryAlbum(key) {
  return GALLERY_ALBUMS[key] || GALLERY_ALBUMS.plants;
}
