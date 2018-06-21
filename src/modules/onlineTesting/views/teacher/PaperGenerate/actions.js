export const CHANGE_RENDER_TAB_GENERATE = 'change_render_tab_generate';
export const GET_TAG_AND_TEACHER_LIST_GEN = "get_tag_and_teacher_list_gen";

export const changeRenderTabGenerate = (tab_id) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_RENDER_TAB_GENERATE,
            tab_id: tab_id,
        })
    };
};

export const getTeacherAndTagListGen = (course_id , token) =>{
    return dispatch=>{
        let   headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        )
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')
        )
        fetch(`http://47.100.233.129:8080/api/online_testing/question/tags_and_teachers/?course=${course_id}`, {
           method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: GET_TAG_AND_TEACHER_LIST_GEN,
                    teacher_list: response.teacher_list,
                    tag_list : response.tag_list,
                });
            })
            .catch(err => console.log(err));
};


};

