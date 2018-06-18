export const GET_TEACHER_PAPER_LIST = 'get_teacher_paper_list';
export const DELETE_PAPER = 'delete_paper';

let testPaperList = [
    {
        'paper_id': 2002,
        'paper_name': '第一章习题',
        'start_time': 1526191927,
        'deadline': 1526195000,
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
        'start_time': 1526191927,
        'deadline': 1526195000,
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
    return testPaperList.slice();
}

function tempDelete(paperID) {
    for(let i = 0; i != testPaperList.length; i += 1){
        if(testPaperList[i].paper_id === paperID){
            testPaperList.splice(i, 1);
            break;
        }
    }
    return tempGet();
}


export const getTeacherPaperList = (teacherId, courseId, token) =>{
    return dispatch=>{
        dispatch({
            type: GET_TEACHER_PAPER_LIST,
            teacher_paper_list: tempGet(),
        })
    };
};

export const deletePaper = (teacherId, courseID, paperID, token)=>{
    return dispatch=>{
        dispatch({
            type: DELETE_PAPER,
            teacher_paper_list: tempDelete(paperID),
        })
    };
};
