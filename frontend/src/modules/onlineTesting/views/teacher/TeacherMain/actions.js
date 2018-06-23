import {teacher_info} from "../../../fakeData/index";
import 'isomorphic-fetch'
import _SERVER_ADDRESS from '../../../configs/config'


export const GET_COURSE_LIST = 'get_course_list';

const testCourseList = [

    {
        course_id: "061B0170",
        course_name: '微积分Ⅰ',
    },
    {
        course_id: "211B0010",
        course_name: '离散数学及其应用',
    },
];

export const getCourseList = (teacherId, token) =>{
    return dispatch=>{
        fetch(`http://${_SERVER_ADDRESS}/api/info/get_token`, {
            method: 'POST',
            headers: {Accept: 'application/json',
                'Content-Type': 'application/json',},
            body: JSON.stringify({
                'username': teacher_info.username,
                'password': teacher_info.password
            }),
            credentials:'include'
        }).then(response => response.json())
            .then(response => {
                const token = response['token'];
                let headers = new Headers();
                headers.append(
                    'Content-Type', 'application/json'
                );
                headers.append(
                    'Authorization','JWT '+ localStorage.getItem('token')
                );
                fetch(`http://${_SERVER_ADDRESS}/api/online_testing/course/`, {
                    method: 'GET',
                    headers: headers,
                    credentials:'include'
                }).then(response => response.json())
                    .then(response => {
                        let course_list = [];
                        response.map((temp_course_info)=>{
                           course_list.push({
                               course_id: temp_course_info[0],
                               course_name: temp_course_info[1]
                           });
                        });

                        dispatch({
                            type: GET_COURSE_LIST,
                            course_list: course_list,
                            token: token
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };
};