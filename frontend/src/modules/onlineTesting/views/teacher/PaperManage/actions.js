import _SERVER_ADDRESS from '../../../configs/config'


export const GET_TEACHER_PAPER_LIST = 'get_teacher_paper_list';

export const getTeacherPaperList = (courseID, token) =>{
    return dispatch=>{

        let   headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        )
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')
        )
        fetch(`http://${_SERVER_ADDRESS}:8000/api/online_testing/paper/?course=${courseID}`, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                dispatch({
                    type: GET_TEACHER_PAPER_LIST,
                    teacher_paper_list: response.paper_list
                })
            })
            .catch(err => console.log(err));
    };
};
