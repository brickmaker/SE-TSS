import {Dashboard,LibraryBooks, BubbleChart, Notifications} from "@material-ui/icons";

import CourseSchedule from "../views/CourseSchedule/CourseSchedule";
import RoomResource from "../views/RoomResource/RoomResource";
import CourseArrange from "../views/CourseArrange/CourseArrange";
import HandleRequest from "../views/HandleRequest/HandleRequest";

const CourseArrangeRoutes = [
    {
      path: "/courses",
      sidebarName: "课表",
      icon: Dashboard,
      component: CourseSchedule
    },

    {
        path: "/roomResource",
        sidebarName: "教室资源管理",
        icon: LibraryBooks,
        component: RoomResource
    },
    {
        path: "/courseArrange",
        sidebarName: "排课",
        icon: BubbleChart,
        component: CourseArrange
    },
    {
        path: "/handleRequest",
        sidebarName: "受理请求",
        icon: Notifications,
        component: HandleRequest
    }
];

export default CourseArrangeRoutes;
