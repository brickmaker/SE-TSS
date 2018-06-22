export const GET_TEACHER_PAPER = 'get_teacher_paper';
export const CHANGE_RENDER_TAB = 'change_render_tab';

export const getTeacherPaper = (paper_id, token) =>{
    return dispatch=>{
        let headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        )
        headers.append(
            'Authorization', 'JWT ' + localStorage.getItem('token')

        )
        fetch(`http://127.0.0.1:8000/api/online_testing/paper/${paper_id}/`, {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                dispatch({
                    type: GET_TEACHER_PAPER,
                    paper_info: response,
                })
            })
            .catch(err => console.log(err));

    };

};

export const changeRenderTab = (selection) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_RENDER_TAB,
            selection: selection,
        })
    };
};
