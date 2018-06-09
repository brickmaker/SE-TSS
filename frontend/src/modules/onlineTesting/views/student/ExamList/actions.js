export const GET_STUDENT_PAPER_LIST = 'get_student_paper_list';

let testPaperList = [
    {
        'paper_id': 2002,
        'paper_name': '第一章习题',
        'start_time': 1526191927,
        'deadline': 1528202333,
        'duration': 3600
    },{
        'paper_id': 2002,
        'paper_name': '第二章习题',
        'start_time': 1526191927,
        'deadline': 1526195000,
        'duration': 3600
    },{
        'paper_id': 2002,
        'paper_name': '第三章习题',
        'start_time': 1528202333,
        'deadline': 1528205933,
        'duration': 3600
    },{
        'paper_id': 2002,
        'paper_name': '第四章习题',
        'start_time': 1526191927,
        'deadline': 1526195000,
        'duration': 3600
    },

];

function tempGet() {
    return testPaperList;
}


export const getStudentPaperList = (studentId, courseId, token) =>{
    return dispatch=>{
        dispatch({
            type: GET_STUDENT_PAPER_LIST,
            student_paper_list: tempGet(),
        })
    };
};

