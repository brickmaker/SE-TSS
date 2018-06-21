export const GET_STUDENT_PAPER = 'get_student_paper';
export const CHANGE_RENDER_TAB_EXAM = 'change_render_tab_exam';
export const CHANGE_SOLUTIONS = 'change_solution';
export const START_EXAM = "start_exam";
export const SET_LEFT_TIME = "set_left_time";
export const SAVE_ANSWER = "save_answer";
export const SUBMIT_ANSWER = "submit_answer";
export const SET_GRADE = "set_grade";

const username ='3150100099';
const password ='000098' ;

export const getStudentPaper = (studentId, courseID, paperID, token)=>{
    return dispatch=>{
             let  headers = new Headers();
                headers.append(
                    'Content-Type', 'application/json'
                );
                headers.append(
                    'Authorization','JWT '+ localStorage.getItem('token')

                );
                fetch(`http://47.100.233.129:8080/api/online_testing/paper/${paperID}/`, {
                    method: 'GET',
                    headers:headers
                })
                    .then(response => response.json())
                    .then(response => {
                        const paper_info = response;
                        console.log("paper_info", paper_info)
                        let headers = new Headers();
                        headers.append(
                            'Content-Type', 'application/json'
                        )
                        headers.append(
                            'Authorization','JWT '+ localStorage.getItem('token')

                        )
                        fetch(`http://47.100.233.129:8080/api/online_testing/examination/`, {
                            method: 'POST',
                            headers: headers,
                            body:JSON.stringify({
                                paper:paper_info.paper_id
                            }),
                            credentials:'include'

                        })
                            .then(response => response.json())
                            .then(response => {
                                console.log(response);
                                const exam_id = response.exam_id;
                                headers = new Headers();
                                headers.append(
                                    'Content-Type', 'application/json'
                                )
                                headers.append(
                                    'Authorization','JWT '+ localStorage.getItem('token')
                                )
                                fetch(`http://47.100.233.129:8080/api/online_testing/examination/${exam_id}/left_time/`, {
                                    method: 'GET',
                                    headers: headers,
                                    credentials:'include'
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        console.log("left_time",response);
                                        let left_time = response.left_time;
                                        headers = new Headers();
                                        headers.append(
                                            'Content-Type', 'application/json'
                                        );
                                        headers.append(
                                            'Authorization','JWT '+token
                                        );
                                        fetch(`http://47.100.233.129:8080/api/online_testing/examination/${exam_id}/`, {
                                            method: 'GET',
                                            headers:headers
                                        })
                                            .then(response => response.json())
                                            .then(response=>{
                                                console.log("answer", response);
                                                let solutions = Array(paper_info.question_list.length).fill(-1);
                                                if(response.answers != null){
                                                    let answers = JSON.parse(response.answers.replace(/'/g, '"'));
                                                    paper_info.question_list.map((question_info, index)=>{
                                                        solutions[index] = answers[question_info.question_id]
                                                    });
                                                }
                                                dispatch({
                                                    type: GET_STUDENT_PAPER,
                                                    paper_info: paper_info,
                                                    solutions: solutions,
                                                    exam_id: exam_id,
                                                    left_time: left_time,
                                                })
                                            })
                                            .catch(err => console.log(err));
                                    })
                                    .catch(err => console.log(err));
                            })
                            .catch(err => console.log(err));

                    })
                    .catch(err => console.log(err))
                };
};

export const changeRenderTabExam = (tab_id) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_RENDER_TAB_EXAM,
            tab_id: tab_id,
        })
    };
};

export const changeSolution = (solutions) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_SOLUTIONS,
            solutions: solutions,
        })
    };
};

export const setGrade=(grade)=>{
    return dispatch=>{
        dispatch({
            type:SET_GRADE,
            grade:grade
        })
    }
}

export const refreshLeftTime=()=>{}

export const startExam=(paper_id, token)=>{
   return dispatch=>{
       let headers = new Headers();
       headers.append(
           'Content-Type', 'application/json'
       )
       headers.append(
        'Authorization','JWT '+ localStorage.getItem('token')

       )
       fetch(`http://47.100.233.129:8080/api/online_testing/examination/`, {
           method: 'POST',
           headers: headers,
           body:JSON.stringify({
               paper:paper_id
           })
       })
           .then(response => response.json())
           .then(response => {
                console.log(response);
                const exam_id = response.exam_id;
               headers = new Headers();
               headers.append(
                   'Content-Type', 'application/json'
               )
               headers.append(
                'Authorization','JWT '+ localStorage.getItem('token')

               )
               fetch(`http://47.100.233.129:8080/api/online_testing/examination/${exam_id}`, {
                   method: 'GET',
                   headers: headers
               })
                   .then(response => response.json())
                   .then(response => {
                       console.log("left_time",response);
                       dispatch({
                           type: START_EXAM,
                           exam_id: exam_id,
                           left_time: response.left_time,
                       })
                   })
                   .catch(err => console.log(err));
           })
           .catch(err => console.log(err));
   }

};

export const setLeftTime=(left_time)=>{
    return dispatch=>{
        dispatch({
            type:SET_LEFT_TIME,
            left_time: left_time,
        })
    }
}

