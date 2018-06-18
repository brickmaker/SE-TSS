import {Dashboard, Notifications} from "@material-ui/icons";

import CourseScheduleForTeacher from "../views/CourseScheduleForTeacher/CourseScheduleForTeacher";
import HandleRequest from "../views/HandleRequest/HandleRequest";

const CourseArrangeRoutes = [
    {
      path: "/coursesForTeacher",
      sidebarName: "课表",
      icon: Dashboard,
      component: CourseScheduleForTeacher
    },
    {
        path: "/requestForTeacher",
        sidebarName: "受理请求",
        icon: Notifications,
        component: HandleRequest
    }
];

export default CourseArrangeRoutes;
