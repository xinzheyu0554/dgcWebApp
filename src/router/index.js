import React from "react";

const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Calendar = React.lazy(() => import("../pages/Calendar"));
const Newsletters = React.lazy(() => import("../pages/Newsletters"));
const Contacts = React.lazy(() => import("../pages/Contacts"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const GalleryPhotoDetail = React.lazy(() => import("../pages/GalleryPhotoDetail"));
const BecomeAMember = React.lazy(() => import("../pages/BecomeAMember"));
const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy"));
const EventGallery = React.lazy(() => import("../pages/EventGallery"));
const Speakers = React.lazy(() => import("../pages/Speakers"));
const Login = React.lazy(() => import("../pages/Login"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export const router = [
  { path: "/login", element: Login },
  { path: "/dashboard", element: Dashboard },
  { path: "/gallery/photo/:assetId", element: GalleryPhotoDetail },
  {
    path: "/",
    element: Home,
  },
  {
    path: "/about",
    element: About,
  },
  {
    path: "/calendar",
    element: Calendar,
  },
  {
    path: "/newsletters",
    element: Newsletters,
  },
  {
    path: "/speakers",
    element: Speakers,
  },
  {
    path: "/contacts",
    element: Contacts,
  },
  {
    path: "/gallery",
    element: Gallery,
  },
  {
    path: "/becomeamember",
    element: BecomeAMember,
  },
  {
    path: "/PrivacyPolicy",
    element: PrivacyPolicy,
  },
  {
    path: "/eventgallery",
    element: EventGallery,
  },
];
