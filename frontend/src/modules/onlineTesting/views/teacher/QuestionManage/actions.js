export const GET_TEACHER_AND_TAG_LIST = 'get_teacher_and_tag_list';
export const GET_PROBLEM_LIST = 'get_problem_list';
export const ADD_PROBLEM_TEACHER = 'add_problem_teacher';
export const DELETE_PROBLEMS_TEACHER = 'delete_problems_teacher';

const testTeacherList = [
    "fucker_1", "fucker_2", "fucker_3"
];
const testTagList = [
    "fuck_1", "fuck_2", "fuck_3"
];

const description = 'how are you i am fine thank you and you  '+'how are you i am fine thank you and you  '+'how are you i am fine thank you and you  ';
const choices = [
    'hello', 'fuck', '2333', '6666'
];


let testProblemLists = [];

for(let i = 0; i != 3; i += 1) {
    for(let j = 0; j != 3; j += 1) {
        let teacher_name = testTeacherList[i], tag = testTagList[j], question_id = 1000 + i * 100 + j*10;
        testProblemLists.push( {
                question_id: question_id ,
                type : 'Choice',
                description: description + question_id.toString(),
                choices: choices,
                answer : [0],
                teacher_name: teacher_name,
                tag: tag
            }
        );
        testProblemLists.push( {
                question_id: question_id + j,
                type : 'Judge',
                description: description + question_id.toString(),
                choices: choices,
                answer : [0],
                teacher_name: teacher_name,
                tag: tag
            }
        )
    }
}

function tempDelete(teacherID, courseID, problemID) {
    console.log("tempDelete", teacherID, courseID, problemID);
    return testProblemLists;
}

function tempAdd(teacherID, courseID, problem) {
    console.log("tempAdd", teacherID, courseID, problem);
    return testProblemLists;
}

function tempGet(teacherId, courseId, teacherList, tagList) {
    console.log("tempGet", teacherId, courseId, teacherList, tagList);
    return testProblemLists;
}


export const getTeacherAndTagList = (teacherId, courseId, token) =>{
    return dispatch=>{
        dispatch({
            type: GET_TEACHER_AND_TAG_LIST,
            teacher_list: testTeacherList,
            tag_list : testTagList,
        })
    };
};

export const getProblemList = (teacherId, courseId, teacherList, tagList)=>{
    return dispatch=>{
        dispatch({
            type: GET_PROBLEM_LIST,
            problem_list: tempGet(teacherId, courseId, teacherList, tagList),
        })
    }
};

export const addProblemTeacher = (teacherID, courseID, problem)=>{
    return dispatch=>{
        dispatch({
            type: ADD_PROBLEM_TEACHER,
            problem_list: tempAdd(teacherID, courseID, problem),
        })
    }

};

export const deleteProblemTeacher = (teacherID, courseID, problemID)=>{
    return dispatch=>{
        dispatch({
            type: DELETE_PROBLEMS_TEACHER,
            problem_list: tempDelete(teacherID, courseID, problemID),
    })
    }
};
