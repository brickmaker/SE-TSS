import React, {Component} from 'react';
import {connect} from "react-redux"
import {Route, Switch,Link} from "react-router-dom"
import BZ from "./ButtonZoom"
import {Button,
    List,
    ListItem,
    Paper,
    ListItemIcon,
    Divider,
    ListItemText,
    ListItemSecondaryAction

} from 'material-ui';



import QuestionManage from '../QuestionManage'
import PaperManage from '../PaperManage'
import GradeStatistics from '../GradeStatistics'
import PaperGenerate from '../PaperGenerate'
import PaperView from '../PaperView'
import Bar from '../../../../../top/components/Bar'
import {getCourseList} from "./actions";
import {
    Home, Search as SearchIcon, Message as MessageIcon,
    Announcement as AnnouncementIcon,
    Extension as ExtensionIcon
} from "@material-ui/icons/es/index"
const menuStyle = {
    display: 'inline-block',
    width: "20%",
    height: "80%",
    float: "left",
    margin: "20px"
};

const windowStyle = {
    display: 'inline-block',
    width: "98%",
    height: "80%",
    float: "left",
    margin: "20px"
};

class TeacherMain extends Component {

    componentDidMount() {
        this.props.getCourseList(0, 0);
    }

    render() {
        const {token, match, course_list} = this.props;
        // console.log('list', courseList);
        const courseListItems = course_list.map(
            (courseInfo, index)=>{
                return (
                    <div>
                    <ListItem key={ index} >
                            <BZ courseInfo={courseInfo} courseName={courseInfo.course_name} course_id={courseInfo.course_id} history={this.props.history} match={match} />
                    </ListItem>
                    </div>
                )
            }

        );


        return (
            <Bar listItems={courseListItems}>
            <div>
                <Paper style={windowStyle}>
                    <Route path={`${match.url}/question_manage/:course_id`} component={QuestionManage}/>
                    <Route exact path={`${match.url}/paper_manage/:course_id`} component={PaperManage}/>
                    <Route path={`${match.url}/paper_manage/:course_id/paper_generate`} component={PaperGenerate}/>
                    <Route path={`${match.url}/paper_manage/:course_id/paper_view/:paper_id`} component={PaperView}/>
                    <Route path={`${match.url}/grade_statistics/:course_id`} component={GradeStatistics}/>

                    {/*<Route path={`${match.url}/search/:searchType/:query/:pageNum`} component={Search}/>*/}

                </Paper>
            </div>
            </Bar>
        );
    }
}


const mapStateToProps = (state) => ({
    course_list: state.online_testing.teacher_main.course_list,
    token: state.online_testing.teacher_main.token,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCourseList: (teacherID, token)=>{
             return dispatch(getCourseList(teacherID, token));
         },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TeacherMain);
