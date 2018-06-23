import {teacher_info} from "../../../fakeData/index";
import 'isomorphic-fetch'
import _SERVER_ADDRESS from '../../../configs/config'


export const GET_TEACHER_AND_TAG_LIST = 'get_teacher_and_tag_list';
export const GET_PROBLEM_LIST = 'get_problem_list';
export const CHANGE_PROBLEM_SHOW_LIST = 'change_problem_shou_list';



export const getTeacherAndTagList = (courseId, token) =>{
    return dispatch=>{
        let   headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')
        );
        fetch(`http://${_SERVER_ADDRESS}/api/online_testing/question/tags_and_teachers/?course=${courseId}`, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                dispatch({
                    type: GET_TEACHER_AND_TAG_LIST,
                    teacher_list: response.teacher_list,
                    tag_list : response.tag_list,
                })
            })
            .catch(err => console.log(err));
    };
};

export const changeProblemShowList = (problem_show_list) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_PROBLEM_SHOW_LIST,
            problem_should_show:problem_show_list
        })
    };
};

export const getProblemList =  (courseId, teacher_list_selected, teacher_list, tag_list_selected, token)=>{
    return dispatch=>{
        let url = `http://${_SERVER_ADDRESS}/api/online_testing/question/`;
        url += `?course=${courseId}`;
        console.log(teacher_list, teacher_list_selected, "rua ");
        teacher_list.forEach((teacher_detail, index)=>{
           if(teacher_list_selected.indexOf(teacher_detail.teacher_name) > -1){
               url+= `&teacher_list=${teacher_detail.teacher_id}`;
           }
        });
        tag_list_selected.forEach((tag, index)=>{
            url += `&tag_list=${tag}`
        });

        console.log(url);
             let   headers = new Headers();
                headers.append(
                    'Content-Type', 'application/json'
                )
                headers.append(
                    'Authorization','JWT '+ localStorage.getItem('token')

                )
                fetch(url, {
                    method: 'GET',
                    headers:headers
                })
                    .then(response => response.json())
                    .then(response => dispatch({
                        type: GET_PROBLEM_LIST,
                        problem_list: response.question_list,
                        problem_should_show: Array(response.question_list.length).fill(false)
                    }))
                    .catch(err => console.log(err));
    }
};


