export const GET_COURSE_LIST_STUDENT = 'get_course_list_student';

const testCourseList = [
    {
        course_id: 0,
        course_name: '数据结构与算法',
    },
    {
        course_id: 1,
        course_name: '计算机网络',
    },
    {
        course_id: 2,
        course_name: '软件工程',
    },{
        course_id: 3,
        course_name: '人工智能',
    },

];

export const getCourseListStudent = (teacherId, token) =>{
    return dispatch=>{
        dispatch({
            type: GET_COURSE_LIST_STUDENT,
            course_list: testCourseList,
        })
    };
};