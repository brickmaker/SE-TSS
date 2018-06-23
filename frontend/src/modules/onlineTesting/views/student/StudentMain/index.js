import React, { Component } from 'react';
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import BZ from "./ButtonZoom"
import { CHANGE_TOKEN, GET_COURSE_LIST_STUDENT } from "./reducers"
import Bar from '../../../../../top/components/Bar'
import {
    ListItem,
    Paper,
} from 'material-ui'
import HistoryGrade from "../HistoryGrade/index";
import ExamList from '../ExamList'
import Examination from "../Examination/index";


import _SERVER_ADDRESS from '../../../configs/config'


const menuStyle = {
    display: 'inline-block',
    width: "20%",
    height: "100%",
    float: "left",
    margin: "20px"
};
const windowStyle = {
    display: 'inline-block',
    width: "95%",
    height: "80%",
    margin: "20px"
};


class StudentMain extends Component {

    componentDidMount() {
        var headers = new Headers();
        fetch(`http://${_SERVER_ADDRESS}/api/info/get_token`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': '3150100000',//TODO get user
                'password': '000000'//TODO get user
            }),
            credentials: "include"
        }).then(response => response.json())
            .then(response => {
                this.props.onChangeToken(response['token']);
                this.props.getCourseListStudent(response['token']);
            });
    }

    render() {
        const { match, course_list } = this.props;
        // console.log('list', courseList);
        const courseListItems = course_list.map(

            (courseInfo, index) => {
                return (
                    <ListItem key={index} >
                            <BZ courseName={courseInfo.course_name} course_id={courseInfo.course_id} history={this.props.history} match={match} />
                    </ListItem>
                )
            }
        );
        return (
            <Bar listItems={courseListItems}>
                <Paper style={windowStyle}>
                    <Route exact path={`${match.url}/exam_list/:course_id`} component={ExamList} />
                    <Route path={`${match.url}/exam_list/:course_id/exam/:paper_id`} component={Examination} />
                    <Route path={`${match.url}/history_grade/:course_id`} component={HistoryGrade} />
                    {/*<Route path={`${match.url}/search/:searchType/:query/:pageNum`} component={Search}/>*/}
                </Paper>
            </Bar>
        );
    }
}


const mapStateToProps = (state) => ({
    course_list: state.online_testing.student_main.course_list,
    token: state.online_testing.student_main.token,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCourseListStudent: (token) => {
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
                    console.log("course_list233", response);
                    response.map((temp_course_info)=>{
                        course_list.push({
                            course_id: temp_course_info[0],
                            course_name: temp_course_info[1]
                        });
                    });
                    dispatch({
                        type: GET_COURSE_LIST_STUDENT,
                        course_list: course_list,
                    });
                })
                .catch(err => console.log(err));
        },
        onChangeToken: (token) => {
            dispatch({ type: CHANGE_TOKEN, token: token })
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentMain);