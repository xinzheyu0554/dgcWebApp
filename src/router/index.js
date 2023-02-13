import React from "react";

const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Events = React.lazy(() => import('../pages/Events'));
const Calendar = React.lazy(() => import('../pages/Calendar'));
const History = React.lazy(() => import('../pages/History'));
const Newsletters = React.lazy(() => import('../pages/Newsletters'));
const Contacts = React.lazy(() => import('../pages/Contacts'));



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
        path:"/events",
        element: Events
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

]