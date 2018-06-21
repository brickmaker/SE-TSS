export const GET_STUDENT_GRADE = `get_student_grade`;
export const getStudentGrade = (course_id, token)=>{
    return dispatch=>{
        let  headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );
        fetch(`http://47.100.233.129:8080/api/online_testing/analysis/studentGradeList/?course_id=${course_id}`, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                let result = response;
                console.log(result);
                dispatch({
                    type: GET_STUDENT_GRADE,
                    studentGrade: result,
                })
            })
            .catch(err => console.log(err))
    };
};