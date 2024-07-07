import React from "react";

const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Calendar = React.lazy(() => import('../pages/Calendar'));
const History = React.lazy(() => import('../pages/History'));
const Newsletters = React.lazy(() => import('../pages/Newsletters'));
const Contacts = React.lazy(() => import('../pages/Contacts'));
const Gallery = React.lazy(() => import('../pages/Gallery'));
const BecomeAMember = React.lazy(() => import('../pages/BecomeAMember'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));



export const router = [
    {
        path:"/",
        element: Home
    },
    {
        path:"/about",
        element: About
    },
    {
        path:"/calendar",
        element: Calendar
    },
    {
        path:"/history",
        element: History
    },
    {
        path:"/newsletters",
        element: Newsletters
    },
    {
        path:"/contacts",
        element: Contacts
    },
    {
        path:"/gallery",
        element: Gallery
    },
    {
        path:"/becomeamember",
        element: BecomeAMember
    },
    {
        path:"/PrivacyPolicy",
        element: PrivacyPolicy
    }

]