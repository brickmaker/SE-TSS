export const GET_COURSE_LIST_TEACHER = 'get_course_list_teacher';
export const CHANGE_TOKEN ='change_token';
export const CHANGE_TESTLIST = 'change_testlist';
export const CHANGE_STUDENTLIST = 'change_studentlist';
export const CHANGE_TAGLIST = 'change_taglist';
export const CHANGE_QUESTIONTYPELIST = 'change_questiontypelist';
export const CHANGE_TAGCHECKLIST = 'change_tagchecklist';
export const getTestList=(courseId,token)=>{
        return dispatch =>{
            let  headers = new Headers();
            headers.append(
                'Content-Type', 'application/json'
            );
            headers.append(
                'Authorization','JWT '+ localStorage.getItem('token')

            );
            fetch('http://127.0.0.1:8000/api/online_testing/analysis/testList/?course_id='+courseId.course_id, {
                method: 'GET',
                headers:headers
            })
                .then(response => response.json())
                .then(response => {
                    let testlist = response;
                    console.log("getTestList");
                    console.log(testlist);
                    for(let index in testlist){
                    }
                    dispatch({
                        type: CHANGE_TESTLIST,
                        testList: testlist,
                    })
                })
                .catch(err => console.log(err));
        };
};
export const getStudentList=(teacherId,token)=>{
    return dispatch =>{
        let  headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );
        fetch('http://127.0.0.1:8000/api/online_testing/analysis/studentList/', {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                let studentlist = response;
                console.log("getStudentList");
                console.log(studentlist);
                dispatch({
                    type: CHANGE_STUDENTLIST,
                    studentList:studentlist,
                })
            })
            .catch(err => console.log(err));
        }
};
export const getTagList=(courseId,token)=>{
    return dispatch =>{
        let  headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );
        fetch('http://127.0.0.1:8000/api/online_testing/analysis/tagList/?course_id='+courseId.course_id, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                let tagList = response;
                console.log("getTagList");
                console.log(tagList);
                // let data =[];
                dispatch({
                    type: CHANGE_TAGLIST,
                    tagList:tagList,
                })
            })
            .catch(err => console.log(err));
    }
};
export const getQuestionTypeList=(teacherId,courseId,token)=>{
    return dispatch =>{
        const t = [];
        let  headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );

        fetch('http://127.0.0.1:8000/api/online_testing/analysis/questionTypeList/?course_id='+courseId.course_id, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                let questionTypeList = response;
                console.log("getQuestionTypeList");
                console.log(questionTypeList);
                // let data = [];
                dispatch({
                    type: CHANGE_QUESTIONTYPELIST,
                    questionTypeList:questionTypeList,
                })
            })
            .catch(err => console.log(err));
    }
};

