import _SERVER_ADDRESS from '../../../configs/config'

export const GET_STUDENT_PAPER_LIST = 'get_student_paper_list';
export const GET_CURRENT_PAPER_ID = 'get_current_paper_id';


export const getStudentPaperList = (courseId, token) =>{
    return dispatch=>{
                let  headers = new Headers();
                headers.append(
                    'Content-Type', 'application/json'
                );
                headers.append(
                    'Authorization','JWT '+ localStorage.getItem('token')

                );
                console.log(token);
                fetch(`http://${_SERVER_ADDRESS}:8000/api/online_testing/paper/?course=${courseId}`, {
                    method: 'GET',
                    headers:headers
                })
                    .then(response => response.json())
                    .then(response => {
                        let data = [];
                        let test = response;
                        console.log(response);
                        for(let index in test){
                            test[index].forEach(function (e) {
                                let tmp = {};
                                let arr1 = {
                                    "paper_id":"",
                                    "paper_name":"",
                                    "start_time":"",
                                    "deadline":"",
                                    "duration":"",
                                    "done":false,
                                    "teacher":""
                                    //    'paper_id': 2002,
                                    // 'paper_name': '第三章习题',
                                    // 'start_time': 1528202333,
                                    // 'deadline': 1528252333,
                                    // 'duration': 3600
                                };
                                arr1.paper_id=e.paper_id;
                                arr1.paper_name=e.paper_name;
                                arr1.done=e.done;
                                arr1.teacher=e.teacher;

                                let tmpStartTime = e.start_time.toString();
                                console.log(tmpStartTime);
                                let tmpStartTime2 = tmpStartTime.replace(/T/g," ");
                                let Tmp = tmpStartTime2.split('.');
                                arr1.start_time = Tmp[0];
                                let tmpDeadTime = e.deadline.toString();
                                let tmpDeadTime2 = tmpDeadTime.replace(/T/g," ");
                                let Tmp2 = tmpDeadTime2.split('.');
                                arr1.deadline = Tmp2[0];
                                arr1.duration = ((parseInt(e.duration)*60).toString());
                                data.push(arr1);
                            })
                        }
                        console.log("test",data);
                        dispatch({
                            type: GET_STUDENT_PAPER_LIST,
                            student_paper_list: data,
                        })
                    })
                    .catch(err => console.log(err));
            };
};
